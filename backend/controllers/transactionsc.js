const bankSchema = require("../models/bankModel");
const transactionSchema = require("../models/transactionsModel");
const categorySchema = require("../models/categoryModel");
const familyMemberSchema = require("../models/familyMemberModel");

exports.addTransaction = async (req, resp) => {
  try {
    console.log("=========IN ADD TRANSACTIONS=========");
    const {
      title,
      amount,
      type,
      category,
      subcategory,
      date,
      isDirect,
      bank,
      transactionBy,
      transactionFor,
      description,
    } = req.body;
    const transaction = transactionSchema({
      title,
      amount,
      type,
      category,
      subcategory,
      date,
      isDirect,
      bank,
      transactionBy,
      transactionFor,
      description,
    });
    await transaction.save();
    if (isDirect) {
      updateBankBalance("", amount, type, bank);
    }
    resp.status(200).json({
      message: `${type == "1" ? "Income" : "Expense"} saved successfully.`,
    });
  } catch (e) {
    console.log("=========IN ADD TRANSACTIONS ERROR=========", e);
    return resp.status(500).json({ message: e.message });
  }
};

async function updateBankBalance(bankName, amount, type, bankId) {
  try {
    let banks;
    if (bankName == "") {
      banks = await bankSchema.find({ _id: bankId });
    } else {
      banks = await bankSchema.find({ name: bankName });
    }
    banks = banks[0];
    if (type == "1") {
      banks.balance = Number(banks.balance) + Number(amount);
    } else {
      banks.balance = Number(banks.balance) - Number(amount);
      if (banks.balance < 0) {
        banks.balance = 0;
      }
    }
    await bankSchema.updateOne({ name: banks.name }, { $set: banks });
  } catch (e) {
    console.log("=========IN UPADTE BANK BALANCE ERROR=========", e);
  }
}

exports.getTransactions = async (req, resp) => {
  try {
    console.log("=========IN GET TRANSACTIONS =========");
    const { type } = req.body;
    let transactions = await transactionSchema.aggregate([
      {
        $lookup: {
          from: "bankschemas",
          localField: "bank",
          foreignField: "_id",
          as: "bank",
        },
      },
      {
        $unwind: "$bank",
      },
      {
        $lookup: {
          from: "familymemberschemas",
          localField: "transactionBy",
          foreignField: "_id",
          as: "transactionBy",
        },
      },
      {
        $unwind: "$transactionBy",
      },
      {
        $lookup: {
          from: "categoryschemas",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          amount: 1,
          type: 1,
          date: 1,
          isDirect: 1,
          bank: "$bank.name",
          category: "$category.icon",
          transactionBy: "$transactionBy.firstName",
        },
      },
    ]);
    switch (type) {
      case "1":
        //incomes
        transactions = transactions.filter((item) => item.type == type);
        break;
      case "2":
        //expenses
        transactions = transactions.filter((item) => item.type == type);
        break;
    }
    resp.status(200).json(transactions);
  } catch (e) {
    console.log("=========IN GET TRANSACTIONS ERROR=========", e);
    return resp.status(500).json({ message: e.message });
  }
};

exports.deleteTransaction = async (req, resp) => {
  try {
    console.log("=========IN TRANSACTIONS DELETE  =========");
    let { _id, amount, type, bank, isDirect } = req.body;
    transactionSchema
      .findByIdAndDelete(_id)
      .then((member) => {
        resp.status(200).json({ message: "Record deleted successfully !!" });
      })
      .catch((err) => {
        resp.status(500).json({ message: "Server Error" });
      });
    if (type == "1") {
      type = "2";
    } else {
      type = "1";
    }
    if (isDirect) {
      updateBankBalance(bank, amount, type);
    }
  } catch (e) {
    console.log("=========IN TRANSACTIONS DELETE ERROR=========", e);
    return resp.status(500).json({ message: e.message });
  }
};

exports.getDashboardData = async (req, resp) => {
  try {
    const banks = await bankSchema.find().sort({ creatdAt: -1 });
    const categories = await categorySchema.find().sort({ creatdAt: -1 });
    const transactions = await transactionSchema.aggregate([
      {
        $lookup: {
          from: "bankschemas",
          localField: "bank",
          foreignField: "_id",
          as: "bank",
        },
      },
      {
        $unwind: "$bank",
      },
      {
        $lookup: {
          from: "familymemberschemas",
          localField: "transactionBy",
          foreignField: "_id",
          as: "transactionBy",
        },
      },
      {
        $unwind: "$transactionBy",
      },
      {
        $lookup: {
          from: "categoryschemas",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          amount: 1,
          type: 1,
          date: 1,
          isDirect: 1,
          bank: "$bank.name",
          category: "$category.icon",
          categoryName: "$category.name",
          transactionBy: "$transactionBy.firstName",
        },
      },
    ]);
    const familyMembers = await familyMemberSchema
      .find()
      .sort({ creatdAt: -1 });
    let retObj = {
      banks: banks,
      categories: categories,
      familyMembers: familyMembers,
      transactions: transactions,
    };
    return resp.status(200).json(retObj);
  } catch (e) {
    return resp.status(500).json({ message: e.message });
  }
};
