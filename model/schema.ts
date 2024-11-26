import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

export const db = SQLite.openDatabaseAsync("MundaWanga.db");

export function createBudgetTable(db: SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
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

export function createRecordSchemaTable(db: SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
  return db.runAsync(`
      CREATE TABLE IF NOT EXISTS  record_schema (
      id INTEGER PRIMARY KEY NOT NULL ,
      last_modified DATETIME DEFAULT CURRENT_TIMESTAMP ,
      set_date DATETIME DEFAULT CURRENT_TIMESTAMP , 
      name VARCHAR(20) NOT NULL UNIQUE,
      fields TEXT NOT NULL );
          `);
}

export function createRecordTable(db: SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
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

export function createInventoryTable(db: SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
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


export function createExpenseTable(db : SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
  return db.runAsync(`
      CREATE TABLE IF NOT EXIST expense (
      id INTEGER PRIMARY KEY NOT NULL,
      inventory_id INTEGER,
      last_modified DATETIME DEFAULT CURRENT_TIMESTAMP ,
      set_date DATETIME DEFAULT CURRENT_TIMESTAMP ,
      quantity_used REAL NOT NULL,
      amount_of_money REAL MOT NULL,
      description TEXT NOT NULL
      );
    `)
}

export function createIncomeTable(db : SQLiteDatabase): Promise<SQLite.SQLiteRunResult> {
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