import Collapse from "@material-ui/core/Collapse";
import { green, grey } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import React, { useContext } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import AppContext from "../../../../context/AppContext";
import clsx from "clsx";

const useStyles = makeStyles((theme) =>
  createStyles({
    course: {
      border: "1px solid black",
      backgroundColor: grey[300],
      "&:hover": {
        backgroundColor: grey[200],
      },
    },
    lessonList: {
      backgroundColor: grey[50],
    },
    lessonListSubItem: {
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
    },

    underlineText: {
      textDecoration: "underline",
    },
  })
);

export default function LessonItem(props) {
  const classes = useStyles();
  const history = useHistory();
  const { lesson: simplifiedLesson } = props;
  const context = useContext(AppContext);
  // This is the ID of the current selected lesson we are viewing
  const { lessonId, courseId } = useParams();

  // Check if user has complete this lesson
  const isUserCompleteThisLesson = context.userProgress.find(
    (lesson) => lesson.id === simplifiedLesson.id
  );

  // Check which section we are in: guide or quiz
  const isGuideRoute = useRouteMatch(
    "/learn/courses/:courseId/lessons/:lessonId/guide"
  );

  const handleClick = () => {
    // We change the url to our wanted lesson, thus make it open
    history.push(`/learn/courses/${courseId}/lessons/${simplifiedLesson.id}`);
  };

  const navigateToQuiz = () => {
    history.push(
      `/learn/courses/${courseId}/lessons/${simplifiedLesson.id}/quiz`
    );
  };

  const navigateToGuide = () => {
    history.push(
      `/learn/courses/${courseId}/lessons/${simplifiedLesson.id}/guide`
    );
  };

  return (
    <div>
      <ListItem button onClick={handleClick} className={classes.course}>
        <ListItemIcon>
          {isUserCompleteThisLesson ? (
            <DoneIcon
              style={{
                color: green[500],
              }}
            />
          ) : null}
        </ListItemIcon>
        <ListItemText primary={simplifiedLesson.lessonName} />
      </ListItem>
      <Collapse
        in={lessonId === simplifiedLesson.id}
        timeout="auto"
        unmountOnExit
      >
        <div className={classes.lessonList}>
          <List component="div" disablePadding>
            <ListItem
              className={clsx(
                classes.lessonListSubItem,
                isGuideRoute ? classes.underlineText : null
              )}
              onClick={navigateToGuide}
            >
              Guide
            </ListItem>
            <ListItem
              className={clsx(
                classes.lessonListSubItem,
                !isGuideRoute ? classes.underlineText : null
              )}
              onClick={navigateToQuiz}
            >
              Quiz
            </ListItem>
          </List>
        </div>
      </Collapse>
    </div>
  );
}
