import { SQLiteDatabase } from "expo-sqlite";
import { ColumnMapping, columnTypes, Repository } from "expo-sqlite-orm";
import { createExpenseTable } from "../schema";
import { findInventoryById, updateInventory } from "../inventory/inventory";

export type TExpense = {
  id?: number;
  inventory_id?: number;
  last_modified: number;
  set_date: number;
  quantity_used: number;
  description: string;
  amount_of_money: number;
};

const ExpenseColumnMapping: ColumnMapping<TExpense> = {
  id: { type: columnTypes.INTEGER },
  inventory_id: { type: columnTypes.INTEGER },
  last_modified: { type: columnTypes.DATETIME },
  set_date: { type: columnTypes.DATETIME },
  quantity_used: { type: columnTypes.NUMERIC },
  amount_of_money: {type: columnTypes.NUMERIC},
  description: { type: columnTypes.TEXT },
};

const expenseRepository = new Repository(
  "MundaWanga.db",
  "expense",
  ExpenseColumnMapping
);

export async function addexpense(
  expense: TExpense,
  db: SQLiteDatabase
): Promise<TExpense> {
  await createExpenseTable(db);

  if (expense.inventory_id) {
    const targetInventory = await findInventoryById(expense.inventory_id, db);

    if (targetInventory && targetInventory.id) {
      await updateInventory(
        {
          last_modified: Date.now(),
          available_quantity:
            targetInventory.available_quantity - expense.quantity_used,
          name: targetInventory.name,
          id: targetInventory.id,
        },
        db
      );
    }
  }

  return expenseRepository.insert(expense);
}

export async function findExpenseById(
  id: number,
  db: SQLiteDatabase
): Promise<TExpense | null> {
  await createExpenseTable(db);
  return expenseRepository.findBy({ id: { equals: id } });
}

export async function findAllExpenses(db: SQLiteDatabase): Promise<TExpense[]> {
  await createExpenseTable(db);

  return expenseRepository.query();
}

export async function updateExpense(
  expense: TExpense,
  db: SQLiteDatabase
): Promise<TExpense | null> {
  await createExpenseTable(db);
  const sql = `UPDATE expense 
                 SET inventory_id = ?, last_modified = ?, quantity_used = ?, description = ? , amount_of_money = ?
                 WHERE id = ?`;
  const params = [
    expense.inventory_id,
    expense.last_modified,
    expense.quantity_used,
    expense.description,
    expense.amount_of_money,
    expense.id,
  ];

  if (expense.inventory_id && expense.id) {
    const targetInventory = await findInventoryById(expense.inventory_id, db);
    const targetExpense = await findExpenseById(expense.id, db);
    if (targetInventory && targetInventory.id && targetExpense) {
      await updateInventory(
        {
          last_modified: Date.now(),
          available_quantity:
            targetInventory.available_quantity -
            (targetExpense.quantity_used - expense.quantity_used),
          name: targetInventory.name,
          id: targetInventory.id,
        },
        db
      );
    }
  }

  return expenseRepository.databaseLayer.executeSql(sql, params);
}

export async function deleteExpense(
  id: number,
  db: SQLiteDatabase
): Promise<boolean> {
  await createExpenseTable(db);

  return expenseRepository.destroy(id);
}
