import React, { useState } from "react";
import { registerUser, RegistrationData } from "../../feature/auth/authActions";
import { useAppDispatch, useAppSelector } from "../../app/hook";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState<RegistrationData>({
    username: "",
    email: "",
    password: "",
  });

  const { loading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();


  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setRegisterData({ ...registerData, username: event.target.value });
    setRegisterData({ ...registerData, [event.target.id]: event.target.value });
  };

  const submitHandler = () => {
    // dispatch(registerUser(registerData));
    // TODO: Dispatch registerUser action
    dispatch(registerUser(registerData));
  };
  return (
    // TODO: Create register form
    <div>
      Register Form
      <div>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleInput}
          value={registerData.username}
          type="text"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleInput}
          value={registerData.email}
          type="email"
          id="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          onChange={handleInput}
          value={registerData.password}
          type="password"
          id="password"
        />
      </div>
      <div>
        <button onClick={submitHandler} type="submit" disabled={loading}>
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
