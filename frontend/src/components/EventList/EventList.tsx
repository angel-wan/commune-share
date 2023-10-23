import { useState } from "react";
import { Button, Grid, List, ListItem, Typography } from "@mui/material";
import EventListNavbar from "./EventListNavbar";
import EventItem from "./EventItem";
import { Event } from "../../types/event.types";

const tempEvents: Event[] = [
  {
    eid: 1000,
    title: "Dinner With A",
    time_start: new Date(2023, 9, 16, 12, 30, 0),
    time_end: new Date(2023, 9, 16, 14, 30, 0),
    location: "A Home",
    status: 0,
  },
  {
    eid: 1001,
    title: "Dinner With B",
    time_start: new Date(2023, 10, 24, 17, 30, 0),
    time_end: new Date(2023, 10, 24, 20, 0, 0),
    location: "Finch",
    status: 0,
  },
  {
    eid: 1002,
    title: "Dinner With C",
    time_start: new Date(2023, 11, 28, 12, 30, 0),
    time_end: new Date(2023, 11, 28, 19, 30, 0),
    location: "Cantek",
    status: 0,
  },
];

const EventList = () => {
  const [events, setEvents] = useState(tempEvents);

  return (
    <Grid container direction="column">
      <Grid item container direction="row" alignItems="center" padding={2}>
        <Grid item xs={4}>
          <Typography variant="h4">My Events</Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-end"
          spacing={1}
          xs={8}
        >
          <Grid item>
            <Button variant="outlined">Invitation</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined">New Event</Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item px={2}>
        <EventListNavbar />
      </Grid>

      <Grid item>
        <List>
          {events.map((event) => (
            <ListItem>
              <EventItem event={event} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default EventList;
