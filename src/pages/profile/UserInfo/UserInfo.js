import React, { useContext } from "react";

import {
  Grid,
  Container,
  Avatar,
  Typography,
  Paper,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import AppContext from "../../../context/AppContext";
import imagePlaceholder from "./profile_placeholder.png";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5),
    },

    columnRight: {
      [theme.breakpoints.up("md")]: {
        paddingLeft: theme.spacing(5),
      },
    },

    columnLeft: {
      display: "flex",
      justifyContent: "center",
      paddingBottom: theme.spacing(5),
    },

    avatarImage: {
      width: "100%",
      height: "100%",
      maxHeight: "180px",
      maxWidth: "180px",
    },

    paperContainer: {
      border: "black 1px solid",
      padding: theme.spacing(3),
    },

    detailTitle: {
      marginBottom: theme.spacing(3),
    },

    detailInfo: {
      marginBottom: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
    },

    editIcon: {
      "&:hover": {
        cursor: "pointer",
        color: "blue",
      },
    },
  })
);

export default function UserInfo() {
  const classes = useStyles();
  const { user } = useContext(AppContext);

  return (
    <Container className={classes.root}>
      <Typography align="left" variant="h2" gutterBottom>
        Profile information
      </Typography>

      <Grid container justify="center" alignItems="center">
        <Grid item sm={12} md={12} lg={3} className={classes.columnLeft}>
          <Avatar
            alt={user.displayName}
            variant="square"
            src={user.photoUrl || imagePlaceholder}
            className={classes.avatarImage}
          >
            {/* If the image link is broken, fall back to default image */}
            <Avatar
              alt={user.displayName}
              variant="square"
              src={imagePlaceholder}
              className={classes.avatarImage}
            />
          </Avatar>
        </Grid>

        <Grid item sm={12} md={12} lg={9} className={classes.columnRight}>
          <Paper className={classes.paperContainer}>
            <Typography
              variant="h4"
              align="left"
              className={classes.detailTitle}
            >
              Detail info
            </Typography>

            <div className={classes.detailInfo}>
              <Typography variant="h6">Username: {user.displayName}</Typography>
              <EditIcon className={classes.editIcon} />
            </div>
            <div className={classes.detailInfo}>
              <Typography variant="h6">Email: {user.email} </Typography>
              <EditIcon className={classes.editIcon} />
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Button variant="contained" color="secondary" fullWidth>
        Sign me out
      </Button>
    </Container>
  );
}
