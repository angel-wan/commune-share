import ChooseDate from "../components/EventDetail/ChooseDate";
import EventInfo from "../components/EventDetail/EventInfo";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { getEventById } from "../feature/event/eventActions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Grid } from "@mui/material";

const EventDetail = () => {
  // get event id from url
  const dispatch = useAppDispatch();
  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    if (eventId) {
      dispatch(getEventById(eventId));
    }
  }, []);

  const { loading, error } = useAppSelector((state) => state.event);
  const selectedEvent = useAppSelector((state) => state.event.selectedEvent);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>You are not authorized to view this event: {error}</div>;
  }
  return (
    <div>
      <h1> Event Details</h1>
      {selectedEvent && (
        <Grid>
          <Grid>{selectedEvent._id}</Grid>
          <Grid>Title: {selectedEvent.title}</Grid>
          <Grid>Description: {selectedEvent.description}</Grid>
          <Grid>Location: {selectedEvent.location}</Grid>
        </Grid>
      )}
      <EventInfo />
      <ChooseDate />
    </div>
  );
};

export default EventDetail;
