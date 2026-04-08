// MyTasks.jsx
import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../../apiService";
import { toast } from "react-toastify";

const AddedTasks = () => {
  const [tasks, setTasks] = useState([]);
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
              <th className="py-2 px-4">Submission</th>
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
                  {task.submission_info}
                </td>

                {/* Actions */}
                <td className="py-2 px-4 text-center space-x-2">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 text-sm">
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
    </div>
  );
};

export default AddedTasks;
