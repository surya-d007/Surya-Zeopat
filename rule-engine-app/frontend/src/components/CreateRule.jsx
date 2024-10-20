import React, { useState } from "react";
import { createRule } from "../api/ruleApi";

const CreateRule = () => {
  const [ruleId, setRuleId] = useState("");
  const [ruleString, setRuleString] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRule({ ruleId, ruleString });
      alert(response.data.message);
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-2">Create Rule</h2>
      <input
        type="text"
        placeholder="Rule ID"
        value={ruleId}
        onChange={(e) => setRuleId(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <textarea
        placeholder="Rule String"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Create Rule
      </button>
    </form>
  );
};

export default CreateRule;
