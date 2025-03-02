// controllers/transactionController.js
const Transaction = require("../models/transaction");
const User = require("../models/user");

// @desc    Add a new transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
  const { userId, type, amount, description } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new transaction
    const transaction = await Transaction.create({
      user: userId,
      type,
      amount,
      description,
    });

    // Update the user's account balance
    if (type === "credit") {
      user.accountBalance += amount;
    } else if (type === "debit") {
      user.accountBalance -= amount;
    }

    // Save the updated user
    await user.save();

    res.status(201).json({
      _id: transaction._id,
      user: transaction.user,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      accountBalance: user.accountBalance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all transactions for a user
// @route   GET /api/transactions/:userId
// @access  Private
const getTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find all transactions for the user
    const transactions = await Transaction.find({ user: userId });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addTransaction, getTransactions };