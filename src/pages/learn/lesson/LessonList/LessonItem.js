import Collapse from "@material-ui/core/Collapse";
import { green, grey } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import AppContext from "../../../../context/AppContext";

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
  })
);

export default function LessonItem(props) {
  const classes = useStyles();
  const history = useHistory();
  const { lesson } = props;
  const context = useContext(AppContext);
  // This is the ID of the selected lesson we are viewing
  const { lessonId, courseId } = useParams();

  // Check if user has complete this lesson
  const isUserCompleteThisLesson = context.userProgress.includes(
    (lesson) => lesson.id === props.lesson.id
  );

  const handleClick = () => {
    // We change the url to our wanted lesson, thus make it open
    history.push(`/learn/courses/${courseId}/lessons/${lesson.id}`);
  };

  return (
    <div>
      <ListItem button onClick={handleClick} className={classes.course}>
        <ListItemIcon>
          <DoneIcon
            style={{
              color: green[500],
              display: isUserCompleteThisLesson ? "inherit" : "none",
            }}
          />
        </ListItemIcon>
        <ListItemText primary={lesson.lessonName} />
      </ListItem>
      <Collapse in={lessonId === lesson.id} timeout="auto" unmountOnExit>
        <div className={classes.lessonList}>
          <List component="div" disablePadding>
            <ListItem>Practice</ListItem>
            <ListItem>Quiz</ListItem>
          </List>
        </div>
      </Collapse>
    </div>
  );
}
