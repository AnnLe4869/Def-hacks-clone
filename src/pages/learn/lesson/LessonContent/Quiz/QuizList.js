import { Button, Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../../../../context/AppContext";
import useLessonFromPath from "../../../../../utils/useLessonFromPath";
import { CHECK_ANSWER, CHOOSE_RADIO } from "./constant";
import QuizItem from "./QuizItem";

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
  const [currentLesson, courseId, lessonId] = useLessonFromPath();
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
        // Check whether all answers are correct
        // We do so by first find a quiz that has selectedOption !== correctOption
        const incorrectQuiz = currentState.quizzes.find(
          (quiz) => !(quiz.selectedOption === quiz.correctOption)
        );

        // If the attemptCount is still below the threshold and there are incorrect quiz
        if (
          currentState.attemptCount < currentState.maxAttemptAllow &&
          incorrectQuiz
        ) {
          return {
            ...currentState,
            isInChecking: true,
            // Increment the attemptCount
            attemptCount: currentState.attemptCount + 1,
          };
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
        };
      }

      default:
        return currentState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleGoToNextLesson = () => {
    const allCourses = context.courses;
    // Get the current course
    const currentCourse = allCourses.find((course) => course.id === courseId);
    // This lessons list only has id, name and no
    const allSimplifiedLessons = currentCourse.content;

    // Find the next lesson base off no field
    const nextSimplifiedLessons = allSimplifiedLessons.find(
      (lesson) => lesson.no > currentLesson.no + 1
      /**
       * NOTE: this is the temporary solution based of current database
       * In real production with real data we would want to do lesson.no === currentLesson.no + 1
       * Reason is that in production mode, all lessons in a course has increment, continuous no number
       * We mess up the dev database here, which lead to no number not increment of each other
       * Although the above still work because we have sorted the course content when we fetch, but that not a guarantee
       */
    );

    if (nextSimplifiedLessons) {
      history.push(
        `/learn/courses/${courseId}/lessons/${nextSimplifiedLessons.id}`
      );
    } else {
      // If there is no lesson left in the course

      // Find the next course base off no field
      const nextCourse = allCourses.find(
        (course) => course.no === currentCourse.no + 1
      );
      // If this is the last course then do nothing
      if (!nextCourse) return;

      // Find the first lesson in course
      /**
       * This is the fix
       */
      const lessonNoArray = nextCourse.content.map((lesson) => lesson.no);
      const smallestNo = Math.min.apply(Math, lessonNoArray);
      /**
       * End of the fix
       */
      const firstLessonInCourse = nextCourse.content.find(
        (lesson) => lesson.no === smallestNo
      );
      /**
       * NOTE: this is the temporary solution based of current database
       * In real production with real data we would want to do (lesson) => lesson.no === 0
       * Reason is that in production mode, there must be a lesson with no === 0
       * We mess up the dev database here, which lead to no number not increment of each other
       */

      history.push(
        `/learn/courses/${nextCourse.id}/lessons/${firstLessonInCourse.id}`
      );
    }
  };

  const handleCheckAnswer = () => {
    dispatch({
      type: CHECK_ANSWER,
    });

    // Check whether all answers are correct
    // We do so by first find a quiz that has selectedOption !== correctOption
    const incorrectQuiz = state.quizzes.find(
      (quiz) => !(quiz.selectedOption === quiz.correctOption)
    );
    // If this is the last allow attempt before displaying the answer or all answers are correct
    // NOTE: we do this because in callback we won't get the updated value of state but the old state value
    if (state.attemptCount + 1 === state.maxAttemptAllow || !incorrectQuiz) {
      context.completeLesson(lessonId);
    }
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
