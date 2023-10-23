import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { listEvents } from "../feature/event/eventActions";
const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { loading, success } = useAppSelector((state) => state.event);
  const event = useAppSelector((state) => state.event);

  useEffect(() => {
    dispatch(listEvents());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (success && event.list.length === 0) {
    return <div>There is no event you have joined, Create one now</div>;
  }
  return (
    <div>
      {event.list.map((event) => {
        return <div>{event.title}</div>;
      })}
    </div>
  );
};

export default Dashboard;
