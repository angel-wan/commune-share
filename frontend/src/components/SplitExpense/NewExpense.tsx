import { Button, Grid, TextField } from "@mui/material";
import { useAppDispatch } from "../../app/hook";
import {
  createExpenseGroup,
  CreateExpenseType,
  ExpenseType,
} from "../../feature/expense/expenseActions";
import { useCallback, useState } from "react";
const NewExpense = () => {
  const dispatch = useAppDispatch();

  const [expenseData, setExpenseData] = useState<CreateExpenseType>({
    title: "",
    type: ExpenseType.GROUP,
  });
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseData({ ...expenseData, [event.target.id]: event.target.value });
  };
  const handleClickCreate = useCallback(() => {
    dispatch(createExpenseGroup(expenseData));
  }, []);
  return (
    <Grid>
      <Grid>Expense Name</Grid>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Title"
        type="title"
        fullWidth
        variant="standard"
        value={expenseData.title}
        onChange={handleInput}
      />
      <Button onClick={handleClickCreate}>Create</Button>
    </Grid>
  );
};

export default NewExpense;
