import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import MenuIcon from "@material-ui/icons/Menu";
import { grey } from "@material-ui/core/colors";

import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Quiz from "./Quiz/QuizList";
import Guide from "./Guide/Guide";

import React, { useContext, useEffect } from "react";
import AppContext from "../../../../context/AppContext";
import useLessonFromPath from "../../../../utils/useLessonFromPath";

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

  const { url, path, params } = useRouteMatch();
  const lesson = useLessonFromPath();

  useEffect(() => {
    // If we haven't fetch the lesson before, i.e it's not in context state
    if (!context.lessons.includes((lesson) => lesson.id === params.lessonId)) {
      context.startLesson(params.lessonId);
    }
  }, [params.lessonId]);

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
            <Route path={`${path}/guide`}>
              <Guide />
            </Route>

            <Route path={`${path}/quiz`}>
              <Quiz />
            </Route>

            <Redirect to={`${url}/guide`} />
          </Switch>
        </Container>
      </div>
    </div>
  );
}
