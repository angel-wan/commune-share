import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useCallback } from "react";
import { logoutUser } from "../../feature/auth/authSlice";
const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.userInfo);

  const logout = () => {
    console.log("logout");
    dispatch(logoutUser());
  };

  return <Button style={{}} handleOnClick={() => logout()} title="Logout" />;
};
export default LogoutButton;
