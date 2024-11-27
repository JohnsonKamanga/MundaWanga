import { SQLiteDatabase } from "expo-sqlite";
import { ColumnMapping, columnTypes, Repository } from "expo-sqlite-orm";
import { createIncomeTable } from "../schema";
import { findInventoryById, updateInventory } from "../inventory/inventory";

export type TIncome = {
  id?: number;
  inventory_id?: number;
  last_modified: number;
  set_date: number;
  quantity_added: number;
  description: string;
  amount_of_money: number;
};

const incomeColumnMapping: ColumnMapping<TIncome> = {
  id: { type: columnTypes.INTEGER },
  inventory_id: { type: columnTypes.INTEGER },
  last_modified: { type: columnTypes.DATETIME },
  set_date: { type: columnTypes.DATETIME },
  quantity_added: { type: columnTypes.NUMERIC },
  amount_of_money: {type: columnTypes.NUMERIC},
  description: { type: columnTypes.TEXT },
};

const incomeRepository = new Repository(
  "MundaWanga.db",
  "income",
  incomeColumnMapping
);

export async function addIncome(
  income: TIncome,
  db: SQLiteDatabase
): Promise<TIncome> {
  

  if (income.inventory_id) {
    const targetInventory = await findInventoryById(income.inventory_id, db);

    if (targetInventory && targetInventory.id) {
      await updateInventory(
        {
          last_modified: Date.now(),
          available_quantity:
            targetInventory.available_quantity + income.quantity_added,
          name: targetInventory.name,
          id: targetInventory.id,
        },
        db
      );
    }
  }

  return incomeRepository.insert(income);
}

export async function findIncomeById(
  id: number,
  db: SQLiteDatabase
): Promise<TIncome | null> {
  
  return incomeRepository.findBy({ id: { equals: id } });
}

export async function findAllIncome(db: SQLiteDatabase): Promise<TIncome[]> {
  

  return incomeRepository.query();
}

export async function updateIncome(
  income: TIncome,
  db: SQLiteDatabase
): Promise<TIncome | null> {
  
  const sql = `UPDATE income 
                 SET inventory_id = ?, last_modified = ?, quantity_added = ?, description = ? , amount_of_money = ?
                 WHERE id = ?`;
  const params = [
    income.inventory_id,
    income.last_modified,
    income.quantity_added,
    income.description,
    income.amount_of_money,
    income.id,
  ];

  if (income.inventory_id && income.id) {
    const targetInventory = await findInventoryById(income.inventory_id, db);
    const targetIncome = await findIncomeById(income.id, db);
    if (targetInventory && targetInventory.id && targetIncome) {
      await updateInventory(
        {
          last_modified: Date.now(),
          available_quantity:
            targetInventory.available_quantity +
            (income.quantity_added - targetIncome.quantity_added),
          name: targetInventory.name,
          id: targetInventory.id,
        },
        db
      );
    }
  }

  return incomeRepository.databaseLayer.executeSql(sql, params);
}

export async function deleteIncome(
  id: number,
  db: SQLiteDatabase
): Promise<boolean> {
  

  return incomeRepository.destroy(id);
}
