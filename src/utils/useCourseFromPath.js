import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import AppContext from "../context/AppContext";

export default function useCourseFromPath() {
  const match = useRouteMatch("/learn/courses/:courseId/lessons/:lessonId");
  const { courses } = useContext(AppContext);

  if (!match || !courses) {
    throw new Error("You use the hooks in wrong place ");
  }

  return [
    courses.find((course) => course.id === match.params.courseId),
    match.params.courseId,
    match.params.lessonId,
  ];
}
