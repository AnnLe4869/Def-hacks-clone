import { Button, SvgIcon, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailIcon from "@material-ui/icons/Mail";
import TwitterIcon from "@material-ui/icons/Twitter";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../../context/AppContext";
import { SUCCESS, ERROR } from "../../../utils/constants";

import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export default function Auth() {
  const classes = useStyles();
  const history = useHistory();
  const context = useContext(AppContext);

  const handleGoogleLogIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      context.initializeUserData(result.user, result.additionalUserInfo);
      // Set alert telling that user succeed in authenticating
      context.setAlert(SUCCESS, "You have successfully logged in");
      // And go to /learn route
      history.push("/learn");
    } catch (err) {
      console.error(err);
      // Set alert message
      context.setAlert(
        ERROR,
        "Something have gone wrong in the process. Please try again"
      );
    }
  };
  const handleTwitterLogIn = async () => {
    try {
      const provider = new firebase.auth.TwitterAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      context.initializeUserData(result.user, result.additionalUserInfo);
      // Set alert telling that user succeed in authenticating
      context.setAlert(SUCCESS, "You have successfully logged in");
      // And go to /learn route
      history.push("/learn");
    } catch (err) {
      console.error(err);
      // Set alert message
      context.setAlert(
        ERROR,
        "Something have gone wrong in the process. Please try again"
      );
    }
  };
  const handleGithubLogIn = async () => {
    try {
      const provider = new firebase.auth.GithubAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      context.initializeUserData(result.user, result.additionalUserInfo);
      // Set alert telling that user succeed in authenticating
      context.setAlert(SUCCESS, "You have successfully logged in");
      // And go to /learn route
      history.push("/learn");
    } catch (err) {
      console.error(err);
      // Set alert message
      context.setAlert(
        ERROR,
        "Something have gone wrong in the process. Please try again"
      );
    }
  };
  const handleEmailLogIn = () => {
    history.push("/auth/email");
  };

  return (
    <div className={classes.paper}>
      <Typography component="h3" variant="h3">
        Sign in
      </Typography>

      {/* Google sign in */}
      <Button
        type="submit"
        variant="outlined"
        color="default"
        fullWidth
        size="large"
        onClick={handleGoogleLogIn}
        className={classes.submit}
        startIcon={
          <SvgIcon
            viewBox="0 0 256 262"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
          >
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            />
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            />
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            />
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            />
          </SvgIcon>
        }
      >
        Continue with Google
      </Button>
      {/* Twitter sign in */}
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        fullWidth
        size="large"
        startIcon={<TwitterIcon />}
        className={classes.submit}
        onClick={handleTwitterLogIn}
      >
        Continue with Twitter
      </Button>
      {/* GitHub sign in */}
      <Button
        type="submit"
        variant="outlined"
        color="default"
        fullWidth
        size="large"
        onClick={handleGithubLogIn}
        className={classes.submit}
        startIcon={<GitHubIcon />}
      >
        Continue with GitHub
      </Button>

      {/* Email sign in */}
      <Button
        type="submit"
        variant="outlined"
        color="default"
        fullWidth
        size="large"
        startIcon={<MailIcon />}
        className={classes.submit}
        onClick={handleEmailLogIn}
      >
        Continue with Email
      </Button>
    </div>
  );
}
