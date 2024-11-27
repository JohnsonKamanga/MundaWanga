import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

export const db = SQLite.openDatabaseAsync("MundaWanga.db");

export async function createBudgetTable(db: SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
  return db.runAsync(`
    CREATE TABLE IF NOT EXISTS  budget (
    id INTEGER PRIMARY KEY NOT NULL , 
    name VARCHAR(20) , 
    set_date DATETIME DEFAULT CURRENT_TIMESTAMP ,
    last_modified DATETIME DEFAULT CURRENT_TIMESTAMP , 
    end_date DATETIME NOT NULL , 
    max_amount REAL NOT NULL , 
    used REAL DEFAULT 0 NOT NULL );
       `);
}

export async function createRecordSchemaTable(db: SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
  return db.runAsync(`
      CREATE TABLE IF NOT EXISTS  record_schema (
      id INTEGER PRIMARY KEY NOT NULL ,
      last_modified DATETIME DEFAULT CURRENT_TIMESTAMP ,
      set_date DATETIME DEFAULT CURRENT_TIMESTAMP , 
      name VARCHAR(20) NOT NULL UNIQUE,
      fields TEXT NOT NULL );
          `);
}

export async function createRecordTable(db: SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
  
  return db.runAsync(`
      CREATE TABLE IF NOT EXISTS  record (
      id INTEGER PRIMARY KEY NOT NULL , 
      last_modified DATETIME DEFAULT CURRENT_TIMESTAMP ,
      set_date DATETIME DEFAULT CURRENT_TIMESTAMP ,
      schema_id INTEGER NOT NULL,
      fields TEXT NOT NULL ,
      FOREIGN KEY (schema_id)
        REFERENCES record_schema (id)
      );
          `);
}

export async function createInventoryTable(db: SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
  return db.runAsync(`
      CREATE TABLE IF NOT EXISTS  inventory (
      id INTEGER PRIMARY KEY NOT NULL , 
      last_modified DATETIME DEFAULT CURRENT_TIMESTAMP ,
      set_date DATETIME DEFAULT CURRENT_TIMESTAMP ,
      name VARCHAR(20) NOT NULL UNIQUE,
      available_quantity REAL NOT NULL
      );
          `);
}


export async function createExpenseTable(db : SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
  
  return db.runAsync(`
      CREATE TABLE IF NOT EXISTS expense (
      id INTEGER PRIMARY KEY NOT NULL,
      inventory_id INTEGER,
      budget_id INTEGER,
      last_modified DATETIME DEFAULT CURRENT_TIMESTAMP ,
      set_date DATETIME DEFAULT CURRENT_TIMESTAMP ,
      quantity_used REAL NOT NULL,
      amount_of_money REAL MOT NULL,
      description TEXT NOT NULL
      );
    `)
}

export async function createIncomeTable(db : SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
  
  return db.runAsync(`
      CREATE TABLE IF NOT EXISTS income (
      id INTEGER PRIMARY KEY NOT NULL,
      inventory_id INTEGER,
      last_modified DATETIME DEFAULT CURRENT_TIMESTAMP ,
      set_date DATETIME DEFAULT CURRENT_TIMESTAMP ,
      quantity_added REAL NOT NULL,
      amount_of_money REAL MOT NULL,
      description TEXT NOT NULL
      );
    `)
}

export async function createTables(db: SQLiteDatabase){
  await createRecordSchemaTable(db);
  console.log('record_schema table created');
  await createInventoryTable(db);
  console.log('inventory table created');
  await createBudgetTable(db);
  console.log('budget table created');
  await createExpenseTable(db);
  console.log('expense table created');
 await createIncomeTable(db);
 console.log('income table created');
  await createRecordTable(db);
  console.log('record table created');
}