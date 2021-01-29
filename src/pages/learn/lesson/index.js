import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import LessonContent from "./LessonContent/LessonContent";
import LessonList from "./LessonList/LessonList";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    lessonContent: {
      [theme.breakpoints.up("md")]: {
        display: "block !important",
      },
    },

    container: {
      [theme.breakpoints.up("lg")]: {
        maxWidth: "100vw",
      },
    },

    lessonList: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },

    hide: {
      display: "none",
    },
    show: {
      display: "block",
    },
  })
);

export default function Lesson() {
  const classes = useStyles();
  const [isListDisplayed, setIsListDisplayed] = useState(true);

  const theme = useTheme();
  const isWindowLargerThanMd = useMediaQuery(theme.breakpoints.up("md"));

  const handleToggleDisplay = () => {
    setIsListDisplayed(!isListDisplayed);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid
          item
          md={3}
          className={clsx(
            classes.lessonList,
            isListDisplayed && isWindowLargerThanMd
              ? classes.show
              : classes.hide
          )}
        >
          <LessonList />
        </Grid>

        <Grid item xs={12} md={isListDisplayed ? 9 : 12}>
          <LessonContent toggleDisplay={handleToggleDisplay} />
        </Grid>
      </Grid>
    </div>
  );
}
