import React, { useContext } from "react";

import AppContext from "../../../context/AppContext";
import { Container, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5),
    },
  })
);

export default function StreakScore() {
  const classes = useStyles();
  const { userProgress } = useContext(AppContext);

  return (
    <Container className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item lg={6} container justify="center" alignItems="center">
          <Typography>
            Longest streak: {findLongestStreak(userProgress)} days
          </Typography>
        </Grid>

        <Grid item lg={6} container justify="center" alignItems="center">
          <Typography>
            Current streak: {findCurrentStreak(userProgress)} days
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

const findLongestStreak = (progress) => {
  // Get only the days, filter the duplicate and and sort them in order
  const days = progress
    .map((lesson) => lesson.dateComplete.toDate().toLocaleDateString())
    .filter((item, index, inputArray) => inputArray.indexOf(item) === index)
    .sort();

  let count = 0;
  let longestStreak = 1;

  days.forEach((_, index) => {
    if (
      days[index] === days[index - 1] + 1 ||
      days[index] === days[index - 1]
    ) {
      count++;
    } else {
      count = 0;
    }

    // Update the longest streak
    longestStreak = Math.max(longestStreak, count);
  });

  return longestStreak;
};

const findCurrentStreak = (progress) => {
  // Get only the days, filter the duplicate, and sort them in order and convert them back to UTC timestamp
  const days = progress
    .map((lesson) => lesson.dateComplete.toDate().toLocaleDateString())
    .filter((item, index, inputArray) => inputArray.indexOf(item) === index)
    .sort()
    .map((day) => new Date(day));

  const numberOfDays = days.length;
  let count = 1;

  if (numberOfDays < 2) return count;
  // We start from the latest day, which is the first item in the list
  for (let index = 0; index < numberOfDays; index++) {
    // Then move down the array, if the next item is the previous day then increment the count
    if (days[index].getDate() === days[index - 1].getDate() - 1) {
      count++;
    } else {
      // Otherwise stop the loop
      break;
    }
  }

  return count;
};
