import { Grid, List, ListItem, Typography } from "@mui/material";
import EventListNavbar from "./EventListNavbar";
import EventItem from "./EventItem";
import JoinEvent from "./JoinEvent";
import NewEvent from "./NewEvent";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { useEffect, useState } from "react";
import { listEvents } from "../../feature/event/eventActions";
import Login from "../Auth/Login";
import { shallowEqual } from "react-redux";
import { isAuthenticated } from "../../feature/auth/authSlice";

const EventList = () => {
  const eventList = useAppSelector((state) => state.event.list, shallowEqual);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [barStatus, setBarStatus] = useState("UPCOMING");

  useEffect(() => {
    dispatch(listEvents());
    console.log("EventList - useEffect - userInfo", eventList);
  }, [userInfo]);

  return (
    <Grid container direction="column">
      <Grid item container direction="row" alignItems="center" padding={2}>
        <Grid item xs={4}>
          <Typography variant="h4">My Events {userInfo?.username}</Typography>
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
        <EventListNavbar setBarStatus={setBarStatus} barStatus={barStatus} />
      </Grid>

      <Grid item>
        <List>
          {eventList.map((event, index) => {
            if (barStatus === "UPCOMING" && event.status === "UPCOMING") {
              return (
                <ListItem key={`${event._id}.${index}`}>
                  <EventItem event={event} />
                </ListItem>
              );
            }
            if (barStatus === "PENDING" && event.status === "PENDING") {
              return (
                <ListItem key={`${event._id}.${index}`}>
                  <EventItem event={event} />
                </ListItem>
              );
            }
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default EventList;
