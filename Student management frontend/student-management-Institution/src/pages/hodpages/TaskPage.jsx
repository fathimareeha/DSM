import { useState } from 'react';
import { ClipboardList, Plus, Edit, Trash } from 'lucide-react';

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Prepare Annual Report', dueDate: '2025-09-15', status: 'Pending' },
    { id: 2, title: 'Schedule Department Meeting', dueDate: '2025-09-20', status: 'Completed' },
    // Add more tasks as needed
  ]);

  const handleAddTask = () => {
    // Logic to add a new task
  };

  const handleEditTask = (id) => {
    // Logic to edit a task
  };

  const handleDeleteTask = (id) => {
    // Logic to delete a task
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Tasks & Notices</h2>
        <button
          onClick={handleAddTask}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">{task.dueDate}</td>
                <td className="px-4 py-2">{task.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
