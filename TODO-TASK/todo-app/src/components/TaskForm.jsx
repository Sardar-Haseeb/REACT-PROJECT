import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask({ id: Date.now(), name: taskName });
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-6">
      <input
        type="text"
        className="flex-grow p-3 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        placeholder="Add a new task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button
        type="submit"
        className="bg-pink-500 text-white font-semibold p-3 rounded-r-lg hover:bg-pink-600 transition duration-300"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
