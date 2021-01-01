import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import AppContext from "../../../../context/AppContext";
import emailValidate from "../../../../utils/emailValidate";

export default function ChangeEmailDialog(props) {
  const [email, setEmail] = useState("");
  const { isOpen, closeDialog } = props;

  const context = useContext(AppContext);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const submitEmailChange = () => {
    context.updateUserProfile(null, null, email);
    setEmail();
    closeDialog();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Enter new email</DialogTitle>
        <DialogContent>
          <DialogContentText>Name</DialogContentText>
          <TextField
            autoFocus
            value={email}
            onChange={handleChange}
            margin="dense"
            id="email"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={submitEmailChange}
            color="primary"
            variant="contained"
            disabled={
              email === "" ||
              email === context.user.email ||
              !emailValidate(email)
            }
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
