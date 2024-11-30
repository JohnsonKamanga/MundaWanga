import { SQLiteDatabase } from "expo-sqlite";
import { ColumnMapping, columnTypes, Repository } from "expo-sqlite-orm";
import { createRecordTable } from "../schema";

export type TRecord = {
  id?: number;
  fields: string;
  set_date?: number;
  last_modified?: number;
  schema_id: number;
};

const recordMapping: ColumnMapping<TRecord> = {
  id: { type: columnTypes.INTEGER },
  fields: { type: columnTypes.JSON },
  set_date: { type: columnTypes.DATETIME },
  last_modified: { type: columnTypes.DATETIME },
  schema_id: { type: columnTypes.INTEGER },
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
  console.log("adding record table(outside table creation)...");

  console.log("adding record to database ...");

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
  const { fields, ...others } = record;
  return {
    ...others,
    ...JSON.parse(fields),
  };
}

export async function findRecordsByQuery(
  query: string,
  db: SQLiteDatabase,
  queryOptions?: {
    fields?: "ASC" | "DESC";
    last_modified?: "ASC" | "DESC";
  }
): Promise<TRecord[]> {
  const options = queryOptions
    ? {
        where: {
          fields: { contains: `%${query}%` },
        },
        order: queryOptions,
      }
    : {
        where: {
          fields: { contains: `%${query}%` },
        },
      };

  const jsonRecords = await recordRepository.query(options);
  const parsedRecords: TRecord[] = [];

  for (let i = 0; i < jsonRecords.length; i++) {
    parsedRecords.push(parseRecord(jsonRecords[i]));
  }

  return parsedRecords;
}
