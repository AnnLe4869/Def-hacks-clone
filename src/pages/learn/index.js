import React, { useContext, useEffect } from "react";

import Footer from "../../common/footer/Footer";
import Header from "../../common/header/AppBarHeader";
import Greeting from "./root/Greeting/Greeting";
import CourseList from "./root/CourseList/CourseList";
import Lesson from "./lesson/index";

import { Redirect, Route, Switch } from "react-router-dom";

import AppContext from "../../context/AppContext";

import firebase from "firebase";

export default function Learn() {
  const context = useContext(AppContext);

  useEffect(() => {
    // If we haven't fetch all the course yet, do so
    // This should only run one when this component first mount
    if (!context.courses.length > 2) {
      context.initializeCourses();
    }
  }, []);

  useEffect(() => {
    async function uploadData() {
      try {
        const db = firebase.firestore();

        const lessonSnapshots = await db.collection("lesson").get();
        const lessons = [];
        lessonSnapshots.forEach((doc) => {
          lessons.push({
            id: doc.id,
            lessonName: doc.data().lessonName,
          });
        });

        const courseSnapshots = await db.collection("course").get();
        const courses = [];
        courseSnapshots.forEach((doc) => {
          courses.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        await db.runTransaction(async (transaction) => {
          let x = 0;
          courses.forEach((course) => {
            const courseRef = db.collection("course").doc(course.id);
            transaction.update(courseRef, {
              content: lessons.slice(x, x + course.no),
            });
            x += course.no;
          });
        });
      } catch (err) {
        console.error(err);
      }
    }

    uploadData();
  }, []);

  return (
    <Switch>
      <Route path="/learn" exact>
        <Header />
        <Greeting />
        <CourseList />
        <Footer />
      </Route>

      <Route path="/learn/courses/:courseId/lessons/:lessonId">
        <Lesson />
      </Route>

      <Redirect to="/learn" />
    </Switch>
  );
}
