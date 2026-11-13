import db from "../config/database.js";

export const createExpenseModel = async (amount, description, category) => {
  const sql = `INSERT INTO Expenses (amount, description, category) VALUES (?, ?, ?)`;
  const [result] = await db.execute(sql, [amount, description, category]);
  return result;
};

export const getAllExpensesModel = async () => {
  const sql = `SELECT * FROM Expenses ORDER BY id DESC`;
  const [rows] = await db.execute(sql);
  return rows;
};

export const updateExpenseModel = async (id, amount, description, category) => {
  const [existing] = await db.execute("SELECT id FROM Expenses WHERE id = ?", [
    id,
  ]);

  if (existing.length === 0) {
    return null;
  }

  const sql = `UPDATE Expenses SET amount = ?, description = ?, category = ? WHERE id = ?`;
  const [result] = await db.execute(sql, [amount, description, category, id]);
  return result;
};

export const deleteExpenseModel = async (id) => {
  const sql = "DELETE FROM Expenses WHERE id = ?";
  const [result] = await db.execute(sql, [id]);
  return result;
};
