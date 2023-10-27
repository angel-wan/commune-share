import { useEffect, useState } from "react";
import { getUserById } from "../../feature/auth/authActions";
import {
  getExpenseById,
  addExpenseItem,
  removeExpenseItem,
  getExpenseSummary,
  ExpenseItem,
} from "../../feature/expense/expenseActions";
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
import { ExpenseSummaryState } from "../../feature/expense/expenseSlice";

interface SplitExpenseProp {
  expenseId: string;
}

const SplitExpense: React.FC<SplitExpenseProp> = ({ expenseId }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userInfo?.id) ?? "";
  const user = useAppSelector((state) => state.auth.user);
  const { loading, success, expenseSummary } = useAppSelector(
    (state) => state.expense
  );
  const [userExpenseSummary, setUserExpenseSummary] = useState<any[]>([]);

  const [expenseItem, setExpenseItem] = useState<ExpenseItem>({
    title: "",
    amount: 0,
  });
  //const [userMap, setUserMap] = useState({});

  useEffect(() => {
    if (expenseId) {
      dispatch(getExpenseById(expenseId));
      dispatch(getExpenseSummary(expenseId));
    }
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseItem({ ...expenseItem, [event.target.id]: event.target.value });
  };

  const handleRefresh = () => {
    dispatch(getExpenseById(expenseId));
    dispatch(getExpenseSummary(expenseId));
  };

  const handleAddExpense = () => {
    dispatch(
      addExpenseItem({ expenseId: expenseId, expenses: [expenseItem] })
    ).then(handleRefresh);
  };

  const handleDeleteExpense = (expenseItemId: string) => {
    dispatch(
      removeExpenseItem({ expenseId: expenseId, expenseItemId: expenseItemId })
    ).then(handleRefresh);
  };

  useEffect(() => {
    const fetchUserInformation = async (expense: {
      from: any;
      to: any;
      amount?: number;
    }) => {
      const fromUserName = (await dispatch(getUserById(expense.from))).payload
        .user.username;
      const toUserName = (await dispatch(getUserById(expense.to))).payload.user
        .username;
      return { ...expense, fromUserName, toUserName };
    };

    const fetchUserInformationForExpenses = async () => {
      const result = await Promise.all(
        (expenseSummary?.calculation || []).map((expense) =>
          fetchUserInformation(expense)
        )
      );
      setUserExpenseSummary(result);
    };

    if (expenseSummary?.calculation) {
      fetchUserInformationForExpenses();
    }
  }, [expenseSummary]);
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
                            onClick={() => handleDeleteExpense(expense._id)}
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
            {userExpenseSummary?.map((cal, index) => {
              if (cal.from === userId && cal.to === userId) {
                return null;
              }
              if (cal.from === userId) {
                console.log(cal);
                return (
                  <ListItem key={index}>
                    <Typography variant="body1" component="a">
                      Pay to <b>{cal.toUserName}</b> ${cal.amount}
                    </Typography>
                  </ListItem>
                );
              }
              if (cal.to === userId) {
                console.log(cal);
                return (
                  <ListItem key={index}>
                    <Typography variant="body1" component="a">
                      Receive from <b>{cal.fromUserName}</b> ${cal.amount}
                    </Typography>
                  </ListItem>
                );
              }
            })}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SplitExpense;
