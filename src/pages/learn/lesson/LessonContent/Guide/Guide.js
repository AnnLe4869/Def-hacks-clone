import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DOMPurify from "dompurify";
import React from "react";
import { useHistory } from "react-router-dom";
import useLessonFromPath from "../../../../../utils/useLessonFromPath";

const useStyles = makeStyles((theme) => ({
  nextButton: {
    float: "right",
  },
}));

export default function Guide() {
  const classes = useStyles();
  const history = useHistory();

  const [lesson, courseId, lessonId] = useLessonFromPath();

  const goToQuiz = () => {
    history.push(`/learn/courses/${courseId}/lessons/${lessonId}/quiz`);
  };

  const markdown = DOMPurify.sanitize(lesson.instruction, {
    ADD_TAGS: ["iframe"],
  });
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: markdown }} />
      <Button
        variant="contained"
        color="primary"
        className={classes.nextButton}
        onClick={goToQuiz}
      >
        Test your understanding
      </Button>
    </div>
  );
}
