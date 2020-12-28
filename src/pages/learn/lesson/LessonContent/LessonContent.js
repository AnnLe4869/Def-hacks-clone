import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import MenuIcon from '@material-ui/icons/Menu';
import { grey } from '@material-ui/core/colors';

import React from 'react';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    headerBar: {
      backgroundColor: grey[700],
      boxShadow: 'none',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function LessonContent() {
  const classes = useStyles();

  return (
    <>
      {/* App bar that show the lesson name */}
      <div className={classes.root}>
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
              Intro to HTML
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      {/* Lesson content  */}
      <Container>
        <h1>Hello world</h1>
      </Container>
    </>
  );
}
