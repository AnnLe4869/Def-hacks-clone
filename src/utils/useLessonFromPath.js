import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import AppContext from "../context/AppContext";

export default function useLessonFromPath() {
  const match = useRouteMatch("/learn/courses/:courseId/lessons/:lessonId");
  const { lessons } = useContext(AppContext);

  if (!match || !lessons) {
    throw new Error("You use the hooks in wrong place ");
  }

  // We return the found lesson, current courseId and lessonId
  return [
    lessons.find((lesson) => lesson.id === match.params.lessonId),
    match.params.courseId,
    match.params.lessonId,
  ];
}
