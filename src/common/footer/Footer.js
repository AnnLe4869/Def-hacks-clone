import { Grid, Typography } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: lightGreen[300],
    width: "100%",
    color: "white",
    marginTop: "20vh",
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(4),
  },

  leftColumn: {
    paddingLeft: theme.spacing(5),
  },

  columnTitle: {
    marginBottom: theme.spacing(3),
  },

  externalLink: {
    color: "white",
    marginBottom: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    "&:hover": {
      color: "white",
      textDecoration: "underline white",
    },
  },

  internalLinkTitle: {
    marginBottom: theme.spacing(1),
  },
  internalLink: {
    color: "white",
    "&:hover": {
      color: "white",
      textDecoration: "underline white",
    },
  },

  copyright: {
    marginTop: theme.spacing(3),
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="flex-start">
        <Grid item xs={8} md={8} className={classes.leftColumn}>
          <Typography variant="h2">Def Hacks Inc. 2020</Typography>
          <Typography variant="h5">Made by Students for Students</Typography>
        </Grid>

        <Grid
          container
          item
          xs={4}
          md={4}
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={6} md={6}>
            <Typography variant="h4" className={classes.columnTitle}>
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              className={classes.externalLink}
              component="a"
              href=""
            >
              <FacebookIcon />
              <Typography variant="h6">Facebook</Typography>
            </Typography>
            <Typography
              variant="h6"
              component="a"
              href=""
              className={classes.externalLink}
            >
              <TwitterIcon />
              <Typography variant="h6">Twitter</Typography>
            </Typography>
            <Typography
              variant="h6"
              component="a"
              href=""
              className={classes.externalLink}
            >
              <InstagramIcon />
              <Typography variant="h6">Instagram</Typography>
            </Typography>
            <Typography
              variant="h6"
              component="a"
              href=""
              className={classes.externalLink}
            >
              <LinkedInIcon />
              <Typography variant="h6">LinkedIn</Typography>
            </Typography>
          </Grid>

          <Grid item xs={6} md={6}>
            <Typography variant="h4" className={classes.columnTitle}>
              Navigate
            </Typography>
            <Typography variant="h6" className={classes.internalLinkTitle}>
              <Link to="/" className={classes.internalLink}>
                Home
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.internalLinkTitle}>
              <Link to="/learn" className={classes.internalLink}>
                Curriculum
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.internalLinkTitle}>
              <Link to="/about" className={classes.internalLink}>
                About us
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Typography align="center" variant="h5" className={classes.copyright}>
        Copyright © Def Hacks Inc. 2020
      </Typography>
    </div>
  );
}

export default Footer;
