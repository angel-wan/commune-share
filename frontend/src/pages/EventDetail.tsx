import ChooseDate from "../components/EventDetail/ChooseDate";
import EventInfo from "../components/EventDetail/EventInfo";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { getEventById, removeEvent } from "../feature/event/eventActions";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { resetState } from "../feature/event/eventSlice";
import { getUsergroupCode } from "../feature/usergroup/usergroupActions";

const EventDetail = () => {
  // get event id from url
  const dispatch = useAppDispatch();
  const { eventId } = useParams<{ eventId: string }>();
  const { loading, error } = useAppSelector((state) => state.event);
  const { removedEvent, selectedTimeSlots } = useAppSelector(
    (state) => state.event
  );
  const { code } = useAppSelector((state) => state.usergroup);

  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      dispatch(getEventById(eventId)).then(() => {
        dispatch(getUsergroupCode(selectedEvent!.usergroupId));
      });
    }
  }, []);

  useEffect(() => {
    if (!removedEvent) return;
    dispatch({ type: resetState.type });
    navigate("/");
  }, [removedEvent]);

  const selectedEvent = useAppSelector((state) => state.event.selectedEvent);
  const expense = useAppSelector((state) => state.event.expense);

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

  const calculateBestTime = () => {
    //TODO: calculate best time
    console.log();
  };

  console.log(selectedEvent);
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
          <Grid sx={{ margin: "10px" }}>
            Invite Code: {code}
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
        schedule={selectedEvent.schedule}
        selectedTimeSlots={selectedTimeSlots ? selectedTimeSlots : []}
      />
      <div>{expense?.title}</div>
    </div>
  );
};

export default EventDetail;
