import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import SplitExpense from "../components/SplitExpense/SplitExpense";
import { getExpenseById } from "../feature/expense/expenseActions";
import { useParams } from "react-router-dom";

const SplitExpenseDetail = () => {
  const dispatch = useAppDispatch();
  const { expenseId } = useParams<{ expenseId: string }>();
  const selectedExpense = useAppSelector((state) => state.expense.selectedExpense);

  useEffect(() => {
    if (!expenseId) return;
    dispatch(getExpenseById(expenseId));
  }, []);

  if (!selectedExpense) {
    return <div>Expense not found</div>;
  }

  return (
    <>
      <SplitExpense selectedExpense={selectedExpense} />
    </>
  );
};

export default SplitExpenseDetail;
