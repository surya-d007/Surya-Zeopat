const Rule = require("../models/Rule");

// Helper function: Parse rule string into AST
// Helper function: Parse rule string into AST
const parseRuleStringToAST = (ruleString) => {
  const tokens = ruleString.match(/'[^']*'|\"[^\"]*\"|\w+|[><=()]|AND|OR/g); // Tokenize string
  console.log("Tokens:", tokens); // Log tokens to debug

  const buildAST = (tokens) => {
    let stack = [];

    const precedence = { AND: 2, OR: 1 }; // Operator precedence
    const output = [];
    const operators = [];

    const createNode = (operator, left, right) => ({
      type: "operator",
      value: operator,
      left: left,
      right: right,
    });

    // Updated operand handler
    const handleOperand = (operand) => {
      console.log("Processing operand:", operand); // Log operand being processed

      // Match operands
      const match = operand.match(/(\w+)\s*([><=]+)\s*('.*?'|\".*?\"|[0-9]+)/);

      if (match) {
        console.log("Matched operand:", match); // Log matched operand
        return {
          type: "operand",
          variable: match[1], // The variable (e.g., age)
          operator: match[2], // The operator (e.g., >, <, =)
          value: match[3].replace(/['"]/g, ""), // The value without quotes
        };
      }

      console.log("Failed to match operand:", operand); // Log failed match
      return null;
    };

    tokens.forEach((token) => {
      if (/^'.*'$|^".*"$/.test(token) || /^\w+$/.test(token)) {
        // Operand
        output.push(handleOperand(token));
      } else if (token === "(") {
        operators.push(token); // Left parenthesis
      } else if (token === ")") {
        // Right parenthesis, pop until matching left parenthesis
        while (operators.length && operators[operators.length - 1] !== "(") {
          const operator = operators.pop();
          const right = output.pop();
          const left = output.pop();
          output.push(createNode(operator, left, right));
        }
        operators.pop(); // Remove left parenthesis
      } else if (token === "AND" || token === "OR") {
        // Operator
        while (
          operators.length &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          const operator = operators.pop();
          const right = output.pop();
          const left = output.pop();
          output.push(createNode(operator, left, right));
        }
        operators.push(token);
      }
    });

    while (operators.length) {
      const operator = operators.pop();
      const right = output.pop();
      const left = output.pop();
      output.push(createNode(operator, left, right));
    }

    console.log("Generated AST:", JSON.stringify(output[0], null, 2)); // Log final AST
    return output[0]; // Final AST root node
  };

  return buildAST(tokens);
};
// Helper function: Evaluate AST against provided data
const evaluateAST = (ast, data) => {
  if (ast.type === "operator") {
    const leftEval = evaluateAST(ast.left, data);
    const rightEval = evaluateAST(ast.right, data);
    return ast.value === "AND" ? leftEval && rightEval : leftEval || rightEval;
  } else if (ast.type === "operand") {
    const condition = ast.value.replace(
      /\b(\w+)\b/g,
      (match) => `data.${match}`
    );
    return eval(condition); // WARNING: Be cautious with `eval` in production. Use better alternatives.
  }
};

// Create a new rule
// Create a new rule
const createRule = async (req, res) => {
  const { ruleId, ruleString } = req.body;

  if (!ruleId || !ruleString) {
    return res
      .status(400)
      .json({ message: "ruleId and ruleString are required" });
  }

  const ast = parseRuleStringToAST(ruleString); // Parse rule string into AST
  console.log("Generated AST:", JSON.stringify(ast, null, 2)); // Log the AST for debugging

  if (!ast) {
    return res
      .status(500)
      .json({ message: "Failed to parse ruleString into AST" });
  }

  try {
    const newRule = new Rule({ ruleId, ast });
    await newRule.save();
    res
      .status(201)
      .json({ message: "Rule created successfully", rule: newRule });
  } catch (error) {
    console.error("Error saving rule:", error);
    res.status(500).json({ message: "Error creating rule", error });
  }
};

// Combine multiple rules into one
const combineRules = async (req, res) => {
  const { ruleIds, combineWith } = req.body; // `combineWith` can be "AND" or "OR"

  if (!ruleIds || ruleIds.length < 2) {
    return res
      .status(400)
      .json({ message: "At least two ruleIds are required." });
  }

  try {
    const rules = await Rule.find({ ruleId: { $in: ruleIds } });

    if (rules.length !== ruleIds.length) {
      return res.status(404).json({ message: "Some rules not found" });
    }

    const combinedAST = {
      type: "operator",
      value: combineWith || "AND", // Default to AND
      left: rules[0].ast,
      right: rules[1].ast, // Combine first two rules as an example
    };

    res
      .status(200)
      .json({ message: "Rules combined successfully", combinedAST });
  } catch (error) {
    res.status(500).json({ message: "Error combining rules", error });
  }
};

// Evaluate a rule against user data
const evaluateRule = async (req, res) => {
  const { ruleId, data } = req.body;

  try {
    const rule = await Rule.findOne({ ruleId });
    if (!rule) return res.status(404).json({ message: "Rule not found" });

    const result = evaluateAST(rule.ast, data);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Error evaluating rule", error });
  }
};

module.exports = { createRule, combineRules, evaluateRule };
