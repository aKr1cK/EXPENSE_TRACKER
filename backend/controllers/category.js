const categorySchema = require("../models/categoryModel");

exports.addCategory = async (req, resp) => {
  try {
    console.log("=========IN ADD CATEGORY=========");
    const { name, icon, type } = req.body;
    const category = categorySchema({
      name,
      icon,
      type,
    });
    await category.save();
    resp.status(200).json({ message: "Category saved successfully." });
  } catch (e) {
    console.log("=========IN ADD CATEGORY ERROR=========", e);
    return resp.status(500).json({ message: e.message });
  }
};

exports.getCategories = async (req, resp) => {
  try {
    console.log("=========IN GET CATEGORY =========");
    const categories = await categorySchema.find().sort({ creatdAt: -1 });
    resp.status(200).json(categories);
  } catch (e) {
    console.log("=========IN GET CATEGORY ERROR=========", e);
    return resp.status(500).json({ message: e.message });
  }
};
exports.getExpenseTypes = async (req, resp) => {
  try {
    console.log("=========IN GET EXPENSE TYPES =========");
    const expenseTypes = await categorySchema
      .find({ type: "2" })
      .sort({ creatdAt: -1 });
    resp.status(200).json(expenseTypes);
  } catch (e) {
    console.log("=========IN GET EXPENSE TYPES ERROR=========", e);
    return resp.status(500).json({ message: e.message });
  }
};

exports.getIncomeTypes = async (req, resp) => {
  try {
    console.log("=========IN GET EXPENSE TYPES =========");
    const incomeTypes = await categorySchema
      .find({ type: "1" })
      .sort({ creatdAt: -1 });
    resp.status(200).json(incomeTypes);
  } catch (e) {
    console.log("=========IN GET EXPENSE TYPES ERROR=========", e);
    return resp.status(500).json({ message: e.message });
  }
};

exports.deleteCategory = async (req, resp) => {
  try {
    console.log("=========IN CATEGORY DELETE  =========");
    const { _id } = req.body;
    categorySchema
      .findByIdAndDelete(_id)
      .then(() => {
        resp.status(200).json({ message: "Record Deleted successfully !!" });
      })
      .catch(() => {
        resp.status(500).json({ message: "Server Error" });
      });
  } catch (e) {
    console.log("=========IN CATEGORY DELETE ERROR=========", e);
    return resp.status(500).json({ message: e.message });
  }
};
