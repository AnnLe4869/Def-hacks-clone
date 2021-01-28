import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState, useEffect, useContext } from "react";
import emailValidate from "../../../utils/emailValidate";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import AppContext from "../../../context/AppContext";
import { SUCCESS, ERROR } from "../../../utils/constants";
import Loading from "../../../common/loading/AppLoading";

const actionCodeSettings = {
  url: "https://def-hacks-clone.web.app/auth/email",
  // This must be true.
  handleCodeInApp: true,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EmailInput() {
  const classes = useStyles();

  const history = useHistory();
  const context = useContext(AppContext);

  const [email, setEmail] = useState();

  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        setIsEmailSent(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // This shall run only when the link is from the email link
  // Not when the link is normal directing
  useEffect(() => {
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser

          // Here we initialize user's data
          context.initializeUserData(result.user, result.additionalUserInfo);

          // Set alert telling that user succeed in authenticating
          context.setAlert(SUCCESS, "You have successfully logged in");
          // Then go to /learn route
          history.push("/learn");
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          console.error(error);

          // Set alert message
          context.setAlert(
            ERROR,
            "Something have gone wrong in the process. Please try again"
          );
          // Redirect user to /auth/email for retrying
          history.push("/auth/email");
        });
    }
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h5" variant="h5">
          Enter your email to continue
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
            disabled={isEmailSent}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={!emailValidate(email) || isEmailSent}
          >
            Send a verification link
          </Button>
        </form>
      </div>
    </Container>
  );
}
