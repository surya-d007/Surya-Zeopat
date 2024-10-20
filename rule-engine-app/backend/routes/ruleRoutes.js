const express = require("express");
const router = express.Router();
const {
  createRule,
  combineRules,
  evaluateRule,
} = require("../controllers/ruleController");

// Create a new rule
router.post("/create", createRule);

// Combine multiple rules
router.post("/combine", combineRules);

// Evaluate a rule
router.post("/evaluate", evaluateRule);

module.exports = router;
