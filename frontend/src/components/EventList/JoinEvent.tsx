import { useState, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const JoinEvent = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickJoin = () => {
    handleClickClose();
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Join Event
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClickClose}
      >
        <DialogTitle>Join Event</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth={true}
            id="standard-basic"
            label="Event Code"
            variant="standard"
          />
        </DialogContent>
        {/* <DialogContentText>Event Joined</DialogContentText> */}
        <DialogActions>
          <Button onClick={handleClickJoin}>Join</Button>

          <Button onClick={handleClickClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default JoinEvent;
