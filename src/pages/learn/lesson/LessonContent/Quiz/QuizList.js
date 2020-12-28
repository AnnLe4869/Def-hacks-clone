import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import React, { useReducer } from "react";
import QuizItem from "./QuizItem";

export default function Quiz() {
  const quizzes = [
    {
      quizId: 1,
      selectedOption: 1,
    },
    {
      quizId: 2,
      selectedOption: 3,
    },
    {
      quizId: 3,
      selectedOption: 4,
    },
    {
      quizId: 4,
      selectedOption: 2,
    },
  ];

  const reducer = (currentState, action) => {
    const [id, value] = action;
    return [
      ...currentState.filter((quiz) => quiz.id !== id),
      { quizId: id, selectedOption: value },
    ];
  };

  const [state, dispatch] = useReducer(reducer, quizzes);

  const handleSubmit = (name, value) => {
    console.log("Hello world");
  };

  return (
    <FormControl component="fieldset">
      {state.map(() => (
        <QuizItem handleChange={dispatch} />
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Check your answers
      </Button>
    </FormControl>
  );
}
