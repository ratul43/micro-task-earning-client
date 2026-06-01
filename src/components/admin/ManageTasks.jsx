import React, { useEffect, useState } from "react";
import { apiFetch } from "../../apiService";
import { toast } from "react-toastify";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/allTasks");
      setTasks(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this task permanently?");
    if (!confirmed) return;

    try {
      await apiFetch(`/tasks?id=${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => String(t._id) !== String(id)));
      toast.success("Task deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Tasks</h2>

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
                Buyer Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Deadline
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-600">
                  Loading tasks...
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-600">
                  No tasks found.
                </td>
              </tr>
            ) : (
              tasks.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{item.task_title}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.task_detail}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.buyer_name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.completion_date ? new Date(item.completion_date).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.buyer_email}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleDelete(item._id)} className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700">
                      Delete Task
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTasks;
