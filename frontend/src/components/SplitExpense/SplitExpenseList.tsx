import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hook";
import { listExpense } from "../../feature/expense/expenseActions";
import { Grid, List, ListItem, Paper, Typography } from "@mui/material";
import JoinExpense from "./JoinExpense";
import NewExpense from "./NewExpense";

const SplitExpenseList = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.expense);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listExpense());
    console.log("ExpenseList - useEffect -", list);
  }, []);

  useEffect(() => {
    console.log("ExpenseList - useEffect - expenseList", list);
  }, [list]);

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
            <JoinExpense />
          </Grid>
          <Grid item>
            <NewExpense />
          </Grid>
        </Grid>
      </Grid>

      <List>
        {list.length > 0 ? (
          list.map((expense, index) => (
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
                  p: 2,
                  cursor: "pointer",
                }}
                onClick={() => onSelectExpense(expense._id)}
              >
                <Typography variant="h5">{expense.title}</Typography>
              </Grid>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Grid
              container
              component={Paper}
              direction="row"
              alignItems="center"
              border={"0.5px solid"}
              borderRadius={4}
              spacing={0}
              padding={1}
            >
              There is no expense
            </Grid>
          </ListItem>
        )}
      </List>
    </Grid>
  );
};

export default SplitExpenseList;
