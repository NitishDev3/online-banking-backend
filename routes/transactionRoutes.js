// routes/transactionRoutes.js
const express = require("express");
const { addTransaction, getTransactions } = require("../controllers/transactionController");

const router = express.Router();

// Add a new transaction
router.post("/", addTransaction);

// Get all transactions for a user
router.get("/:userId", getTransactions);

module.exports = router;