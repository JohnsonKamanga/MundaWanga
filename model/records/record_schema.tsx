import { SQLiteDatabase } from "expo-sqlite";
import { ColumnMapping, columnTypes, Repository } from "expo-sqlite-orm";
import { createRecordSchemaTable } from "../schema";

export type TRecordSchema = {
  id?: number;
  name: string;
  fields: string;
};

const recordSchemaMapping: ColumnMapping<TRecordSchema> = {
  id: { type: columnTypes.INTEGER },
  name: { type: columnTypes.TEXT },
  fields: { type: columnTypes.JSON },
};
const recordSchemaRepository = new Repository(
  "MundaWanga.db",
  "record_schema",
  recordSchemaMapping
);

export async function addRecordSchema(
  schema: TRecordSchema,
  db: SQLiteDatabase
): Promise<TRecordSchema> {
  await createRecordSchemaTable(db);

  return recordSchemaRepository.insert(schema);
}
