import { useState, Fragment } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";

const JoinEvent = () => {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFullWidth(event.target.checked);
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Join Event
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Join Event</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth={true}
            id="standard-basic"
            label="Event URL"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Send</Button>

          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default JoinEvent;
