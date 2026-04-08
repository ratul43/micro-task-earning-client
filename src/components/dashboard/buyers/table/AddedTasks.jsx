// MyTasks.jsx
import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../../apiService";
import { toast } from "react-toastify";

const AddedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({
    task_title: "",
    required_workers: "",
    payable_amount: "",
    completion_date: "",
    submission_info: ""
  });

  useEffect(() => {
    (async () => {
      const mainData = await apiFetch(`/tasks`);
      setTasks(mainData);
    })();
  }, []);

  console.log(tasks);

  const deleteOperation = async (taskId) => {
    try{
      const response = await apiFetch(`/tasks?id=${taskId}`)
      if(response){
        setTasks(prev => prev.filter(task => task._id !== taskId))
        toast.success("Task Deleted Successfully")
      }
    }
    catch(err){
        console.error("Error deleting task:", err);
    }
  }

  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setFormData({
      task_title: task.task_title,
      required_workers: task.required_workers,
      payable_amount: task.payable_amount,
      completion_date: task.completion_date,
      submission_info: task.submission_info
    });
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFetch(`/tasks?id=${selectedTask._id}`, {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      if(response) {
        setTasks(prev => prev.map(task => 
          task._id === selectedTask._id ? { ...task, ...formData } : task
        ));
        toast.success("Task Updated Successfully");
        closeModal();
      }
    } catch(err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task");
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">My Added Tasks</h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          {/* Head */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4">Workers</th>
              <th className="py-2 px-4">Pay/Worker</th>
              <th className="py-2 px-4">Total Cost</th>
              <th className="py-2 px-4">Deadline</th>
              <th className="py-2 px-4">Task Details</th>
              <th className="py-2 px-4">Submission Details</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-2 px-4 font-medium">{task.task_title}</td>
                <td className="py-2 px-4 text-center">
                  {task.required_workers}
                </td>
                <td className="py-2 px-4 text-center">{task.payable_amount}</td>
                <td className="py-2 px-4 text-center text-blue-600 font-semibold">
                  {task.total_payable_amount}
                </td>
                <td className="py-2 px-4 text-center">
                  {task.completion_date}
                </td>
                <td className="py-2 px-4 text-center">
                  {task.task_detail}
                </td>
                <td className="py-2 px-4 text-center">
                  {task.submission_info}
                </td>

                {/* Actions */}
                <td className="py-2 px-4 text-center space-x-2">
                  <button 
                    onClick={() => openUpdateModal(task)} 
                    className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 text-sm"
                  >
                    Update
                  </button>

                  <button onClick={() => deleteOperation(task._id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm">
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
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Update Task</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  name="task_title"
                  value={formData.task_title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Workers</label>
                <input
                  type="number"
                  name="required_workers"
                  value={formData.required_workers}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pay per Worker</label>
                <input
                  type="number"
                  name="payable_amount"
                  value={formData.payable_amount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  name="completion_date"
                  value={formData.completion_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Submission Info</label>
                <textarea
                  name="submission_info"
                  value={formData.submission_info}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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