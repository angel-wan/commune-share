import { useAppDispatch } from "../../app/hook";
import { useCallback } from "react";
import { logoutUser } from "../../feature/auth/authSlice";

const Logout = () => {
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    console.log("logout");
    dispatch(logoutUser());
  }, []);

  return (
    <span onClick={logout} style={{ cursor: "pointer" }}>
      Logout
    </span>
  );
};
export default Logout;
