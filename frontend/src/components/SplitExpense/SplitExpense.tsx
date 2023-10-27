import { useEffect, useState } from "react";
import {
  getExpenseById,
  addExpenseItem,
  getExpenseSummary,
  ExpenseItem,
} from "../../feature/expense/expenseActions";
import { UserExpenseState } from "../../feature/expense/expenseSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";

import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, Refresh } from "@mui/icons-material";

interface SplitExpenseProp {
  expenseId: string;
}

const SplitExpense: React.FC<SplitExpenseProp> = ({ expenseId }) => {
  const dispatch = useAppDispatch();
  const { code } = useAppSelector((state) => state.usergroup);
  const userId = useAppSelector((state) => state.auth.userInfo?.id) ?? "";
  const { loading, success, selectedExpense, expenseSummary } = useAppSelector(
    (state) => state.expense
  );

  const [expenseItem, setExpenseItem] = useState<ExpenseItem>({
    title: "",
    amount: 0,
  });

  useEffect(() => {
    if (expenseId) {
      dispatch(getExpenseById(expenseId));
      dispatch(getExpenseSummary(expenseId));
    }
  }, []);

  // useEffect(() => {
  //   console.log(
  //     "useEffect: expenseSummary.calculation",
  //     expenseSummary?.calculation
  //   );
  //   console.log("useEffect: expenseSummary", expenseSummary?.calculation[0].);
  //   console.log("useEffect: expenseSummary", expenseSummary?.calculation.to);
  //   console.log(
  //     "useEffect: expenseSummary",
  //     expenseSummary?.calculation.amount
  //   );
  // }, [loading, code]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseItem({ ...expenseItem, [event.target.id]: event.target.value });
  };

  const handleAddExpense = () => {
    dispatch(
      addExpenseItem({ expenseId: expenseId, expenses: [expenseItem] })
    ).then(() => {
      dispatch(getExpenseSummary(expenseId));
    });
  };

  const handleRefresh = () => {
    dispatch(getExpenseById(expenseId));
    dispatch(getExpenseSummary(expenseId));
  };

  return (
    <Grid container spacing={2} direction={"column"}>
      <Grid item container spacing={4}>
        <Grid item container sm={6} xs={12} spacing={1}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id="title"
              label="Item"
              type="text"
              value={expenseItem.title}
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={4} maxHeight="">
            <TextField
              fullWidth
              id="amount"
              label="Price"
              type="number"
              value={expenseItem.amount}
              onChange={handleInput}
            />
          </Grid>
          <Grid item style={{ width: "100px" }}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddExpense}
            >
              Add
            </Button>
          </Grid>
          <Grid item style={{ width: "100px" }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>

        <Grid item sm={6} xs={12}>
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: "#111111",
              color: "grey.300",
              border: "1px solid",
              borderColor: "grey.800",
              borderRadius: 2,
              width: 1,
            }}
          >
            <Table aria-label="expense table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenseSummary?.groupedExpenses[userId] &&
                  expenseSummary?.groupedExpenses[userId].expenses.map(
                    (expense) => (
                      <TableRow key={expense._id}>
                        <TableCell>{expense.title}</TableCell>
                        <TableCell>${expense.amount}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="delete"
                            size="large"
                            color="error"
                            //onClick={() => onDelete(todo.id)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Grid item>
        <Divider orientation="horizontal" flexItem />
      </Grid>

      <Grid item container spacing={4}>
        <Grid item container direction={"column"} sm={6} xs={12}>
          <Typography variant="body1" component="a">
            Total Amount: {expenseSummary?.sum}
          </Typography>
          <Typography variant="body1" component="a">
            Average: ${expenseSummary?.average}
          </Typography>
          <Typography variant="body1" component="a">
            I Paid: $
            {expenseSummary?.groupedExpenses[userId]
              ? expenseSummary?.groupedExpenses[userId].total
              : 0}
          </Typography>
        </Grid>
        <Grid item container direction="column" sm={6} xs={12}>
          <List>
            {expenseSummary?.calculation.map((cal, index) => {
              if (cal.from === userId) {
                return (
                  <ListItem key={index}>
                    <Typography variant="body1" component="a">
                      Pay to <b>{cal.to}</b> ${cal.amount}
                    </Typography>
                  </ListItem>
                );
              }
              if (cal.to === userId) {
                return (
                  <ListItem key={index}>
                    <Typography variant="body1" component="a">
                      Receive from <b>{cal.from}</b> ${cal.amount}
                    </Typography>
                  </ListItem>
                );
              }
              // if (barStatus === "PAST" && event.status === "PAST") {
              //   return (
              //     <ListItem key={`${event._id}.${index}`}>
              //       <EventItem event={event} />
              //     </ListItem>
              //   );
              // }
            })}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SplitExpense;
