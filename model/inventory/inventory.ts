import { SQLiteDatabase } from "expo-sqlite";
import { ColumnMapping, columnTypes, Repository } from "expo-sqlite-orm";
import { createInventoryTable } from "../schema";

export type TInventory = {
  id?: number;
  last_modified: number;
  set_date: number;
  available_quantity: number;
  name: string;
};

const inventoryColumnMapping: ColumnMapping<TInventory> = {
  id: { type: columnTypes.INTEGER },
  last_modified: { type: columnTypes.DATETIME },
  set_date: { type: columnTypes.DATETIME },
  available_quantity: { type: columnTypes.NUMERIC },
  name: { type: columnTypes.TEXT },
};

const inventoryRepository = new Repository(
  "MundaWanga.db",
  "inventory",
  inventoryColumnMapping
);

export async function addInventory(
  inventory: TInventory,
  db: SQLiteDatabase
): Promise<TInventory> {
  

  return inventoryRepository.insert(inventory);
}

export async function findInventoryById(
  id: number,
  db: SQLiteDatabase
): Promise<TInventory | null> {
  
  return inventoryRepository.findBy({ id: { equals: id } });
}

export async function findAllInventory(
  db: SQLiteDatabase
): Promise<TInventory[]> {
  

  return inventoryRepository.query();
}

export async function updateInventory(
  inventory: {
    last_modified: number;
    available_quantity: number;
    name: string;
    id: number;
  },
  db: SQLiteDatabase
): Promise<TInventory | null> {
  
  const sql = `UPDATE inventory 
                 SET last_modified = ?, available_quantity = ?, name = ? 
                 WHERE id = ?`;
  const params = [
    inventory.last_modified,
    inventory.available_quantity,
    inventory.name,
    inventory.id,
  ];

  return inventoryRepository.databaseLayer.executeSql(sql, params);
}

export async function deleteInventory(
  id: number,
  db: SQLiteDatabase
): Promise<boolean> {
  

  return inventoryRepository.destroy(id);
}
