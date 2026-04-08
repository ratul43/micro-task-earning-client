// MyTasks.jsx
import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../../apiService";
import { toast } from "react-toastify";

const AddedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const mainData = await apiFetch(`/tasks?email=edison@gmail.com`);
      setTasks(mainData);
    })();
  }, []);

  const deleteOperation = async (taskId) => {
    try {
      const response = await apiFetch(`/tasks?id=${taskId}`, { method: 'DELETE' });
      if (response) {
        setTasks(prev => prev.filter(task => task._id !== taskId));
        toast.success("Task Deleted Successfully");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task");
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Added Tasks</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4">Workers</th>
              <th className="py-2 px-4">Pay/Worker</th>
              <th className="py-2 px-4">Total Cost</th>
              <th className="py-2 px-4">Deadline</th>
              <th className="py-2 px-4">Submission</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-t hover:bg-gray-50 transition">
                <td className="py-2 px-4 font-medium">{task.task_title}</td>
                <td className="py-2 px-4 text-center">{task.required_workers}</td>
                <td className="py-2 px-4 text-center">{task.payable_amount}</td>
                <td className="py-2 px-4 text-center text-blue-600 font-semibold">
                  {task.total_payable_amount}
                </td>
                <td className="py-2 px-4 text-center">{task.completion_date}</td>
                <td className="py-2 px-4 text-center">{task.submission_info}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button 
                    className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 text-sm"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => deleteOperation(task._id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Update Task</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmitUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Task Title</label>
                <input
                  type="text"
                  name="task_title"
                  value={updateFormData.task_title}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Required Workers</label>
                <input
                  type="number"
                  name="required_workers"
                  value={updateFormData.required_workers}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Pay per Worker</label>
                <input
                  type="number"
                  name="payable_amount"
                  value={updateFormData.payable_amount}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Total Payable Amount</label>
                <input
                  type="number"
                  name="total_payable_amount"
                  value={updateFormData.total_payable_amount}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Completion Date</label>
                <input
                  type="date"
                  name="completion_date"
                  value={updateFormData.completion_date}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Submission Info</label>
                <input
                  type="text"
                  name="submission_info"
                  value={updateFormData.submission_info}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddedTasks;