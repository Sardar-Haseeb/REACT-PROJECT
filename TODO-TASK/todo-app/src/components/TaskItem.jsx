import React, { useState } from 'react';

const TaskItem = ({ task, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task.id, { ...task, name: newName });
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-grow p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      ) : (
        <span className="flex-grow text-gray-700">{task.name}</span>
      )}
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className={`p-2 rounded-lg font-semibold text-white transition duration-300 ${
            isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
