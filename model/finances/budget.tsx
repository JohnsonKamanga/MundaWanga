import { SQLiteDatabase, SQLiteExecuteAsyncResult, SQLiteExecuteSyncResult, SQLiteRunResult } from "expo-sqlite";
import { createBudgetTable} from "../schema";
import { ColumnMapping, columnTypes, Repository } from "expo-sqlite-orm";


export type TBudget = {
    id: number;
    name: string;
    set_date: number;
    end_date: number;
    last_modified: number;
    max_amount: number;
    used: number;
  };

  const budgetColumnMapping : ColumnMapping<TBudget | TSubmitData> = {
    id: {type: columnTypes.INTEGER},
    name: {type: columnTypes.TEXT},
    set_date: {type: columnTypes.DATETIME, default: ()=> Date.now()},
    last_modified: {type: columnTypes.DATETIME, default: ()=> Date.now()},
    end_date: {type: columnTypes.DATETIME},
    used: {type: columnTypes.NUMERIC, default: ()=> 0.0},
    max_amount: {type: columnTypes.NUMERIC}
  }

  export type TSubmitData = {
    name: string;
    set_date?: number;
    end_date: number;
    last_modified?: number;
    max_amount: number;
    used?: number;
    id?:number;
  }

  const budgetRepository = new Repository('MundaWanga.db', 'budget', budgetColumnMapping);

export async function addBudget(budget: TSubmitData, db: SQLiteDatabase): Promise<TBudget | TSubmitData>{
   await createBudgetTable(db);
   
   return budgetRepository.insert(budget);
}

export async function findBudgetRowById(id: number, db: SQLiteDatabase): Promise<TBudget | TSubmitData | null>{
  await createBudgetTable(db);
  return budgetRepository.findBy({id:{eqauls: id}});
}

export async function findAllBudgets(db: SQLiteDatabase): Promise<TBudget[] | TSubmitData[]>{
  await createBudgetTable(db);

  return budgetRepository.query();
}

export async function updateBudget(updatedBudget : TBudget, db: SQLiteDatabase): Promise<TBudget | TSubmitData | null>{
  await createBudgetTable(db);
  let result: SQLiteExecuteSyncResult<TBudget>;
  const sql = `UPDATE budget 
               SET name = ?, end_date = ?, max_amount = ?, last_modified = ?, used = ? 
               WHERE id = ?`
  const params = [updatedBudget.name, updatedBudget.end_date, updatedBudget.max_amount, updatedBudget.last_modified, updatedBudget.used, updatedBudget.id];
  const statement = db.prepareSync(`UPDATE budget 
               SET name = $name, end_date = $end_date, max_amount = $max_amount, last_modified = $last_modified, used = $used 
               WHERE id = $id`);
  //return budgetRepository.databaseLayer.executeSql(sql, params);
  
      result = statement.executeSync<TBudget>({
      $name : updatedBudget.name, $end_date: updatedBudget.end_date,$max_amount: updatedBudget.max_amount, $last_modified: updatedBudget.last_modified, $used: updatedBudget.used, $id: updatedBudget.id
    });
    console.log('update: ',result.getFirstSync())
    
  result.resetSync();
  return result.getFirstSync();
  
}

export async function deleteBudget(budget: TBudget, db: SQLiteDatabase): Promise<boolean>{
 await createBudgetTable(db);

 return budgetRepository.destroy(budget.id);
}