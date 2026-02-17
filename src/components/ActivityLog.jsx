import React from 'react';
import { useTasks } from '../context/TaskContext';

const ActivityLog = ({ onClose }) => {
  const { logs } = useTasks();

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getLogIcon = (msg) => {
    if (msg.includes('created')) return '✨';
    if (msg.includes('moved')) return '🔥';
    if (msg.includes('deleted')) return '🗑️';
    if (msg.includes('edited')) return '✏️';
    if (msg.includes('reset')) return '🔄';
    return '📌';
  };

  return (
    <div className="alog">
      <div className="alog-header">
        <div className="alog-header-left">
          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>history</span>
          <h2>Recent Moves</h2>
        </div>
        {onClose && (
          <button className="alog-close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>

      <div className="alog-list">
        {logs.length === 0 ? (
          <p className="alog-empty">No activity yet. Go crush it! 🚀</p>
        ) : (
          logs.map(log => (
            <div key={log.id} className="alog-item">
              <div className="alog-icon">{getLogIcon(log.message)}</div>
              <div className="alog-body">
                <p className="alog-msg">{log.message}</p>
                <span className="alog-time">{formatTime(log.timestamp)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .alog { display: flex; flex-direction: column; height: 100%; }
        .alog-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 1.25rem;
        }
        .alog-header-left { display: flex; align-items: center; gap: 0.5rem; }
        .alog-header h2 {
          font-size: 1rem; font-weight: 700; margin: 0;
          background: linear-gradient(135deg, #f472b6, #a78bfa);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .alog-close {
          width: 1.75rem; height: 1.75rem; border-radius: 0.5rem;
          background: rgba(255,255,255,0.06); border: none;
          color: rgba(255,255,255,0.4); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .alog-close:hover { background: rgba(255,255,255,0.12); color: white; }
        .alog-close .material-symbols-outlined { font-size: 1rem; }
        .alog-list {
          flex: 1; overflow-y: auto;
          display: flex; flex-direction: column; gap: 0.25rem;
        }
        .alog-item {
          display: flex; gap: 0.75rem; padding: 0.75rem;
          border-radius: 0.75rem; transition: background 0.2s;
        }
        .alog-item:hover { background: rgba(255,255,255,0.04); }
        .alog-icon { font-size: 1rem; flex-shrink: 0; padding-top: 0.1rem; }
        .alog-body { display: flex; flex-direction: column; gap: 0.15rem; }
        .alog-msg {
          font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0;
          font-weight: 500; line-height: 1.3;
        }
        .alog-time {
          font-size: 0.7rem; color: rgba(255,255,255,0.3);
        }
        .alog-empty {
          text-align: center; padding: 2rem 0;
          color: rgba(255,255,255,0.3); font-size: 0.85rem;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default ActivityLog;
