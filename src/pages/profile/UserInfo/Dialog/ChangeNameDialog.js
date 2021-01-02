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

export default function ChangeNameDialog(props) {
  const [name, setName] = useState("");
  const { isOpen, closeDialog } = props;

  const context = useContext(AppContext);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const submitNameChange = () => {
    context.updateNonCriticalUserProfile(name);
    setName();
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
        <DialogTitle id="form-dialog-title">Enter new display name</DialogTitle>
        <DialogContent>
          <DialogContentText>Name</DialogContentText>
          <TextField
            autoFocus
            value={name}
            onChange={handleChange}
            margin="dense"
            id="name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={submitNameChange}
            color="primary"
            variant="contained"
            disabled={name === "" || name === context.user.displayName}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
