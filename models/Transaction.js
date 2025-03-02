// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"], // Type of transaction
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;