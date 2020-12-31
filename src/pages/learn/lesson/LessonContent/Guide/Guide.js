import React, { useEffect } from "react";
import DOMPurify from "dompurify";
import useLessonFromPath from "../../../../../utils/useLessonFromPath";
import { Button } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    nextButton: {
      float: "right",
    },
  })
);

export default function Guide() {
  const classes = useStyles();
  const history = useHistory();
  const { courseId, lessonId } = useParams();

  const [lesson] = useLessonFromPath();

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
