import { useState, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
  createExpenseGroup,
  CreateExpenseType,
  ExpenseType,
  listExpense,
} from "../../feature/expense/expenseActions";

const NewExpense = () => {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((state) => state.event);

  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [expenseData, setExpenseData] = useState<CreateExpenseType>({
    title: "",
    type: ExpenseType.GROUP,
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseData({ ...expenseData, [event.target.id]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMsg("");
    expenseData.title = "";
  };

  const handleClickCreate = () => {
    if (!expenseData.title) {
      setErrorMsg("Title is missing.");
      return;
    }

    dispatch(createExpenseGroup(expenseData)).then(() => {
      dispatch(listExpense());
      if (success) {
        handleClose();
      } else {
        setErrorMsg(error ?? "Create Failed. Please try again.");
      }
    });
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Expense
      </Button>
      <Dialog fullWidth={true} maxWidth={"lg"} open={open}>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={expenseData.title}
            onChange={handleInput}
          />
          {errorMsg && (
            <DialogContentText
              sx={{
                color: "#f14444",
                width: "100%",
                mt: "10px",
              }}
            >
              {errorMsg}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Grid container px={4} pb={3} spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth={true}
                color="error"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth={true}
                onClick={handleClickCreate}
                disabled={loading}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default NewExpense;
