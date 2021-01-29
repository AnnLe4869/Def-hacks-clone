import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { createStyles, fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../context/AppContext";
import Logo from "./logo.svg";

const useStyles = makeStyles((theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "60ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    option: {
      marginRight: theme.spacing(3),
    },
  })
);

export default function AppBarHeader() {
  const classes = useStyles();
  const history = useHistory();

  const { user } = useContext(AppContext);

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Icon display */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => history.push("/")}
          >
            <img alt="logo" src={Logo} height="35" />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Def Hacks
          </Typography>

          {/* Search bar */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />

          {/* Route navigation button */}
          <div className={classes.sectionDesktop}>
            <Button
              color="inherit"
              className={classes.option}
              onClick={() => history.push("/learn")}
            >
              Curriculum
            </Button>
            <Button
              color="inherit"
              className={classes.option}
              onClick={() => history.push("/about")}
            >
              About
            </Button>
            {user ? (
              <Button color="inherit" onClick={() => history.push("/profile")}>
                Profile
              </Button>
            ) : (
              <Button color="inherit" onClick={() => history.push("/auth")}>
                Sign in
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
