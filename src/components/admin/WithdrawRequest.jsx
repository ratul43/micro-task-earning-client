import React from "react";

const WithdrawRequest = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Withdraw Requests
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                User
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Method
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="border-t">
              <td className="px-4 py-2 text-sm text-gray-700">John Doe</td>
              <td className="px-4 py-2 text-sm text-gray-700">$250</td>
              <td className="px-4 py-2 text-sm text-gray-700">Bank Transfer</td>
              <td className="px-4 py-2 text-sm text-gray-700">03 Apr 2026</td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded">
                  Pending
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700">
                  Approve
                </button>
                <button className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                  Reject
                </button>
              </td>
            </tr>

            {/* Another Example Row */}
            <tr className="border-t">
              <td className="px-4 py-2 text-sm text-gray-700">Jane Smith</td>
              <td className="px-4 py-2 text-sm text-gray-700">$120</td>
              <td className="px-4 py-2 text-sm text-gray-700">PayPal</td>
              <td className="px-4 py-2 text-sm text-gray-700">02 Apr 2026</td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                  Approved
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button className="px-3 py-1 text-sm text-white bg-gray-400 rounded cursor-not-allowed">
                  Approve
                </button>
                <button className="px-3 py-1 text-sm text-white bg-gray-400 rounded cursor-not-allowed">
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawRequest;
