import {
  Box,
  Tab,
  Tabs,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import JoinExpense from "./JoinExpense";
import NewExpense from "./NewExpense";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { useEffect, useState } from "react";
import { listEvents } from "../../feature/event/eventActions";
import { shallowEqual } from "react-redux";

const SplitExpenseList = () => {
  const eventList = useAppSelector((state) => state.event.list, shallowEqual);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [barStatus, setBarStatus] = useState("UPCOMING");
  const [tabValue, setTabValue] = useState("1");

  useEffect(() => {
    dispatch(listEvents());
    console.log("EventList - useEffect - userInfo", eventList);
  }, [userInfo]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Grid container direction="column">
      <Grid item container direction="row" alignItems="center" padding={2}>
        <Grid item xs={4}>
          <Typography variant="h4">My Expense</Typography>
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
            <JoinExpense />
          </Grid>
          <Grid item>
            <NewExpense />
          </Grid>
        </Grid>
      </Grid>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChangeTab} variant="fullWidth">
            <Tab label="Upcoming Events" value="1" />
            <Tab label="Past Events" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
      {/* <Grid item px={2}>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={barStatus}
          onChange={handleChangeNavbar_1}
          aria-label="Event List Nav Bar"
          variant="fullWidth"
        >
          <Tab label="Upcoming Events" value={"UPCOMING"} />
          <Tab label="Pending Events" value={"PENDING"} />
          <Tab label="Past Events" value={"PAST"} />
        </Tabs>
      </Box>
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
            if (barStatus === "PAST" && event.status === "PAST") {
              return (
                <ListItem key={`${event._id}.${index}`}>
                  <EventItem event={event} />
                </ListItem>
              );
            }
          })}
        </List>
      </Grid> */}
    </Grid>
  );
};

export default SplitExpenseList;
