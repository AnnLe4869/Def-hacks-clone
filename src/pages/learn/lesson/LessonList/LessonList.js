import { List, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import React from "react";
import { useHistory } from "react-router-dom";
import useCourseFromPath from "../../../../utils/useCourseFromPath";
import LessonItem from "./LessonItem";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: "#2e3d49",
    },

    courseHeader: {
      ...theme.mixins.toolbar,
      backgroundColor: grey[400],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        cursor: "pointer",
        textDecoration: `underline ${theme.palette.primary.main}`,
        "& .courseHeaderIcon": {
          color: grey[500],
        },
      },
    },

    list: {
      width: "100%",
      maxHeight: `calc(100vh - 65px)`,
      overflowY: "auto",
      boxSizing: "content-box",
    },
  })
);

export default function LessonList() {
  const classes = useStyles();
  const history = useHistory();

  const [course] = useCourseFromPath();

  if (!course) return <div>Loading</div>;

  return (
    <div className={classes.root}>
      {/* Course header, with name and back navigation */}
      <div
        className={classes.courseHeader}
        onClick={() => history.push("/learn")}
      >
        <Typography variant="h6" color="primary">
          <ArrowLeftIcon
            color="primary"
            fontSize="large"
            className="courseHeaderIcon"
          />
          {course.courseName}
        </Typography>
      </div>

      {/* Course lesson list */}
      <div className={classes.list}>
        <List component="nav" style={{ padding: 0 }}>
          {course.content.map((simplifiedLesson) => (
            <LessonItem key={simplifiedLesson.id} lesson={simplifiedLesson} />
          ))}
        </List>
      </div>
    </div>
  );
}
