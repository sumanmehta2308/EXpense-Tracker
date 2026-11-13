import {createExpenseModel,getAllExpensesModel,updateExpenseModel,deleteExpenseModel,} from "../models/expenseModel.js";
export const createExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    if (
      !Number.isFinite(amount) ||
      amount <= 0 ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof category !== "string" ||
      !category.trim()
    ) 
    {
      return res.status(400)   .json({ message: "Please provide valid expense details" });
    }
    const result = await createExpenseModel(amount,description.trim(),category.trim()
    );
    res.status(201).json({message: "Expense created successfully",  id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating expense",error: error.message,
    });
  }
};
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await getAllExpensesModel();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving expenses",
      error: error.message,
    });
  }
};
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category } = req.body;
    if (!/^\d+$/.test(id) || Number(id) < 1) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }
    if (
      !Number.isFinite(amount) ||
      amount <= 0 ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof category !== "string" ||
      !category.trim()
    ) 
    {
      return res.status(400).json({ message: "Please provide valid expense details" });
    }
    const result = await updateExpenseModel(id,amount,description.trim(),category.trim()
    );
    if (!result) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating expense",
      error: error.message,
    });
  }
};
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    if (!/^\d+$/.test(id) || Number(id) < 1) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }
    const result = await deleteExpenseModel(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting expense",
      error: error.message,
    });
  }
};
