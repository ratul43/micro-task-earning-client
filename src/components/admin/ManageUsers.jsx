import React from "react";

const ManageUsers = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Manage Users
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Photo</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Coins</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="border-t">
              <td className="px-4 py-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">John Doe</td>
              <td className="px-4 py-2 text-sm text-gray-700">john@example.com</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <select className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Admin</option>
                  <option>Buyer</option>
                  <option>Worker</option>
                </select>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">120</td>
              <td className="px-4 py-2 space-x-2">
                <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                  Remove
                </button>
              </td>
            </tr>

            {/* Another Example Row */}
            <tr className="border-t">
              <td className="px-4 py-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">Jane Smith</td>
              <td className="px-4 py-2 text-sm text-gray-700">jane@example.com</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <select className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Admin</option>
                  <option selected>Buyer</option>
                  <option>Worker</option>
                </select>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">300</td>
              <td className="px-4 py-2 space-x-2">
                <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
