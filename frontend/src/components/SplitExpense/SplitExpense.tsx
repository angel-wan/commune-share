import { useEffect, useState } from "react";
import {
  getExpenseById,
  addExpenseItem,
  ExpenseItem,
  getExpenseSummary,
} from "../../feature/expense/expenseActions";
import { getUsergroupCode } from "../../feature/usergroup/usergroupActions";
import { useAppDispatch, useAppSelector } from "../../app/hook";

import {
  Button,
  Divider,
  Grid,
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
import { Add } from "@mui/icons-material";

interface SplitExpenseProp {
  expenseId: string;
}

const SplitExpense: React.FC<SplitExpenseProp> = ({ expenseId }) => {
  const dispatch = useAppDispatch();
  const { loading, success, selectedExpense, expenseSummary } = useAppSelector(
    (state) => state.expense
  );
  const { code } = useAppSelector((state) => state.usergroup);

  const [expenseItem, setExpenseItem] = useState<ExpenseItem>({
    title: "",
    amount: 0,
  });

  useEffect(() => {
    if (expenseId) {
      dispatch(getExpenseById(expenseId)).then(() => {
        console;
        dispatch(getUsergroupCode(selectedExpense?.userGroup ?? ""));
      });
      dispatch(getExpenseSummary(expenseId));
    }
  }, []);

  useEffect(() => {
    console.log("useEffect: code", code);
    console.log("useEffect: selectedExpense", selectedExpense?.userGroup);
    console.log(
      "useEffect: selectedExpense.userExpense",
      selectedExpense?.userExpense
    );
    console.log("useEffect: expenseSummary", expenseSummary?.groupedExpenses);
  }, [loading, code]);

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

  return (
    <Grid container spacing={2} direction={"column"}>
      <Grid item>
        <Typography variant="h6" component="a">
          My Expense
        </Typography>
      </Grid>
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
          <Grid item xs={4}>
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
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => {
                console.log("loading", loading);
                console.log("selectedExpense", selectedExpense);
                console.log("expenseSummary", expenseSummary);
              }}
            >
              Test
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
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {/* {todos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  ))} */}
                </TableRow>
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
        </Grid>
        <Grid item sm={6} xs={12}>
          <Typography variant="body1" component="a">
            Pay to <b>{"abc"}</b> ${"25"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SplitExpense;
