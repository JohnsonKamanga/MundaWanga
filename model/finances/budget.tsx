import { SQLiteDatabase, SQLiteRunResult } from "expo-sqlite";
import { createBudgetTable} from "../schema";


export type TBudget = {
    name: string;
    set_date: number;
    end_date: number;
    limit: number;
    used: number;
  };

  export type TSubmitData = {
    name: string;
    end_date: number;
    limit: number;
  }

export async function addBudget(budget: TSubmitData, db: SQLiteDatabase): Promise<SQLiteRunResult>{
   await createBudgetTable(db);
   return db.runAsync(`INSERT INTO budget (name, set_date, end_date, limit) VALUES ("${budget.name}", datetime('now'), ${budget.end_date}, ${budget.limit});`);
}

export function findBudgetRowById(id: number, db: SQLiteDatabase){
  return db.getFirstAsync<TBudget>(`SELECT * FROM budget WHERE id = ${id};`);
}