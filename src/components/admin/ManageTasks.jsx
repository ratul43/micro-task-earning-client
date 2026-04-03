import React from "react";

const ManageTasks = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Manage Tasks
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Task Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Assigned To
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Deadline
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="border-t">
              <td className="px-4 py-2 text-sm text-gray-700">Design Homepage</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                Create responsive homepage layout
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">John Doe</td>
              <td className="px-4 py-2 text-sm text-gray-700">05 Apr 2026</td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded">
                  In Progress
                </span>
              </td>
              <td className="px-4 py-2">
                <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                  Delete Task
                </button>
              </td>
            </tr>

            {/* Another Example Row */}
            <tr className="border-t">
              <td className="px-4 py-2 text-sm text-gray-700">Fix Login Bug</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                Resolve authentication issue
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">Jane Smith</td>
              <td className="px-4 py-2 text-sm text-gray-700">04 Apr 2026</td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                  Completed
                </span>
              </td>
              <td className="px-4 py-2">
                <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                  Delete Task
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTasks;
