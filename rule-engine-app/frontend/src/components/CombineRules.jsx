import React, { useState } from "react";
import { combineRules } from "../api/ruleApi";

const CombineRules = () => {
  const [ruleIds, setRuleIds] = useState("");
  const [combineWith, setCombineWith] = useState("AND");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ids = ruleIds.split(",").map((id) => id.trim());
    try {
      const response = await combineRules(ids, combineWith);
      alert(response.data.message);
    } catch (error) {
      console.error("Error combining rules:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-2">Combine Rules</h2>
      <input
        type="text"
        placeholder="Rule IDs (comma separated)"
        value={ruleIds}
        onChange={(e) => setRuleIds(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <select
        value={combineWith}
        onChange={(e) => setCombineWith(e.target.value)}
        className="border p-2 mb-2 w-full"
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Combine Rules
      </button>
    </form>
  );
};

export default CombineRules;
