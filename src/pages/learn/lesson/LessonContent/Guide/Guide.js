import React, { useEffect } from "react";
import DOMPurify from "dompurify";
import useLessonFromPath from "../../../../../utils/useLessonFromPath";

export default function Guide() {
  const lesson = useLessonFromPath();

  useEffect(() => {
    console.log("re-render");
  });

  const markdown = DOMPurify.sanitize(lesson.instruction);
  return <div dangerouslySetInnerHTML={{ __html: markdown }} />;
}
