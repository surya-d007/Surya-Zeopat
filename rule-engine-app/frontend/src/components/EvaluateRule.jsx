import React, { useState } from "react";
import { evaluateRule } from "../api/ruleApi";

const EvaluateRule = () => {
  const [ruleId, setRuleId] = useState("");
  const [data, setData] = useState("{}");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(data);
      const response = await evaluateRule(ruleId, parsedData);
      setResult(response.data.result ? "Eligible" : "Not Eligible");
    } catch (error) {
      console.error("Error evaluating rule:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-2">Evaluate Rule</h2>
      <input
        type="text"
        placeholder="Rule ID"
        value={ruleId}
        onChange={(e) => setRuleId(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <textarea
        placeholder="User Data (JSON format)"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Evaluate Rule
      </button>
      {result && <div className="mt-2">Result: {result}</div>}
    </form>
  );
};

export default EvaluateRule;
