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
  const [value, setValue] = useState("female");
  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleChange(event.target.name, event.target.value);
  };

  return (
    <>
      <FormLabel component="h5">Gender</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </>
  );
}
