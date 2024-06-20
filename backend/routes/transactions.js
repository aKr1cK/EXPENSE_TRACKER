const { getBanks, addBank, deleteBank } = require("../controllers/bank");
const {
  getExpenseTypes,
  getIncomeTypes,
  addCategory,
  deleteCategory,
  getCategories,
} = require("../controllers/category");
const {
  getFamilyMembers,
  addFamilyMember,
  deleteFamilyMember,
} = require("../controllers/familyMember");

const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  getDashboardData,
} = require("../controllers/transactionsc");

const router = require("express").Router();

router
  .get("/get-family-members", getFamilyMembers)
  .post("/add-family-member", addFamilyMember)
  .post("/delete-family-member", deleteFamilyMember)
  .get("/get-banks", getBanks)
  .post("/add-bank", addBank)
  .post("/delete-bank", deleteBank)

  .get("/get-expenseTypes", getExpenseTypes)
  .get("/get-incomeTypes", getIncomeTypes)
  .get("/get-categories", getCategories)
  .post("/add-category", addCategory)
  .post("/delete-category", deleteCategory)

  .post("/get-transactions", getTransactions)
  .post("/add-transaction", addTransaction)
  .post("/delete-transaction", deleteTransaction)

  .get("/dashboard-data", getDashboardData);

module.exports = router;
