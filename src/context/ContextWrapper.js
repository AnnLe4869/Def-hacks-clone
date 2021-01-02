import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";
import firebase from "firebase";

export default function ContextWrapper(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [userProgress, setUserProgress] = useState([]);
  const [lastLesson, setLastLesson] = useState("");
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // Start this callback which will run whenever user change or user login/logout
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ ...user, id: user.uid });
        initializeUserData(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const initializeUserData = async (
    authenticatedUser,
    additionalUserInfo = null
  ) => {
    try {
      const db = firebase.firestore();
      // Check if user is signed in for the first time
      if (additionalUserInfo && additionalUserInfo.isNewUser) {
        // If it is, create the blank userProgress and lastLesson
        await db.collection("user").doc(authenticatedUser.uid).set({
          email: authenticatedUser.email,
          progress: [],
          lastLesson: "",
        });
        setUserProgress([]);
        setLastLesson(null);
      } else {
        // Get user data
        const userData = (
          await db.collection("user").doc(authenticatedUser.uid).get()
        ).data();

        // We need this step date format from firebase is a Firebase.FireField and not normal Date object
        const normalizesUserProgress = userData.progress.map((lesson) => ({
          ...lesson,
          dateComplete: lesson.dateComplete.toDate(),
        }));

        setUserProgress(normalizesUserProgress);
        setLastLesson(userData.lastLesson);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const initializeCourses = async () => {
    try {
      const db = firebase.firestore();
      // Fetch all the existing courses
      const snapshots = await db.collection("course").get();
      // Sort courses in order of no
      const courses = [];
      snapshots.forEach((doc) => {
        courses.push({
          ...doc.data(),
          id: doc.id,
          content: doc.data().content.sort((a, b) => a.no - b.no),
        });
      });
      const sortedCourses = courses.sort((a, b) => a.no - b.no);
      setCourses(sortedCourses);
    } catch (err) {
      console.error(err);
    }
  };

  const startLesson = async (lessonId) => {
    try {
      const db = firebase.firestore();
      // Fetch the lesson using the lessonId parameter
      const lessonRef = db.collection("lesson").doc(lessonId);
      const lessonData = (await lessonRef.get()).data();

      // Push the lesson into the lessons state variable
      setLessons([...lessons, { id: lessonId, ...lessonData }]);

      return lessonData;
    } catch (err) {
      console.error(err);
    }
  };

  const completeLesson = async (lessonId) => {
    try {
      const db = firebase.firestore();
      // Find the user reference
      const userRef = db.collection("user").doc(user.id);

      // Get the updated user's progress
      const updatedUserProgress = await db.runTransaction(
        async (transaction) => {
          try {
            // Get the old progress data from user document
            const { progress } = (await transaction.get(userRef)).data();

            // Check to see if the lesson already completed before
            const completedLessonFound = progress.find(
              (simplifiedLesson) => simplifiedLesson.id === lessonId
            );
            // If it's already completed, do nothing
            if (completedLessonFound) return;

            // Otherwise,
            // Create an updated version of the progress
            const completeLesson = {
              id: lessonId,
              dateComplete: new Date(),
            };
            // Add the lesson to the progress field on /user
            const updatedProgress = [
              ...progress
                .filter((simplifiedLesson) => simplifiedLesson.id !== lessonId)
                .map((simplifiedLesson) => ({
                  ...simplifiedLesson,
                  dateComplete: simplifiedLesson.dateComplete.toDate(),
                })),
              completeLesson,
            ];
            // Update in firestore
            transaction.update(userRef, { progress: updatedProgress });
            return updatedProgress;
          } catch (err) {
            throw err;
          }
        }
      );

      // Set the userProgress context variable if the progress actually get updated (i.e course hasn't been complete before)
      if (updatedUserProgress) setUserProgress(updatedUserProgress);
    } catch (err) {
      console.error(err);
    }
  };

  const updateNonCriticalUserProfile = async (
    displayName = null,
    photoURL = null
  ) => {
    const user = firebase.auth().currentUser;
    // If there is no user found, i.e user is not authenticated, exit the function
    if (!user) return;

    try {
      // If user provide displayName or photoURL for updating, do so
      // Otherwise keep the same
      if (displayName || photoURL) {
        await user.updateProfile({
          displayName: displayName ? displayName : user.displayName,
          photoURL: photoURL ? photoURL : user.photoURL,
        });

        setUser({
          ...user,
          displayName: displayName ? displayName : user.displayName,
          photoURL: photoURL ? photoURL : user.photoURL,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateCriticalUserProfile = async (email = null) => {
    const user = firebase.auth().currentUser;
    // If there is no user found, i.e user is not authenticated, exit the function
    if (!user) return;

    /**
     * !NOTE: when update user email, user can NOT authenticate with the old email for that account anymore
     * *That old email is removed from the authentication list
     * !HOWEVER, this process of removal won't happen immediately, and after changing to new email user can still use old email for sign in
     * *Detail on this behavior go to this SO question https://stackoverflow.com/questions/43131526/after-using-firebase-email-update-api-how-do-i-reuse-the-old-email
     */
    try {
      // If user provide an email for update, we first need to re-authenticate user
      if (email) {
        // First we need to know how did user authenticated the last time
        // Since we don't link an account with multiple authentication methods
        // We are safe to say a user has only one way to authenticate
        let userLastAuthenticatedProvider = user.providerData[0];
        let provider;

        // Create the provider accordingly to the last provider user used to authenticate
        if (userLastAuthenticatedProvider.providerId === "google.com") {
          provider = new firebase.auth.GoogleAuthProvider();
        }
        // * Reauthenticate user using popup instead of redirect because redirect cause the remaining code be ignored
        await user.reauthenticateWithPopup(provider);
        // Update user's email in firebase
        await user.updateEmail(email);
        // Update user's email in local Context
        setUser({
          ...user,
          email,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateLastLesson = async (lessonId) => {
    try {
      const db = firebase.firestore();

      await db.collection("user").doc(user.id).update({
        lastLesson: lessonId,
      });

      setLastLesson(lessonId);
    } catch (error) {}
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        alert,
        userProgress,
        lastLesson,
        courses,
        lessons,
        initializeUserData,
        initializeCourses,
        setLoading,
        startLesson,
        completeLesson,
        setAlert,
        updateCriticalUserProfile,
        updateNonCriticalUserProfile,
        updateLastLesson,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
