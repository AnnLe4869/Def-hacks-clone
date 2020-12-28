import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import LessonContent from './LessonContent/LessonContent';
import LessonList from './LessonList/LessonList';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    lessonList: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  })
);

export default function Lesson() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={3} lg={3} xl={3} className={classes.lessonList}>
          <LessonList />
        </Grid>

        <Grid item xs={12} md={9} lg={9} xl={9}>
          <LessonContent />
        </Grid>
      </Grid>
    </div>
  );
}
