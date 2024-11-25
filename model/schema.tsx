import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

export const db = SQLite.openDatabaseAsync("MundaWanga.db");

export function createBudgetTable(db: SQLiteDatabase): Promise<any> {
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

export function createRecordTable(db: SQLiteDatabase): Promise<any> {
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
