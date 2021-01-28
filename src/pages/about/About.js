import { Container, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/AppBarHeader";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("md")]: {
        backgroundImage:
          "url(/assets/about_left.png) , url(/assets/about_right.png) ",
        backgroundRepeat: "no-repeat",
        // Position one to the left edge, one to the right edge
        backgroundPosition: "left, right",
        // Scale width according to image height
        backgroundSize: "auto 100%",
      },
    },

    missionMessageContainer: {
      marginTop: theme.spacing(5),
      padding: theme.spacing(2),
      backgroundColor: "#cde6f8",
      textAlign: "left",

      [theme.breakpoints.up("md")]: {
        maxWidth: "50%",
        textAlign: "center",
      },
    },
    missionMessage: {
      fontFamily: "IBM Plex Mono, monospace",
      fontStyle: "italic",
      fontWeight: 500,
    },

    missionDetailContainer: {
      margin: "auto",
      marginTop: theme.spacing(5),
      maxWidth: "45%",
    },
    missionDetail: {
      marginTop: theme.spacing(3),
    },
  })
);

function About() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Container className={classes.root}>
        {/* Mission headline */}
        <div className={classes.missionMessageContainer}>
          <Typography variant="h5" className={classes.missionMessage}>
            Providing free, world‑class computer science education for
            underrepresented youth.
          </Typography>
        </div>

        {/* Mission detail */}
        <div className={classes.missionDetailContainer}>
          <Typography align="center" variant="h4" gutterBottom>
            Def Hacks is a 501(c)(3) nonprofit that hosts international
            hackathons.
          </Typography>

          <Typography
            align="center"
            variant="subtitle1"
            className={classes.missionDetail}
          >
            Def Hacks Learn is a program designed to both give students the
            tools they need to succeed in hackathons and get acquainted with
            computer science.
          </Typography>

          <Typography
            align="center"
            variant="subtitle1"
            className={classes.missionDetail}
          >
            Around the world, there are massive gaps in access to computer
            science education. We believe that closing this gap will allow
            everyone to have the tools they need to build a successful future.
          </Typography>

          <Typography
            align="center"
            variant="subtitle1"
            className={classes.missionDetail}
          >
            That’s why Learn is working to level out the playing field for
            underrepresented communities by creating a free, project-based
            online curriculum that anyone can learn from.
          </Typography>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default About;
