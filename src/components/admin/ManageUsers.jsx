import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "../../apiService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiFetch("/users");
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Update user role
  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await apiFetch(`/users/${userId}/role`, {
        method: "PUT",
        body: JSON.stringify({ role: newRole }),
      });

      if (response) {
        // Update local state
        setUsers(users.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        ));
        toast.success(`User role updated to ${newRole}!`);
      }
    } catch (error) {
      toast.error("Failed to update user role");
      console.error("Error updating role:", error);
    }
  };

  // Remove user
  const removeUser = async (userId) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    
    try {
      const response = await apiFetch(`/users/${userId}`, {
        method: "DELETE",
      });

      if (response) {
        // Remove from local state
        setUsers(users.filter(user => user._id !== userId));
        toast.success("User removed successfully!");
      }
    } catch (error) {
      toast.error("Failed to remove user");
      console.error("Error removing user:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Manage Users
      </h2>

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
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={user.photo || "https://via.placeholder.com/40"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="buyer">Buyer</option>
                    <option value="worker">Worker</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.balance || 0}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => removeUser(user._id)}
                    className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;