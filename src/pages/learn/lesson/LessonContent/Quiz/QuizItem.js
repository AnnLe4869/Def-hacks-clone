import { Paper, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { CHOOSE_RADIO } from "./constant";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    explanation: {
      fontStyle: "italic",
    },
  })
);

export default function Quiz(props) {
  const classes = useStyles();
  const { quiz, handleChange, isInChecking, shouldDisplayAnswer } = props;

  const isAnswerCorrect = quiz.selectedOption === quiz.correctOption;
  const correctAnswer = quiz.options.find(
    (option) => option.id === quiz.correctOption
  ).optionContent;

  const handleSelect = (event) => {
    handleChange({
      type: CHOOSE_RADIO,
      payload: [event.target.name, event.target.value],
    });
  };

  return (
    <Paper
      variant="outlined"
      className={classes.root}
      style={{
        border: isInChecking
          ? isAnswerCorrect
            ? "1px solid green"
            : "1px solid red"
          : null,
      }}
    >
      <FormLabel component="h5">{quiz.question}</FormLabel>
      <RadioGroup
        aria-label="gender"
        name={quiz.id}
        value={quiz.selectedOption}
        onChange={handleSelect}
      >
        {quiz.options.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.id}
            control={<Radio />}
            label={option.optionContent}
          />
        ))}
      </RadioGroup>
      {shouldDisplayAnswer && !isAnswerCorrect ? (
        <Typography variant="subtitle1" className={classes.explanation}>
          Answer: {correctAnswer}
        </Typography>
      ) : null}
      {shouldDisplayAnswer ? (
        <Typography variant="subtitle1" className={classes.explanation}>
          {quiz.explanation}
        </Typography>
      ) : null}
    </Paper>
  );
}
