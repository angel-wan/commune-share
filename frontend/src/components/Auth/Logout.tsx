import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useCallback, useEffect } from "react";
import { logoutUser } from "../../feature/auth/authActions";
import { clearEventList } from "../../feature/event/eventSlice";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success } = useAppSelector((state) => state.auth);

  const logout = useCallback(async () => {
    dispatch(logoutUser()).then(() => {
      dispatch(clearEventList());
    });
  }, []);

  useEffect(() => {
    if (success === true) {
      navigate("/");
    }
  }, [success]);
  return (
    <span onClick={logout} style={{ cursor: "pointer" }}>
      Logout
    </span>
  );
};
export default Logout;
