export interface ExpenseRequest {
  title?: string;
}

export interface ExpenseItemRequest {
  expenses: { title: string; amount: number }[];
}
