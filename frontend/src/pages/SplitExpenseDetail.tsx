import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../app/hook";
import { getExpenseById } from "../feature/expense/expenseActions";
import SplitExpense from "../components/SplitExpense/SplitExpense";

const SplitExpenseDetail = () => {
  const { expenseId } = useParams<{ expenseId: string }>();

  const dispatch = useAppDispatch();
  const { loading, selectedExpense } = useAppSelector((state) => state.expense);

  useEffect(() => {
    if (expenseId) {
      dispatch(getExpenseById(expenseId));
    }
  }, []);

  useEffect(() => {
    console.log("loading", loading);
    console.log("selectedExpense", selectedExpense);
  }, [loading]);

  return (
    <Grid container direction="column">
      <Grid item>{selectedExpense?.title}</Grid>
      <Grid item>
        <SplitExpense expenseId={expenseId ?? ""} />
      </Grid>
    </Grid>
  );
};

export default SplitExpenseDetail;
