import ChooseDate from "../components/EventDetail/ChooseDate";
import EventInfo from "../components/EventDetail/EventInfo";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { getEventById } from "../feature/event/eventActions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Grid,  } from "@mui/material";
import EventDetailSetting from "../components/EventDetail/EventDetailSetting";

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
          <Grid >{selectedEvent._id}</Grid>
          <Grid sx={{margin: "10px"}}>Title: {selectedEvent.title}</Grid>
          <Grid sx={{margin: "10px"}}>Description: {selectedEvent.description}</Grid>
          <Grid sx={{margin: "10px"}}>Location: {selectedEvent.location}</Grid>
        </Grid>
      )}
      <EventInfo />
      <ChooseDate eventStartDate={undefined} eventEndDate={undefined} />
      <EventDetailSetting />
    </div>
  );
};

export default EventDetail;
