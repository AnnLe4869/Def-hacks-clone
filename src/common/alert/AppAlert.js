import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { ERROR } from "../../utils/constants";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AppAlert() {
  const classes = useStyles();
  const { alert, setAlert } = useContext(AppContext);

  const handleClose = () => {
    setAlert(null);
  };

  return (
    <div className={classes.root}>
      {alert ? (
        <Snackbar
          open={Boolean(alert)}
          // If error message we want it to hand there and won't go away unless user close it
          autoHideDuration={alert.type === ERROR ? null : 6000}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          <Alert
            severity={alert.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alert.message}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
}
