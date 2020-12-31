import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

export default function Quiz(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.handleChange([event.target.name, event.target.value]);
  };

  return (
    <>
      <FormLabel component="h5">Gender</FormLabel>
      <RadioGroup
        aria-label="gender"
        name={props.quiz.id}
        value={props.quiz.selectedOption}
        onChange={handleChange}
      >
        {props.quiz.options.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.id}
            control={<Radio />}
            label={option.optionContent}
          />
        ))}
      </RadioGroup>
    </>
  );
}
