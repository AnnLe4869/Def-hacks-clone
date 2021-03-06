import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { useState, useContext } from "react";
import LessonItem from "./LessonItem";
import { grey } from "@material-ui/core/colors";

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
      marginBottom: theme.spacing(2),
    },
  })
);

export default function CourseItem(props) {
  const classes = useStyles();
  const { course } = props;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem button onClick={handleClick} className={classes.course}>
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <ListItemText primary={course.courseName} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.lessonList}>
          <List component="div" disablePadding>
            {course.content.map((lesson) => (
              <LessonItem key={lesson.id} lesson={lesson} course={course} />
            ))}
          </List>
        </div>
      </Collapse>
    </div>
  );
}
