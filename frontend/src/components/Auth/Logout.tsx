import { useAppDispatch } from "../../app/hook";
import { useCallback } from "react";
import { logoutUser } from "../../feature/auth/authActions";
import { clearEventList } from "../../feature/event/eventSlice";
const Logout = () => {
  const dispatch = useAppDispatch();

  const logout = useCallback(async () => {
    dispatch(logoutUser()).then(() => {
      dispatch(clearEventList());
    });
  }, []);

  return (
    <span onClick={logout} style={{ cursor: "pointer" }}>
      Logout
    </span>
  );
};
export default Logout;
