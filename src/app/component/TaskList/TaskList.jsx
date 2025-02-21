import React, { useState } from 'react';
import { CheckCircle, Trash2 } from 'lucide-react';

const TaskList = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Buy Groceries', description: 'Milk, Bread, Butter', completed: false },
        { id: 2, title: 'Complete Homework', description: 'Math and Science homework', completed: true },
        { id: 3, title: 'Go to the Gym', description: 'Workout for 1 hour', completed: false }
    ]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    const handleAddTask = () => {
        if (newTask.title && newTask.description) {
            const newTaskObject = {
                id: tasks.length + 1,
                title: newTask.title,
                description: newTask.description,
                completed: false,
            };
            setTasks([...tasks, newTaskObject]);
            setNewTask({ title: '', description: '' });
        }
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white rounded-xl shadow-lg space-y-4">
            <h1 className="text-3xl font-semibold text-center text-indigo-600">To-Do List</h1>
            
            <div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task.id} className={`flex justify-between items-center p-3 rounded-lg shadow-md ${task.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                                className="w-5 h-5 text-indigo-600"
                            />
                            <span className={`text-lg font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                                {task.title}
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => deleteTask(task.id)} className="text-red-600 hover:text-red-800">
                                <Trash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col space-y-4 mt-4">
                <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Task Title"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="text"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Task Description"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={handleAddTask}
                    className="p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default TaskList;