import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Search, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Filter,
  Clock,
  Tag,
  ChevronDown,
  Star,
  AlertCircle
} from 'lucide-react';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Buy Groceries', 
      description: 'Milk, Bread, Butter', 
      completed: false,
      category: 'Shopping',
      priority: 'medium',
      dueDate: '2024-02-22',
      isStarred: false
    },
    { 
      id: 2, 
      title: 'Complete Homework', 
      description: 'Math and Science homework', 
      completed: true,
      category: 'Study',
      priority: 'high',
      dueDate: '2024-02-21',
      isStarred: true
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: '',
  });

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [...new Set(tasks.map(task => task.category))].filter(Boolean);
  
  const priorities = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const handleAddTask = () => {
    if (newTask.title) {
      const newTaskObject = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
        category: newTask.category,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        isStarred: false,
        createdAt: new Date()
      };
      setTasks([newTaskObject, ...tasks]);
      setNewTask({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        dueDate: ''
      });
      setIsAddingTask(false);
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleTaskStar = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isStarred: !task.isStarred } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' ? true : 
                          filterStatus === 'completed' ? task.completed : !task.completed;
      const matchesCategory = filterCategory === 'all' ? true : task.category === filterCategory;
      const matchesPriority = filterPriority === 'all' ? true : task.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
      if (a.isStarred !== b.isStarred) return b.isStarred ? 1 : -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return 'text-gray-500';
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-red-500';
    if (diffDays === 0) return 'text-orange-500';
    if (diffDays <= 2) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
        <div className="flex items-center space-x-2">
          <div className="bg-blue-100 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
            {tasks.filter(t => !t.completed).length} tasks remaining
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter size={18} />
            <span>Filters</span>
            <ChevronDown size={18} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        )}
      </div>

      {/* Add Task Button/Form */}
      {!isAddingTask ? (
        <button
          onClick={() => setIsAddingTask(true)}
          className="w-full px-4 py-3 bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Add New Task</span>
        </button>
      ) : (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Task title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Description (optional)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              placeholder="Category"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsAddingTask(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTask}
              disabled={!newTask.title}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`group relative flex items-start space-x-4 p-4 rounded-lg border transition-all duration-200 ${
              task.completed ? 'bg-gray-50' : 'hover:border-blue-200 hover:shadow-sm'
            }`}
          >
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {task.completed && <Check size={14} className="text-white" />}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {task.title}
                </h3>
                <button
                  onClick={() => toggleTaskStar(task.id)}
                  className={`${task.isStarred ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
                >
                  <Star size={16} fill={task.isStarred ? "currentColor" : "none"} />
                </button>
              </div>

              {task.description && (
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
              )}

              <div className="flex items-center space-x-3 mt-2">
                {task.category && (
                  <span className="flex items-center space-x-1 text-sm text-gray-600">
                    <Tag size={14} />
                    <span>{task.category}</span>
                  </span>
                )}

                {task.dueDate && (
                  <span className={`flex items-center space-x-1 text-sm ${getDueDateColor(task.dueDate)}`}>
                    <Calendar size={14} />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </span>
                )}

                <span className={`px-2 py-1 rounded-full text-xs ${priorities[task.priority]}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="mx-auto mb-2" size={24} />
            <p>No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;