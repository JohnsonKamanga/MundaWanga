import { SQLiteDatabase } from "expo-sqlite";
import { ColumnMapping, columnTypes, Repository } from "expo-sqlite-orm";
import { createRecordTable } from "../schema";

export type TRecord = {
  id?: number;
  fields: string;
};

const recordMapping: ColumnMapping<TRecord> = {
  id: { type: columnTypes.INTEGER },
  fields: { type: columnTypes.JSON },
};

const recordRepository = new Repository(
  "MundaWanga.db",
  "record",
  recordMapping
);

export async function addRecord(
  record: TRecord,
  db: SQLiteDatabase
): Promise<TRecord> {
  console.log('adding record table(outside table creation)...')
  
  console.log('adding record to database ...')

  return recordRepository.insert(record);
}

export async function findAllRecords(db: SQLiteDatabase): Promise<TRecord[]> {
  

  return recordRepository.query();
}

export async function deleteRecord(
  id: number,
  db: SQLiteDatabase
): Promise<boolean> {
  

  return recordRepository.destroy(id);
}

export function parseRecord(record: TRecord) {
  return {
    id: record?.id,
    ...JSON.parse(record.fields),
  };
}
