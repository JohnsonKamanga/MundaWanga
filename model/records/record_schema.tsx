import { SQLiteDatabase } from "expo-sqlite";
import { ColumnMapping, columnTypes, Repository } from "expo-sqlite-orm";
import { createRecordSchemaTable } from "../schema";

export type TRecordShema = {
  id?: number;
  fields: string;
};

const recordSchemamapping: ColumnMapping<TRecordShema> = {
  id: { type: columnTypes.INTEGER },
  fields: { type: columnTypes.JSON },
};

const recordSchemaRepository = new Repository(
  "MundaWanga.db",
  "record_schema",
  recordSchemamapping
);

export async function addRecordSchema(
  schema: TRecordShema,
  db: SQLiteDatabase
): Promise<TRecordShema> {
  await createRecordSchemaTable(db);

  return recordSchemaRepository.insert(schema);
}
