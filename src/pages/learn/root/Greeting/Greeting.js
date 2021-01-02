import { Container, Button, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext.js";
import { green } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import findCourseLessonBelong from "../../../../utils/findCourseLessonBelong.js";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
  },

  paragraph: {
    marginTop: theme.spacing(3),
  },

  promptSignInButton: {
    marginTop: theme.spacing(3),
    backgroundColor: green[400],
    "&:hover": {
      backgroundColor: green[100],
    },
  },
}));

export default function Greeting() {
  const classes = useStyles();
  const { user, courses, lastLesson: lastLessonId } = useContext(AppContext);
  const history = useHistory();

  const goToLastLesson = () => {
    // If there is last lesson, i.e user has done some lesson before
    if (lastLessonId !== "") {
      // Find the course the lesson belong to

      const courseLessonBelongTo = findCourseLessonBelong(
        courses,
        lastLessonId
      );

      // If we can find the course that lesson belong to, navigate to that
      if (courseLessonBelongTo) {
        history.push(
          `/learn/courses/${courseLessonBelongTo.id}/lessons/${lastLessonId}`
        );
      }
    } else {
      // Otherwise (i.e user is new)
      // Go to the first course, first lesson
      const firstCourse = courses[0];
      const firstLesson = firstCourse.content[0];
      history.push(
        `/learn/courses/${firstCourse.id}/lessons/${firstLesson.id}`
      );
    }
  };

  const signIn = () => {
    history.push("/auth");
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      {user ? (
        <>
          <Typography variant="h3" align="center">
            Welcome back {user.displayName}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={goToLastLesson}
          >
            Go to the last lesson
          </Button>
        </>
      ) : (
        <div>
          {/* Welcome message */}
          <Typography
            variant="h3"
            align="left"
            className={classes.paragraph}
            style={{ fontWeight: 700 }}
          >
            Welcome to Def Hacks curriculum
          </Typography>

          {/* Small header */}
          <Typography
            variant="h6"
            align="left"
            className={classes.paragraph}
            style={{ fontWeight: 700 }}
          >
            Please slow down and read this
          </Typography>
          {/* Normal text, each element is a paragraph */}
          <Typography variant="h6" align="left" className={classes.paragraph}>
            Def Hack is a proven path to your first software developer job.
          </Typography>
          <Typography variant="h6" align="left" className={classes.paragraph}>
            Def Hacks Learn is a program designed to both give students the
            tools they need to succeed in hackathons and get acquainted with
            computer science.
          </Typography>
          <Typography variant="h6" align="left" className={classes.paragraph}>
            Around the world, there are massive gaps in access to computer
            science education. We believe that closing this gap will allow
            everyone to have the tools they need to build a successful future.
          </Typography>
          <Typography variant="h6" align="left" className={classes.paragraph}>
            Happy coding
          </Typography>

          {/* Prompt buttons */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            className={classes.promptSignInButton}
            onClick={signIn}
          >
            Sign in to save your progress
          </Button>
        </div>
      )}
    </Container>
  );
}
