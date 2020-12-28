import Collapse from "@material-ui/core/Collapse";
import { green, grey } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import React from "react";

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

export default function LessonItem() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem button onClick={handleClick} className={classes.course}>
        <ListItemIcon>
          <DoneIcon style={{ color: green[500] }} />
        </ListItemIcon>
        <ListItemText primary="Intro to Web" />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
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
