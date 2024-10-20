import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/rules";

export const createRule = async (ruleData) => {
  return await axios.post(`${API_URL}/create`, ruleData);
};

export const combineRules = async (ruleIds, combineWith) => {
  return await axios.post(`${API_URL}/combine`, { ruleIds, combineWith });
};

export const evaluateRule = async (ruleId, data) => {
  return await axios.post(`${API_URL}/evaluate`, { ruleId, data });
};
