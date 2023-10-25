import React, { useCallback, useState } from "react";
import { LoginData, loginUser } from "../../feature/auth/authActions";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Logout from "./Logout";
import { listEvents } from "../../feature/event/eventActions";
const LoginForm = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { loading, userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setRegisterData({ ...registerData, username: event.target.value });
    setLoginData({ ...loginData, [event.target.id]: event.target.value });
  };

  const submitHandler = useCallback(() => {
    // dispatch(registerUser(registerData));
    // TODO: Dispatch registerUser action
    dispatch(loginUser(loginData));
    dispatch(listEvents());
    console.log("loginData", loginData);
    // refresh the page
  }, []);

  if (userInfo) {
    return (
      <div>
        Logged in as {userInfo.username}
        <Logout />
      </div>
    );
  }
  return (
    // TODO: Create register form
    <div>
      Login Form
      <div>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleInput}
          value={loginData.email}
          type="email"
          id="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          onChange={handleInput}
          value={loginData.password}
          type="password"
          id="password"
        />
      </div>
      <div>
        <button onClick={submitHandler} type="submit" disabled={loading}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
