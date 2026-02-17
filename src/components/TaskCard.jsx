import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  const priorityConfig = {
    High:   { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.3)' },
    Medium: { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
    Low:    { bg: 'rgba(52,211,153,0.15)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
  };

  const p = priorityConfig[task.priority] || priorityConfig.Medium;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="tcard"
      {...attributes}
      {...listeners}
    >
      <div className="tcard-top">
        <span className="tcard-priority" style={{ background: p.bg, color: p.color, borderColor: p.border }}>
          {task.priority}
        </span>
        <div className="tcard-actions" onClick={e => e.stopPropagation()}>
          <button onClick={() => onEdit(task)} className="tcard-action-btn">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button onClick={() => onDelete(task.id)} className="tcard-action-btn tcard-delete">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      <h3 className="tcard-title">{task.title}</h3>
      {task.description && <p className="tcard-desc">{task.description}</p>}

      <div className="tcard-bottom">
        {formatDate(task.dueDate) && (
          <div className="tcard-date">
            <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>calendar_today</span>
            {formatDate(task.dueDate)}
          </div>
        )}
        {task.tags?.length > 0 && (
          <div className="tcard-tags">
            {task.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="tcard-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .tcard {
          padding: 1rem; margin-bottom: 0.75rem;
          border-radius: 1rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          cursor: grab; touch-action: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tcard:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(139,92,246,0.25);
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px rgba(139,92,246,0.15);
        }
        .tcard:active { cursor: grabbing; }
        .tcard-top {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 0.6rem;
        }
        .tcard-priority {
          font-size: 0.65rem; font-weight: 700;
          padding: 0.2rem 0.6rem; border-radius: 9999px;
          text-transform: uppercase; letter-spacing: 0.05em;
          border: 1px solid;
        }
        .tcard-actions { display: flex; gap: 0.25rem; opacity: 0; transition: opacity 0.2s; }
        .tcard:hover .tcard-actions { opacity: 1; }
        .tcard-action-btn {
          width: 1.5rem; height: 1.5rem; border-radius: 0.4rem;
          background: rgba(255,255,255,0.06); border: none;
          color: rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .tcard-action-btn .material-symbols-outlined { font-size: 0.85rem; }
        .tcard-action-btn:hover { background: rgba(255,255,255,0.12); color: white; }
        .tcard-delete:hover { background: rgba(239,68,68,0.2); color: #f87171; }

        .tcard-title {
          font-size: 0.95rem; font-weight: 700; color: white;
          margin: 0 0 0.3rem; line-height: 1.3;
        }
        .tcard-desc {
          font-size: 0.8rem; color: rgba(255,255,255,0.4);
          margin: 0 0 0.75rem; line-height: 1.4;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .tcard-bottom {
          display: flex; justify-content: space-between;
          align-items: center; gap: 0.5rem;
          padding-top: 0.6rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 0.7rem; color: rgba(255,255,255,0.35);
        }
        .tcard-date {
          display: flex; align-items: center; gap: 0.3rem;
        }
        .tcard-tags { display: flex; gap: 0.3rem; }
        .tcard-tag {
          padding: 0.1rem 0.5rem; border-radius: 9999px;
          background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15));
          border: 1px solid rgba(139,92,246,0.2);
          font-size: 0.65rem; color: rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  );
};

export default TaskCard;
