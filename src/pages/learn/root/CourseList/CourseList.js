import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import CourseItem from "./CourseItem";

import AppContext from "../../../../context/AppContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(5),
      [theme.breakpoints.up("sm")]: {
        width: "80%",
      },
    },
  })
);

export default function CourseList() {
  const classes = useStyles();
  const context = useContext(AppContext);

  return (
    <Container className={classes.root}>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {context.courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </List>
    </Container>
  );
}
