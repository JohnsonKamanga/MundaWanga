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
  

  return recordSchemaRepository.insert(schema);
}
export async function findRecordSchemaByName(
  name: string,
  db: SQLiteDatabase
): Promise<TRecordSchema | null> {
  
  return recordSchemaRepository.findBy({ name: { eqauls: name } });
}

export async function findAllRecordSchemas(
  db: SQLiteDatabase
): Promise<TRecordSchema[]> {
  
  return recordSchemaRepository.query();
}

export function parseRecordSchema(schema: TRecordSchema) {
  const { fields, ...others } = schema;
  const fieldsObj = JSON.parse(fields);
  return {
    ...others,
    fields: fieldsObj,
  };
}
