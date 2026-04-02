export type TrasactionType = "income" | "expense";

export type Transaction = {
  id: string;
  date:string;
  amount: number;
  category: string;
  type: TrasactionType;
};