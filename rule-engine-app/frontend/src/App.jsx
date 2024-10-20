import React from "react";
import CreateRule from "./components/CreateRule";
import CombineRules from "./components/CombineRules";
import EvaluateRule from "./components/EvaluateRule";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rule Engine Application</h1>
      <CreateRule />
      <CombineRules />
      <EvaluateRule />
    </div>
  );
};

export default App;
