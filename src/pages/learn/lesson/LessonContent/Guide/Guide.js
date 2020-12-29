import React from "react";
import DOMPurify from "dompurify";
import useLessonFromPath from "../../../../../utils/useLessonFromPath";

export default function Guide() {
  const lesson = useLessonFromPath();

  const markdown = DOMPurify.sanitize(lesson.instruction);
  return <div dangerouslySetInnerHTML={{ __html: markdown }} />;
}
