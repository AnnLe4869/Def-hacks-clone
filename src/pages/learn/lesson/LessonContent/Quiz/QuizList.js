import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import React, { useReducer } from "react";
import useLessonFromPath from "../../../../../utils/useLessonFromPath";
import QuizItem from "./QuizItem";

export default function Quiz() {
  const { quizzes } = useLessonFromPath();

  // We add a selectedOption for the purpose of recording user choices
  // This only limited to the component level, not global context
  const initialState = quizzes
    .map((quiz) => ({
      ...quiz,
      selectedOption: null,
    }))
    .sort((a, b) => a.no - b.no);

  const reducer = (currentState, action) => {
    const [quizId, selectedOption] = action;

    const currentQuiz = currentState.find((quiz) => quiz.id === quizId);

    const updatedState = [
      ...currentState.filter((quiz) => quiz.id !== quizId),
      {
        ...currentQuiz,
        quizId,
        selectedOption,
      },
    ];
    return updatedState.sort((a, b) => a.no - b.no);
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (name, value) => {
    console.log("Hello world");
  };

  return (
    <FormControl component="fieldset">
      {state.map((quiz) => (
        <QuizItem handleChange={dispatch} quiz={quiz} key={quiz.id} />
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Check your answers
      </Button>
    </FormControl>
  );
}
