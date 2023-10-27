import Login from "../components/Auth/Login";
import EventList from "../components/EventList/EventList";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useEffect, useState } from "react";
import { listEvents } from "../feature/event/eventActions";

const Home = () => {
  const event = useAppSelector((state) => state.event);
  const { isAuthenticated, success } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (isAuthenticated && success) {
      dispatch(listEvents());
      setUpdate(!update);
    }
  }, [isAuthenticated, success]);

  return (
    <>
      <Login />
      <EventList eventList={event.list} />
    </>
  );
};

export default Home;
