import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPriority(initialData.priority || 'Medium');
      setDueDate(initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
      setTags(initialData.tags?.join(', ') || '');
    } else {
      setTitle(''); setDescription(''); setPriority('Medium');
      setDueDate(''); setTags('');
    }
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required!';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title, description, priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="tf-overlay" onClick={onClose}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="tf-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="tf-gradient-line" />
            <div className="tf-header">
              <h2>{initialData ? 'Edit Task' : 'New Task'}</h2>
              <button className="tf-close" onClick={onClose}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="tf-form">
              <div className="tf-field">
                <label>Title</label>
                <input 
                  type="text" 
                  placeholder="What's the mission?" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={errors.title ? 'tf-input-error' : ''}
                  autoFocus
                />
                {errors.title && <span className="tf-error">{errors.title}</span>}
              </div>

              <div className="tf-field">
                <label>Description</label>
                <textarea 
                  placeholder="Details of the grind..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="tf-row">
                <div className="tf-field tf-half">
                  <label>Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="tf-field tf-half">
                  <label>Due Date</label>
                  <input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="tf-field">
                <label>Tags (comma separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Work, Urgent, Personal" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="tf-actions">
                <button type="button" className="tf-cancel" onClick={onClose}>Cancel</button>
                <button type="submit" className="tf-submit">
                  {initialData ? 'Update Task' : 'Make it Iconic'} ✨
                </button>
              </div>
            </form>
          </motion.div>

          <style>{`
            .tf-overlay {
              position: fixed; inset: 0; z-index: 1000;
              background: rgba(0,0,0,0.5);
              backdrop-filter: blur(8px);
              display: flex; align-items: center; justify-content: center;
              padding: 1rem;
            }
            .tf-modal {
              width: 100%; max-width: 460px;
              background: rgba(15,15,30,0.95);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 1.25rem;
              overflow: hidden;
              box-shadow: 0 25px 60px rgba(0,0,0,0.6);
            }
            .tf-gradient-line {
              height: 3px;
              background: linear-gradient(90deg, #8b5cf6, #ec4899, #60a5fa);
            }
            .tf-header {
              display: flex; justify-content: space-between; align-items: center;
              padding: 1.25rem 1.5rem 0;
            }
            .tf-header h2 {
              font-size: 1.25rem; font-weight: 700; margin: 0;
              background: linear-gradient(135deg, #f472b6, #a78bfa);
              -webkit-background-clip: text; background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .tf-close {
              width: 2rem; height: 2rem; border-radius: 0.5rem;
              background: rgba(255,255,255,0.06); border: none;
              color: rgba(255,255,255,0.4); cursor: pointer;
              display: flex; align-items: center; justify-content: center;
              transition: all 0.2s;
            }
            .tf-close:hover { background: rgba(239,68,68,0.2); color: #f87171; }
            .tf-close .material-symbols-outlined { font-size: 1.1rem; }

            .tf-form {
              padding: 1.25rem 1.5rem 1.5rem;
              display: flex; flex-direction: column; gap: 1rem;
            }
            .tf-field { display: flex; flex-direction: column; gap: 0.35rem; }
            .tf-field label {
              font-size: 0.7rem; font-weight: 700;
              text-transform: uppercase; letter-spacing: 0.08em;
              color: rgba(255,255,255,0.5);
            }
            .tf-field input, .tf-field textarea, .tf-field select {
              width: 100%; padding: 0.65rem 0.875rem;
              border-radius: 0.6rem;
              border: 1px solid rgba(255,255,255,0.1);
              background: rgba(255,255,255,0.05);
              color: white; font-size: 0.9rem;
              font-family: 'Space Grotesk', sans-serif;
              outline: none; transition: all 0.3s;
              resize: none;
            }
            .tf-field input::placeholder, .tf-field textarea::placeholder {
              color: rgba(255,255,255,0.25);
            }
            .tf-field input:focus, .tf-field textarea:focus, .tf-field select:focus {
              border-color: rgba(139,92,246,0.5);
              background: rgba(255,255,255,0.08);
              box-shadow: 0 0 0 3px rgba(139,92,246,0.1);
            }
            .tf-field select option { background: #1a1a2e; color: white; }
            .tf-input-error { border-color: rgba(239,68,68,0.5) !important; }
            .tf-error { font-size: 0.75rem; color: #f87171; }

            .tf-row { display: flex; gap: 1rem; }
            .tf-half { flex: 1; }

            .tf-actions { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
            .tf-cancel {
              flex: 1; padding: 0.75rem; border-radius: 0.6rem;
              background: rgba(255,255,255,0.06);
              border: 1px solid rgba(255,255,255,0.1);
              color: rgba(255,255,255,0.5); font-weight: 600;
              cursor: pointer; font-family: 'Space Grotesk', sans-serif;
              transition: all 0.2s; font-size: 0.9rem;
            }
            .tf-cancel:hover { background: rgba(255,255,255,0.1); color: white; }
            .tf-submit {
              flex: 2; padding: 0.75rem; border-radius: 0.6rem;
              background: linear-gradient(135deg, #8b5cf6, #ec4899);
              border: none; color: white; font-weight: 700;
              cursor: pointer; font-family: 'Space Grotesk', sans-serif;
              transition: all 0.3s; font-size: 0.95rem;
            }
            .tf-submit:hover {
              transform: translateY(-1px);
              box-shadow: 0 8px 25px rgba(139,92,246,0.4);
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TaskForm;
