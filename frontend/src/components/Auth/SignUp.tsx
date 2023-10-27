import { useState, useEffect, useRef, Fragment } from "react";
import { registerUser, RegistrationData } from "../../feature/auth/authActions";
import { useAppDispatch, useAppSelector } from "../../app/hook";

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
  const { loading, success } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const previousLoading = useRef(loading);

  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const initialRegisterData: RegistrationData = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [registerData, setRegisterData] = useState(initialRegisterData);

  useEffect(() => {
   
    if (loading !== previousLoading.current && !loading) {
      if (success) {
        console.log("SignUp - success");
        handleClose();
      } else {
        console.log("SignUp - fail");
        setErrorMsg("Sign up fail. Please try again.");
        setOpen(true);
      }
    }
  }, [loading]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMsg("");
    setRegisterData(initialRegisterData);
    setOpen(false);
  };

  const handleClickSignUp = () => {
    setErrorMsg("");
    if (!isAllFillin()) {
      setErrorMsg("Username, email or password is missing.");
    } else if (!isEmailValid()) {
      setErrorMsg("Please input valid email.");
    } else if (!arePasswordsMatching()) {
      setErrorMsg("Password not matching.");
    } else {
      console.log("SignUp - registerUser", registerData);
      dispatch(registerUser(registerData));
    }
  };

  const isAllFillin = () => {
    return Object.values(registerData).every((value) => !!value);
  };

  const isEmailValid = () => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(registerData.email);
  };

  const arePasswordsMatching = () => {
    return registerData.password === registerData.confirmPassword;
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [event.target.id]: event.target.value });
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
            value={registerData.username}
            onChange={handleInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={registerData.email}
            onChange={handleInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={registerData.password}
            onChange={handleInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            value={registerData.confirmPassword}
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
                onClick={handleClickSignUp}
                disabled={loading}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth={true}
                color="error"
                onClick={handleClose}
                disabled={loading}
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
