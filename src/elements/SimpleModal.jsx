import React from "react";

const SimpleModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

  return (
    <div className="fixed bg-amber-400 inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Modal Form</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          
          <input
            type="text"
            placeholder="Enter something"
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            type="email"
            placeholder="Enter email"
            className="w-full border px-3 py-2 rounded-md"
          />

          <textarea
            placeholder="Enter details"
            className="w-full border px-3 py-2 rounded-md"
          />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleModal;