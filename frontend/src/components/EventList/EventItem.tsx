import { Box, Grid, Paper } from "@mui/material";
import { Event } from "../../types/event.types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface EventItemProp {
  event: Event;
}

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
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const EventItem: React.FC<EventItemProp> = ({ event }) => {
  return (
    <Grid
      container
      component={Paper}
      direction="row"
      alignItems="center"
      border={"0.5px solid"}
      borderRadius={2}
      spacing={0}
      sx={{
        p: 1,
      }}
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
            {event.time_start.getDate()}
          </Grid>
          <Grid item>{months[event.time_start.getMonth()]}</Grid>
        </Box>
      </Grid>

      <Grid item xs={2} component="h4" sx={{ px: 1 }}>
        {getFormattedTime(event.time_start)} -{" "}
        {getFormattedTime(event.time_end)}
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
