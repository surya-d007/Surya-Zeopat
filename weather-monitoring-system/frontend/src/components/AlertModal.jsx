import React from "react";

const AlertModal = ({ alert, setAlert }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-semibold">Alert</h2>
        <p>{alert}</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setAlert(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
