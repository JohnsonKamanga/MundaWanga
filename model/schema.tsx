import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

// async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.WebSQLDatabase> {
//   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
//     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
//   }
//   const asset = await Asset.fromModule(require(pathToDatabaseFile)).downloadAsync();
//   await FileSystem.copyAsync({
//     from: asset.localUri,
//     to: FileSystem.documentDirectory + 'SQLite/myDatabaseName.db',
//   });
//   return openDatabase('myDatabaseName.db');
// }

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
      fields TEXT NOT NULL );
          `);
}

export function createRecordSchemaTable(db: SQLiteDatabase): Promise<any> {
  return db.runAsync(`
      CREATE TABLE IF NOT EXISTS  record_schema (
      id INTEGER PRIMARY KEY NOT NULL , 
      fields TEXT NOT NULL );
          `);
}
