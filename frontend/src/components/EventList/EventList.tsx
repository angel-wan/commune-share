import { useState } from "react";
import { Button, Grid, List, ListItem, Typography } from "@mui/material";
import EventListNavbar from "./EventListNavbar";
import EventItem from "./EventItem";
import JoinEvent from "./JoinEvent";
import NewEvent from "./NewEvent";
import { Event } from "../../types/event.types";
import { useAppSelector } from "../../app/hook";

const EventList = () => {
  const eventList = useAppSelector((state) => state.event.list);
  console.log("eventList", eventList);
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
            <JoinEvent />
          </Grid>
          <Grid item>
            <NewEvent />
          </Grid>
        </Grid>
      </Grid>

      <Grid item px={2}>
        <EventListNavbar />
      </Grid>

      <Grid item>
        <List>
          {eventList.map((event, index) => (
            <ListItem key={`${event._id}.${index}`}>
              <EventItem event={event} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default EventList;
