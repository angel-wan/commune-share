import ChooseDate from "../components/EventDetail/ChooseDate";
import EventInfo from "../components/EventDetail/EventInfo";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { getEventById, removeEvent } from "../feature/event/eventActions";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { resetState } from "../feature/event/eventSlice";

const EventDetail = () => {
  // get event id from url
  const dispatch = useAppDispatch();
  const { eventId } = useParams<{ eventId: string }>();
  const { loading, error } = useAppSelector((state) => state.event);
  const { removedEvent } = useAppSelector((state) => state.event);
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      dispatch(getEventById(eventId));
    }
  }, []);

  useEffect(() => {
    console.log("removedEvent", removedEvent);
    if (!removedEvent) return;
    dispatch({ type: resetState.type });
    navigate("/");
  }, [removedEvent]);

  const selectedEvent = useAppSelector((state) => state.event.selectedEvent);

  const handleRemoveEvent = useCallback(() => {
    if (!selectedEvent) return;
    dispatch(removeEvent(selectedEvent._id));
  }, [dispatch, selectedEvent]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>You are not authorized to view this event: {error}</div>;
  }
  if (!selectedEvent) {
    return <div>Event not found</div>;
  }
  return (
    <div>
      <h1> Event Details</h1>
      {selectedEvent && (
        <Grid
          sx={{
            backgroundColor: "#1a1d24",
            alignItems: "center",
            border: "0.5px solid",
            borderRadius: 4,
            spacing: 0,
            p: 1,
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          <Grid sx={{ display: "none" }}>{selectedEvent._id}</Grid>
          <Grid sx={{ margin: "10px" }}>Title: {selectedEvent.title}</Grid>
          <Grid sx={{ margin: "10px" }}>
            Description: {selectedEvent.description}
          </Grid>
          <Grid sx={{ margin: "10px" }}>
            Location: {selectedEvent.location}
          </Grid>
          <Button
            variant="outlined"
            onClick={handleRemoveEvent}
            sx={{ margin: "10px" }}
          >
            {" "}
            Remove{" "}
          </Button>
        </Grid>
      )}
      <EventInfo />
      <ChooseDate
        eventStartDate={selectedEvent.eventStartDate}
        eventEndDate={selectedEvent.eventEndDate}
        event_id={selectedEvent._id}
      />
    </div>
  );
};

export default EventDetail;
