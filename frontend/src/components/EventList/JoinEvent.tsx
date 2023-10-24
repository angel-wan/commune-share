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
import { useAppDispatch } from "../../app/hook";
import { joinEventByCode } from "../../feature/event/eventActions";
const JoinEvent = () => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");

  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
    setCode("");
  };

  const handleClickJoin = () => {
    console.log(code);
    dispatch(joinEventByCode(code));
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCode(event.target.value);
            }}
            value={code}
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
