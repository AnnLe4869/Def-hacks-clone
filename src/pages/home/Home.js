import { Container, Typography, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { green, yellow } from "@material-ui/core/colors";
import clsx from "clsx";

import useScrollToTop from "../../utils/useScrollToTop";

import Footer from "../../common/footer/Footer";
import Header from "../../common/header/AppBarHeader";

const useStyles = makeStyles((theme) =>
  createStyles({
    welcomeContainer: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.up("md")]: {
        backgroundImage:
          "url(/assets/guy_left_min.svg) , url(/assets/lady_right_min.svg) ",
        backgroundRepeat: "no-repeat",
        // Position one to the left edge, one to the right edge
        backgroundPosition: "left, right",
        // Scale width according to image height
        backgroundSize: "auto 100%",
      },
    },
    welcomeMessageContainer: {
      [theme.breakpoints.up("md")]: {
        maxWidth: "50%",
      },
    },
    welcomeTitle: {
      fontFamily: "IBM Plex Mono, monospace",
      fontWeight: 700,
      textShadow: "3px 3px #b6cdb8",
      marginBottom: theme.spacing(3),
    },
    welcomePassage: {
      fontFamily: "Karla, sans-serif",
      "& mark": {
        backgroundColor: "#fcf8e3",
        padding: theme.spacing(1),
      },
    },
    getStartButton: {
      // This is for layout, center position
      display: "block",
      margin: "auto",
      marginTop: theme.spacing(3),
      // For other styling
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      backgroundColor: green[600],
      fontWeight: 700,
      color: "white",
      boxShadow: "-5px 5px #c5cfd6",
      borderRadius: 0,
      "&:hover": {
        backgroundColor: green[300],
        boxShadow: "none",
      },

      [theme.breakpoints.up("md")]: {
        marginTop: "15vh",
      },
    },

    questionPromptContainer: {
      maxWidth: "40%",
      backgroundColor: green[100],
      boxShadow: "2rem -1.5rem #6298ea59",
      marginTop: "20vh",
    },
    questionPromptText: {
      padding: theme.spacing(2),
    },

    answerContainer: {
      // Center the content inside it
      margin: "auto",
      // Normal styling
      marginTop: "20vh",
      maxWidth: "90%",
      backgroundColor: yellow[100],
      boxShadow: "2rem -1.5rem #dbdae199",
    },
    answerText: {
      padding: theme.spacing(2),
      paddingRight: theme.spacing(3),
    },

    excitePrompt: {
      maxWidth: "60%",
      marginTop: "20vh",
      backgroundColor: green[100],
    },

    getStartBottomButton: {
      fontSize: "3.5rem",
      boxShadow: "-1rem 1rem #ffb00047",
    },
  })
);

function Home() {
  const classes = useStyles();
  const history = useHistory();
  useScrollToTop();

  return (
    <>
      {/* Header here */}
      <Header />
      <div>
        {/* Welcome message */}
        <Container className={classes.welcomeContainer}>
          <div className={classes.welcomeMessageContainer}>
            <Typography
              variant="h2"
              align="center"
              className={classes.welcomeTitle}
            >
              Def Hacks Learn
            </Typography>
            <Typography
              variant="h5"
              align="center"
              className={classes.welcomePassage}
            >
              Welcome, <mark>Def-Hackers!</mark> Take your future into your own
              hands and dive into your first computer science course today,{" "}
              <em>for free!</em>
            </Typography>

            <Button
              className={classes.getStartButton}
              onClick={() => history.push("/learn")}
            >
              Start coding
            </Button>
          </div>
        </Container>
      </div>
      {/* Question prompt: why start coding */}
      <div className={classes.questionPromptContainer}>
        <Typography
          align="center"
          variant="h3"
          className={classes.questionPromptText}
        >
          Why Computer Science?
        </Typography>
      </div>
      {/* Answer: because ... */}
      <div className={classes.answerContainer}>
        <Typography align="right" variant="h5" className={classes.answerText}>
          Technology is seeping into just about every line of work. It’s become
          necessary for everyone to learn about computers, an integral part of
          our lives. No matter what you do, computer science will be relevant!
        </Typography>
      </div>

      {/* Start prompt */}
      <div className={classes.excitePrompt}>
        <Typography
          align="center"
          variant="h2"
          className={classes.questionPromptText}
        >
          So what are you waiting for?
        </Typography>
      </div>
      {/* Get start */}
      <Button
        className={clsx(classes.getStartButton, classes.getStartBottomButton)}
        onClick={() => history.push("/learn")}
      >
        Get start
      </Button>
      {/* Footer here */}
      <Footer />
    </>
  );
}

export default Home;
