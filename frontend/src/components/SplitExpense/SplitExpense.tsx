import { useState } from "react";
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
import { ExpenseState } from "../../feature/expense/expenseSlice";
interface SplitExpenseProps {
  selectedExpense: {
    expense: ExpenseState;
  };
}
const SplitExpense = (props: SplitExpenseProps) => {
  const { selectedExpense } = props;
  const [newExpense, setNewExpense] = useState<string>("");

  const handleAddExpense = () => {
    if (newExpense.trim() !== "") {
      setNewExpense("");
    }
  };

  return (
    <Grid container spacing={2} direction={"column"}>
      <Grid item>
        <Typography variant="h6" component="a">
          My Expense - {selectedExpense.expense.title}
        </Typography>
      </Grid>
      <Grid item container spacing={4}>
        <Grid item container sm={6} xs={12} spacing={1}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Item"
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Price"
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
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
            Total Amount: {"100"}
          </Typography>
          <Typography variant="body1" component="a">
            Average: ${"25"}
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
