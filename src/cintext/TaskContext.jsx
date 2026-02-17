import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const TaskContext = createContext(null);

const DEFAULT_BOARD = {
  tasks: [],
  logs: []
};

export const TaskProvider = ({ children }) => {
  const [board, setBoard] = useState(() => loadFromStorage('task_board', DEFAULT_BOARD));
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate' | 'createdAt'

  useEffect(() => {
    saveToStorage('task_board', board);
  }, [board]);

  const addLog = (message) => {
    const newLog = {
      id: crypto.randomUUID(),
      message,
      timestamp: new Date().toISOString()
    };
    setBoard(prev => ({
      ...prev,
      logs: [newLog, ...prev.logs].slice(0, 10) // Keep last 10
    }));
  };

  const addTask = (taskData) => {
    const newTask = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'Todo',
      ...taskData
    };
    setBoard(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
    addLog(`Task '${newTask.title}' created`);
  };

  const updateTask = (id, updates) => {
    setBoard(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
        if (t.id === id) {
          const updated = { ...t, ...updates };
          if (updates.status && updates.status !== t.status) {
            addLog(`Task '${t.title}' moved to ${updates.status}`);
          } else {
            addLog(`Task '${t.title}' edited`);
          }
          return updated;
        }
        return t;
      })
    }));
  };

  const deleteTask = (id) => {
    const taskToDelete = board.tasks.find(t => t.id === id);
    setBoard(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id)
    }));
    if (taskToDelete) {
      addLog(`Task '${taskToDelete.title}' deleted`);
    }
  };

  const resetBoard = () => {
    setBoard(DEFAULT_BOARD);
    addLog('Board reset');
  };

  // Filtered and Sorted Tasks
  const filteredTasks = useMemo(() => {
    let result = board.tasks.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filterPriority === 'All' || t.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });

    if (sortBy === 'dueDate') {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [board.tasks, searchQuery, filterPriority, sortBy]);

  const value = {
    tasks: filteredTasks,
    allTasks: board.tasks,
    logs: board.logs,
    addTask,
    updateTask,
    deleteTask,
    resetBoard,
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};
