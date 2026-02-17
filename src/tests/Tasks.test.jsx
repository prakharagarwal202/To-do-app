import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskProvider, useTasks } from '../context/TaskContext';
import React from 'react';

// Helper component to test hook logic
const TestComponent = () => {
  const { tasks, addTask, deleteTask, setSearchQuery } = useTasks();
  return (
    <div>
      <div data-testid="task-count">{tasks.length}</div>
      <button onClick={() => addTask({ title: 'Test Task', priority: 'High' })}>Add</button>
      <button onClick={() => deleteTask(tasks[0]?.id)}>Delete</button>
      <input 
        data-testid="search" 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <ul>
        {tasks.map(t => <li key={t.id}>{t.title}</li>)}
      </ul>
    </div>
  );
};

describe('Task Logic', () => {
  it('adds a task and increments count', async () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('task-count')).toHaveTextContent('1');
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('filters tasks by search', async () => {
    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    fireEvent.click(screen.getByText('Add'));
    const searchInput = screen.getByTestId('search');
    
    fireEvent.change(searchInput, { target: { value: 'nomatch' } });
    expect(screen.getByTestId('task-count')).toHaveTextContent('0');

    fireEvent.change(searchInput, { target: { value: 'Test' } });
    expect(screen.getByTestId('task-count')).toHaveTextContent('1');
  });

  it('deletes a task', async () => {
     render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('task-count')).toHaveTextContent('1');
    
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByTestId('task-count')).toHaveTextContent('0');
  });
});
