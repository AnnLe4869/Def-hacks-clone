import AppBar from "@material-ui/core/AppBar";
import { grey } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AppContext from "../../../../context/AppContext";
import useLessonFromPath from "../../../../utils/useLessonFromPath";
import Guide from "./guide/Guide";
import Quiz from "./quiz/QuizList";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    headerBar: {
      backgroundColor: grey[700],
      boxShadow: "none",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    content: {
      maxHeight: "calc(100vh - 65px)",
      overflow: "auto",
    },
  })
);

export default function LessonContent() {
  const classes = useStyles();
  const context = useContext(AppContext);

  const [lesson, courseId, lessonId] = useLessonFromPath();

  useEffect(() => {
    // If we haven't fetch the lesson before, i.e it's not in context state
    if (!context.lessons.includes((lesson) => lesson.id === lessonId)) {
      context.startLesson(lessonId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  if (!lesson) return <div>Loading</div>;

  return (
    <div>
      <div className={classes.root}>
        {/* App bar that show the lesson name */}
        <AppBar position="static" className={classes.headerBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} align="center">
              {lesson.lessonName}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Lesson content  */}
        {/* For content creators, you can use any tool that can convert normal editor/markdown to HTML and store that HTML to firebase */}
        <Container className={classes.content}>
          <Switch>
            <Route path={`/learn/courses/:courseId/lessons/:lessonId/guide`}>
              <Guide />
            </Route>

            <Route path={`/learn/courses/:courseId/lessons/:lessonId/quiz`}>
              <Quiz />
            </Route>

            <Redirect
              to={`/learn/courses/${courseId}/lessons/${lessonId}/guide`}
            />
          </Switch>
        </Container>
      </div>
    </div>
  );
}
