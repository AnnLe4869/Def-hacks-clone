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
      } else {
        setUser(null);
      }
    });
  }, []);

  const initializeUserData = async (authenticatedUser, additionalUserInfo) => {
    try {
      const db = firebase.firestore();
      // Check if user is signed in for the first time
      if (additionalUserInfo.isNewUser) {
        // If it is, create the blank userProgress and lastLesson
        await db.collection("user").doc(authenticatedUser.uid).set({
          displayName: authenticatedUser.displayName,
          email: authenticatedUser.email,
          progress: [],
          lastLesson: "",
        });
        setUserProgress([]);
        setLastLesson(null);
      } else {
        // Get user data
        const userData = (
          await db.collection("user").get(authenticatedUser.uid)
        ).data();
        setUserProgress(userData.progress);
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
        courses.push({ ...doc.data(), id: doc.id });
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
            // Create an updated version of the progress
            const updatedProgress = [
              ...progress,
              { lessonId, date_complete: new Date() },
            ];
            // Update in firestore
            transaction.update(userRef, { progress: updatedProgress });
            return updatedProgress;
          } catch (err) {
            console.error(err);
          }
        }
      );

      // Set the userProgress context variable
      setUserProgress(updatedUserProgress);
    } catch (err) {
      console.error(err);
    }
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
