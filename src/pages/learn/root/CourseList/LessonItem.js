import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../../../context/AppContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(5),
      "&:hover": {
        textDecoration: "underline",
      },
    },
  })
);

export default function CourseItem(props) {
  const classes = useStyles();
  const history = useHistory();
  const { lesson, course } = props;
  const context = useContext(AppContext);

  const goToLesson = () => {
    history.push(`/learn/courses/${course.id}/lessons/${lesson.id}`);
  };

  return (
    <ListItem button className={classes.nested} onClick={goToLesson}>
      <ListItemIcon>
        <Radio
          checked={context.userProgress.includes(
            (doneLesson) => doneLesson.id === lesson.id
          )}
        />
      </ListItemIcon>
      <ListItemText primary={lesson.lessonName} />
    </ListItem>
  );
}
