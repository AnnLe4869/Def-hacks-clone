import { Container, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import AppContext from "../../../../context/AppContext.js";
import { green } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
  },

  paragraph: {
    marginTop: theme.spacing(3),
  },

  promptSignInButton: {
    marginTop: theme.spacing(3),
    backgroundColor: green[400],
    "&:hover": {
      backgroundColor: green[100],
    },
  },
}));

export default function Greeting() {
  const classes = useStyles();
  const { user } = useContext(AppContext);

  const history = useHistory();

  const signIn = () => {
    history.push("/auth");
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      {user ? (
        <Typography variant="h3" align="center">
          Welcome back Anh
        </Typography>
      ) : (
        <div>
          {/* Welcome message */}
          <Typography
            variant="h3"
            align="left"
            className={classes.paragraph}
            style={{ fontWeight: 700 }}
          >
            Welcome to Def Hacks curriculum
          </Typography>

          {/* Small header */}
          <Typography
            variant="h6"
            align="left"
            className={classes.paragraph}
            style={{ fontWeight: 700 }}
          >
            Please slow down and read this
          </Typography>
          {/* Normal text, each element is a paragraph */}
          <Typography variant="h6" align="left" className={classes.paragraph}>
            Def Hack is a proven path to your first software developer job.
          </Typography>
          <Typography variant="h6" align="left" className={classes.paragraph}>
            Def Hacks Learn is a program designed to both give students the
            tools they need to succeed in hackathons and get acquainted with
            computer science.
          </Typography>
          <Typography variant="h6" align="left" className={classes.paragraph}>
            Around the world, there are massive gaps in access to computer
            science education. We believe that closing this gap will allow
            everyone to have the tools they need to build a successful future.
          </Typography>
          <Typography variant="h6" align="left" className={classes.paragraph}>
            Happy coding
          </Typography>

          {/* Prompt buttons */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            className={classes.promptSignInButton}
            onClick={signIn}
          >
            Sign in to save your progress
          </Button>
        </div>
      )}
    </Container>
  );
}
