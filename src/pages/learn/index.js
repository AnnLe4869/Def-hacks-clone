import React from "react";

import Footer from "../../common/footer/Footer";
import Header from "../../common/header/AppBarHeader";
import Greeting from "./root/Greeting/Greeting";
import CourseList from "./root/CourseList/CourseList";
import Lesson from "./lesson/index";

import { Redirect, Route, Switch } from "react-router-dom";

export default function Learn() {
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
