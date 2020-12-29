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

  // useEffect(() => {
  //   async function uploadData() {
  //     try {
  //       const db = firebase.firestore();
  //       const batch = db.batch();

  //       // Create a list for lessonId
  //       const simplifiesLessons = [];

  //       lessons.forEach((lesson) => {
  //         const lessonRef = db.collection("lesson").doc();
  //         batch.set(lessonRef, lesson);
  //         simplifiesLessons.push({
  //           id: lessonRef.id,
  //           lessonName: lesson.lessonName,
  //         });
  //       });

  //       let x = 0;

  //       courses.forEach((course) => {
  //         const courseRef = db.collection("course").doc();
  //         const completeCourse = {
  //           ...course,
  //           //content: [simplifiesLessons.splice(x, x + course.no + 1)],
  //         };
  //         batch.set(courseRef, completeCourse);

  //         x += course.no + 1;
  //       });

  //       console.log(simplifiesLessons);

  //       await batch.commit();
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   uploadData();
  // }, []);

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
