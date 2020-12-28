import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import CourseItem from './CourseItem';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(5),
      [theme.breakpoints.up('sm')]: {
        width: '80%',
      },
    },
  })
);

export default function CourseList() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {[1, 2, 3].map(() => (
          <CourseItem />
        ))}
      </List>
    </Container>
  );
}
