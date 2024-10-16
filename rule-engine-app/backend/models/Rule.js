const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "operator" or "operand"
  left: { type: mongoose.Schema.Types.Mixed }, // Reference to left Node
  right: { type: mongoose.Schema.Types.Mixed }, // Reference to right Node
  value: { type: String }, // Optional value for operand nodes
});

const ruleSchema = new mongoose.Schema({
  ruleId: { type: String, required: true },
  ast: { type: nodeSchema, required: true },
});

const Rule = mongoose.model("Rule", ruleSchema);
module.exports = Rule;
