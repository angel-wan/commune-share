import { useState, useEffect, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { LoginData, loginUser } from "../../feature/auth/authActions";
import SignUp from "./SignUp";

const Login = () => {
  const { loading, userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(userInfo === undefined);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!loading && userInfo === undefined) {
      setErrorMsg("Invalid email or password");
    }
  }, [loading]);

  useEffect(() => {
    setOpen(userInfo === undefined);
    setErrorMsg("");
    loginData.password = "";
  }, [userInfo]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.id]: event.target.value });
  };

  const handleClickLogin = async () => {
    if (!loginData.email || !loginData.password) {
      setErrorMsg("Email or password is missing.");
      return;
    }
    dispatch(loginUser(loginData))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log("originalPromiseResult", originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(
          "rejectedValueOrSerializedError",
          rejectedValueOrSerializedError
        );
        // handle error here
      });
  };

  return (
    <Fragment>
      <Dialog fullWidth={true} maxWidth={"sm"} open={open}>
        <DialogTitle>User Login</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleInput}
            value={loginData.email}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleInput}
            value={loginData.password}
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
          <Button
            variant="contained"
            sx={{
              margin: "10px",
              maxWidth: "350px",
            }}
            fullWidth={true}
            onClick={handleClickLogin}
            disabled={loading}
          >
            Login
          </Button>

          <DialogContentText>
            Don't have an account?
            <SignUp />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Login;
