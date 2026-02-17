import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const TaskColumn = ({ id, title, emoji, gradient, tasks, onAddTask, onEditTask, onDeleteTask }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="col-wrapper" ref={setNodeRef}>
      <div className="col-header">
        <div className="col-header-left">
          <span className="col-emoji">{emoji}</span>
          <h2 className="col-title" style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {title}
          </h2>
          <span className="col-count">{tasks.length}</span>
        </div>
        <button className="col-add-btn" onClick={() => onAddTask(id)} title="Add task">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      <div className="col-content">
        <SortableContext 
          id={id}
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={onEditTask} 
              onDelete={onDeleteTask}
            />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="col-empty">
            <p>No tasks here yet ✨</p>
            <button className="col-empty-add" onClick={() => onAddTask(id)}>
              <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>add</span>
              Add a task
            </button>
          </div>
        )}
      </div>

      <style>{`
        .col-wrapper {
          flex: 1; min-width: 280px;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1.25rem;
          display: flex; flex-direction: column;
          max-height: calc(100vh - 120px);
          transition: border-color 0.3s;
        }
        .col-wrapper:hover { border-color: rgba(255,255,255,0.12); }
        .col-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 1rem 0.75rem;
        }
        .col-header-left { display: flex; align-items: center; gap: 0.5rem; }
        .col-emoji { font-size: 1.1rem; }
        .col-title {
          font-size: 0.8rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.1em;
          margin: 0;
        }
        .col-count {
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          padding: 0.1rem 0.5rem; border-radius: 9999px;
          font-size: 0.7rem; font-weight: 700;
        }
        .col-add-btn {
          width: 1.75rem; height: 1.75rem; border-radius: 0.5rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .col-add-btn .material-symbols-outlined { font-size: 1rem; }
        .col-add-btn:hover {
          background: rgba(139,92,246,0.2);
          border-color: rgba(139,92,246,0.4);
          color: white;
        }
        .col-content {
          flex: 1; overflow-y: auto; padding: 0.5rem 0.75rem 0.75rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        .col-content::-webkit-scrollbar { width: 4px; }
        .col-content::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1); border-radius: 10px;
        }
        .col-empty {
          text-align: center; padding: 2rem 1rem;
          border: 1.5px dashed rgba(255,255,255,0.1);
          border-radius: 1rem; color: rgba(255,255,255,0.3);
          font-size: 0.85rem;
        }
        .col-empty p { margin: 0 0 0.75rem; }
        .col-empty-add {
          padding: 0.4rem 1rem; border-radius: 9999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem; cursor: pointer;
          display: inline-flex; align-items: center; gap: 0.3rem;
          font-family: 'Space Grotesk', sans-serif;
          transition: all 0.2s;
        }
        .col-empty-add:hover { background: rgba(139,92,246,0.15); color: white; }
      `}</style>
    </div>
  );
};

export default TaskColumn;
