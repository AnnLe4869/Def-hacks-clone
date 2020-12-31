import { Button, Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import React, { useContext, useReducer, useState } from "react";
import useLessonFromPath from "../../../../../utils/useLessonFromPath";
import QuizItem from "./QuizItem";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { CHOOSE_RADIO, CHECK_ANSWER } from "./constant";
import { useHistory } from "react-router-dom";
import AppContext from "../../../../../context/AppContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
    },
    checkAnswerButton: {
      [theme.breakpoints.up("sm")]: {
        marginRight: theme.spacing(2),
      },
    },
    nextLessonButton: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(2),
      },
    },
  })
);
export default function Quiz() {
  const currentLesson = useLessonFromPath();
  const classes = useStyles();
  const history = useHistory();
  const context = useContext(AppContext);

  // We add a selectedOption for the purpose of recording user choices
  // This only limited to the component level, not global context
  const initialQuizzesState = currentLesson.quizzes
    .map((quiz) => ({
      ...quiz,
      selectedOption: null,
    }))
    // We sort quiz in order of its no
    .sort((a, b) => a.no - b.no);

  const initialState = {
    quizzes: initialQuizzesState,
    attemptCount: 0,
    maxAttemptAllow: 3,
    // This keeps track of whether user has click button to check quiz answers
    isInChecking: false,
    // Determine whether to show the explanation for the quiz
    // Should display when user choose all correctly or when attemptCount exceed maxAttemptAllow
    shouldDisplayAnswer: false,
  };

  const reducer = (currentState, action) => {
    switch (action.type) {
      // User choose to check their answer
      case CHECK_ANSWER: {
        // If the attemptCount is still below the threshold
        if (currentState.attemptCount < currentState.maxAttemptAllow) {
          return { ...currentState, isInChecking: true };
        }
        // Otherwise change the shouldDisplayAnswer to show the explanation and correct answer
        return {
          ...currentState,
          isInChecking: true,
          shouldDisplayAnswer: true,
        };
      }

      // User select a radio button
      case CHOOSE_RADIO: {
        const [quizId, selectedOption] = action.payload;

        const currentQuiz = currentState.quizzes.find(
          (quiz) => quiz.id === quizId
        );

        const updatedQuizzesState = [
          ...currentState.quizzes.filter((quiz) => quiz.id !== quizId),
          {
            ...currentQuiz,
            quizId,
            selectedOption,
          },
        ].sort((a, b) => a.no - b.no); // We have to sort quiz again
        return {
          ...currentState,
          quizzes: updatedQuizzesState,
          // We want to reset the isInChecking whenever user start select as to remove the UI effect of last checking
          isInChecking: false,
          // Increment the attemptCount
          attemptCount: currentState.attemptCount + 1,
        };
      }

      default:
        return currentState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleGoToNextLesson = () => {
    const allLessons = context.lessons;
    const nextLesson = allLessons.find(
      (lesson) => lesson.no === currentLesson.no + 1
    );
    if (nextLesson) {
      history.push("/");
    }
  };

  const handleCheckAnswer = () => {
    dispatch({
      type: CHECK_ANSWER,
    });
  };

  return (
    <FormControl component="fieldset" className={classes.root}>
      {state.quizzes.map((quiz) => (
        <QuizItem
          handleChange={dispatch}
          quiz={quiz}
          isInChecking={state.isInChecking}
          shouldDisplayAnswer={state.shouldDisplayAnswer}
          key={quiz.id}
        />
      ))}
      <Grid container justify="flex-end" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckAnswer}
          className={classes.checkAnswerButton}
        >
          Check your answers
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleGoToNextLesson}
          className={classes.nextLessonButton}
        >
          Next lesson
        </Button>
      </Grid>
    </FormControl>
  );
}
