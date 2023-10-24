import { useState, useEffect, useRef, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { LoginData, loginUser } from "../../feature/auth/authActions";

const Login = () => {
  const { loading, userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const previousUserInfo = useRef(userInfo);
  const previousLoading = useRef(loading);

  const [open, setOpen] = useState(userInfo === undefined);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("useEffect: userInfo - ", userInfo, ", loading - ", loading);

    // Login / Logout
    if (
      loading !== previousLoading.current &&
      userInfo === previousUserInfo.current
    ) {
      console.log("useEffect: Invalid");
      setErrorMsg("Invalid email or password");
    } else {
      console.log("useEffect: login/logout");
      setOpen(userInfo === undefined);
    }
  }, [userInfo, loading]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.id]: event.target.value });
  };

  const handleClickLogin = () => {
    if (!loginData.email || !loginData.password) {
      setErrorMsg("Email or password is missing.");
      return;
    }
    dispatch(loginUser(loginData));
    // console.log("email 1", loginData.email);
    // if (userInfo) {
    //   console.log("email 2", loginData.email);
    //   console.log("username", userInfo.username);
    //   setOpen(false);
    // } else {
    //   console.log("email 3", loginData.email);
    //   setErrorMsg("Invalid email or password");
    // }
  };

  const handleClickSignUp = () => {};

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
            <Button variant="text" onClick={handleClickSignUp}>
              Sign up
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Login;
