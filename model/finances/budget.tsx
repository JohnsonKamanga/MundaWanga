import { SQLiteDatabase, SQLiteRunResult } from "expo-sqlite";
import { createBudgetTable} from "../schema";


export type TBudget = {
    name: string;
    set_date: number;
    end_date: number;
    max_amount: number;
    used: number;
  };

  export type TSubmitData = {
    name: string;
    end_date: number;
    max_amount: number;
  }

export async function addBudget(budget: TSubmitData, db: SQLiteDatabase): Promise<SQLiteRunResult>{
   await createBudgetTable(db);
   return db.runAsync(`
    INSERT INTO budget (name, end_date, max_amount)
    VALUES ("${budget.name}", ${budget.end_date}, ${budget.max_amount});`);
}

export function findBudgetRowById(id: number, db: SQLiteDatabase){
  return db.getFirstAsync<TBudget>(`SELECT * FROM budget WHERE id = ${id};`);
}