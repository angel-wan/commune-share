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

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickSignUp = () => {
    setOpen(false);
  };

  const handleClickCancel = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        Sign Up
      </Button>
      <Dialog fullWidth={true} maxWidth={"sm"} open={open}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="User Name"
            type="username"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="confirm-password"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
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
                onClick={handleClickSignUp}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth={true}
                color="error"
                onClick={handleClickCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default SignUp;
