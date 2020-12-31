import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/AppBarHeader";
import AppContext from "../../context/AppContext";
import Lesson from "./lesson/index";
import CourseList from "./root/CourseList/CourseList";
import Greeting from "./root/Greeting/Greeting";

export default function Learn() {
  const context = useContext(AppContext);

  useEffect(() => {
    // If we haven't fetch all the course yet, do so
    // This should only run one when this component first mount
    if (!(context.courses.length > 2)) {
      context.initializeCourses();
    }
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
