const mongoose = require("mongoose");

// AST Node Schema
const nodeSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "operator" or "operand"
  left: { type: mongoose.Schema.Types.Mixed }, // Left child (node or null)
  right: { type: mongoose.Schema.Types.Mixed }, // Right child (node or null)
  value: { type: String }, // Operand value or operator (e.g., 'age > 30' or 'AND')
});

// Rule Schema
const ruleSchema = new mongoose.Schema({
  ruleId: { type: String, required: true, unique: true }, // Unique ID for the rule
  ast: { type: nodeSchema, required: true }, // Abstract Syntax Tree (AST)
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the rule was created
});

// Export Rule model
const Rule = mongoose.model("Rule", ruleSchema);
module.exports = Rule;
