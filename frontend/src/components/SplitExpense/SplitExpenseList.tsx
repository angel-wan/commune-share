import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hook";
import { listExpense } from "../../feature/expense/expenseActions";
import { Grid, List, ListItem, Paper, Typography } from "@mui/material";
import JoinExpense from "./JoinExpense";
import NewExpense from "./NewExpense";
import { Button } from "rsuite";

const SplitExpenseList = () => {
  const dispatch = useAppDispatch();
  const expenseList = useAppSelector((state) => state.expense.list);
  const { userInfo } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listExpense());
    console.log("ExpenseList - useEffect - expense", expenseList);
  }, [userInfo]);

  const onSelectExpense = (event_id: string) => {
    navigate(`/expense/${event_id}`);
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
            <Button
              onClick={() => {
                dispatch(listExpense());
              }}
            >
              Fetch
            </Button>
          </Grid>
          <Grid item>
            <JoinExpense />
          </Grid>
          <Grid item>
            <NewExpense />
          </Grid>
        </Grid>
      </Grid>

      <List>
        <ListItem>Test</ListItem>
        {expenseList.map((expense, index) => (
          <ListItem key={index}>
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
              onClick={() => onSelectExpense(expense._id)}
            >
              <Typography variant="h5">{expense.title}</Typography>
            </Grid>
          </ListItem>
        ))}
      </List>

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
