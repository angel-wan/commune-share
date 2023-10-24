import { Box, Grid, Paper } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAppDispatch } from "../../app/hook";
import { getEventById } from "../../feature/event/eventActions";
import { EventState } from "../../feature/event/eventSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const getFormattedTime = (date: Date) => {
  const hour = new Date(date).getUTCHours();
  const minute = new Date(date).getUTCMinutes();
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const EventItem = (props: { event: EventState }) => {
  const { event } = props;
  const navigate = useNavigate();

  const onSelectEvent = (event_id: string) => {
    navigate(`/events/${event_id}`);
  };

  return (
    <Grid
      container
      component={Paper}
      direction="row"
      alignItems="center"
      border={"0.5px solid"}
      borderRadius={4}
      spacing={0}
      sx={{
        p: 1,
        cursor: "pointer",
      }}
      onClick={() => onSelectEvent(event._id)}
    >
      <Grid item xs={2}>
        <Box
          component="span"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 1,
          }}
        >
          <Grid item component="h2">
            {event.eventStartDatetime &&
              new Date(event.eventStartDatetime).getDate()}
          </Grid>
          <Grid item>
            {event.eventStartDatetime &&
              months[
                new Date(event.eventStartDatetime).getMonth()
              ].toUpperCase()}
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={2} component="h4" sx={{ px: 1 }}>
        {event.eventStartDatetime && getFormattedTime(event.eventStartDatetime)}{" "}
        - {event.eventEndDatetime && getFormattedTime(event.eventEndDatetime)}
      </Grid>

      <Grid item xs={6} sx={{ p: 1 }}>
        <Grid container direction="column">
          <Grid item component="h3">
            {event.title}
          </Grid>
          <Grid item component="h5">
            {event.location}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 1 }}
      >
        <ArrowForwardIosIcon />
      </Grid>
    </Grid>
  );
};

export default EventItem;
