import { useState, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
    console.log(code);
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
        <DialogTitle>Join Expense</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth={true}
            id="standard-basic"
            label="Expense Code"
            variant="standard"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCode(event.target.value);
            }}
            value={code}
          />
        </DialogContent>
        {/* <DialogContentText>Event Joined</DialogContentText> */}
        <DialogActions>
          <Grid container px={4} pb={3} spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth={true}
                color="error"
                onClick={handleClickClose}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth={true}
                onClick={handleClickJoin}
              >
                Join
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default JoinExpense;
