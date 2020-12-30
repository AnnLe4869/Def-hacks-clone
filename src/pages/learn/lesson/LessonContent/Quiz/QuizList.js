import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import React, { useReducer } from "react";
import useLessonFromPath from "../../../../../utils/useLessonFromPath";
import QuizItem from "./QuizItem";

export default function Quiz() {
  const { quizzes } = useLessonFromPath();

  const reducer = (currentState, action) => {
    const [id, value] = action;
    console.log("In reducer");
    console.log(action);
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
      {state.map((quiz) => (
        <QuizItem handleChange={dispatch} quiz={quiz} />
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Check your answers
      </Button>
    </FormControl>
  );
}
