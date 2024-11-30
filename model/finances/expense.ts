import { SQLiteDatabase } from "expo-sqlite";
import { ColumnMapping, columnTypes, Repository } from "expo-sqlite-orm";
import { createExpenseTable } from "../schema";
import { findInventoryById, updateInventory } from "../inventory/inventory";
import { findBudgetRowById, updateBudget, TBudget } from "./budget";

export type TExpense = {
  id?: number;
  inventory_id?: number;
  budget_id?: number;
  last_modified: number;
  set_date: number;
  quantity_used: number;
  description: string;
  amount_of_money: number;
};

const ExpenseColumnMapping: ColumnMapping<TExpense> = {
  id: { type: columnTypes.INTEGER },
  inventory_id: { type: columnTypes.INTEGER },
  budget_id: { type: columnTypes.INTEGER },
  last_modified: { type: columnTypes.DATETIME },
  set_date: { type: columnTypes.DATETIME },
  quantity_used: { type: columnTypes.NUMERIC },
  amount_of_money: { type: columnTypes.NUMERIC },
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

  //update related inventory
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

  //updated related budget
  if (expense.budget_id) {
    const targetBudget = await findBudgetRowById(expense.budget_id, db);

    if (
      targetBudget &&
      targetBudget.id &&
      targetBudget.used &&
      targetBudget.set_date
    ) {
      const res = await updateBudget(
        {
          last_modified: Date.now(),
          name: targetBudget.name,
          used: targetBudget.used + expense.amount_of_money,
          id: targetBudget.id,
          max_amount: targetBudget.max_amount,
          end_date: targetBudget.end_date,
          set_date: targetBudget.set_date,
        },
        db
      );
      console.log("updated budget: ", res);
    }
  }

  return expenseRepository.insert(expense);
}

export async function findExpenseById(
  id: number,
  db: SQLiteDatabase
): Promise<TExpense | null> {
  await createExpenseTable(db);

  const expenses = await expenseRepository.query({
    where: { id: { equals: id } },
  });
  return expenses[0];
}

export async function findAllExpenses(db: SQLiteDatabase): Promise<TExpense[]> {
  return expenseRepository.query();
}

export async function updateExpense(
  expense: TExpense,
  db: SQLiteDatabase
): Promise<TExpense | null > {

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

    //updated related budget
    if (expense.budget_id && expense.id) {
      const targetBudget = (
        await findBudgetRowById(expense.budget_id, db)
      );

      const targetExpense = await findExpenseById(expense.id, db);
      const newval =
        targetBudget?.used +
        (expense.amount_of_money - targetExpense?.amount_of_money);
        console.log("new used amount: ", newval)
        if (newval < 0) {
          throw new RangeError("New amount of money added should be greater than or equal to current amount of money");
        }

        if (targetBudget.max_amount - newval < 0) {
          throw new RangeError("New amount of money added exceeds your budget");
        }

        if (
          targetBudget &&
          targetBudget.id &&
          targetExpense &&
          targetExpense.amount_of_money
        ) {

           await updateBudget(
            {
              last_modified: Date.now(),
              name: targetBudget.name,
              used: newval,
              id: targetBudget.id,
              max_amount: targetBudget.max_amount,
              end_date: targetBudget.end_date,
              set_date: targetBudget.set_date,
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
