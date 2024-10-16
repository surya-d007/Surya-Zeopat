const express = require("express");
const router = express.Router();
const Rule = require("../models/Rule");

// Create a new rule
router.post("/create", async (req, res) => {
  const { ruleId, ast } = req.body;
  try {
    const newRule = new Rule({ ruleId, ast });
    await newRule.save();
    res
      .status(201)
      .json({ message: "Rule created successfully", rule: newRule });
  } catch (error) {
    res.status(500).json({ message: "Error creating rule", error });
  }
});

// Evaluate rule against user data
const evaluateRule = (ast, data) => {
  if (ast.type === "operator") {
    const leftEval = evaluateRule(ast.left, data);
    const rightEval = evaluateRule(ast.right, data);
    return ast.value === "AND" ? leftEval && rightEval : leftEval || rightEval;
  } else if (ast.type === "operand") {
    // Simple condition evaluation (e.g., "age > 30")
    const condition = ast.value.replace(
      /\b(\w+)\b/g,
      (match) => `data.${match}`
    );
    return eval(condition);
  }
};

router.post("/evaluate", async (req, res) => {
  const { ruleId, data } = req.body;
  try {
    const rule = await Rule.findOne({ ruleId });
    if (!rule) return res.status(404).json({ message: "Rule not found" });

    const result = evaluateRule(rule.ast, data);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Error evaluating rule", error });
  }
});

module.exports = router;
