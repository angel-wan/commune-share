import { useState, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../../app/hook";
import { joinUserGroupByCode } from "../../feature/usergroup/usergroupActions";

const JoinExpense = () => {
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
    dispatch(joinUserGroupByCode(code));
    handleClickClose();
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Join Expense
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

export default JoinExpense;
