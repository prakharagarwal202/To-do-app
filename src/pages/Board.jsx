import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import TaskColumn from "../components/TaskColumn";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import ActivityLog from "../components/ActivityLog";

const Board = () => {
  const {
    tasks,
    updateTask,
    addTask,
    deleteTask,
    resetBoard,
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy,
  } = useTasks();
  const { logout, user } = useAuth();

  const [activeTask, setActiveTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [targetStatus, setTargetStatus] = useState("Todo");
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const columns = ["Todo", "Doing", "Done"];
  const columnMeta = {
    Todo: {
      emoji: "🌀",
      label: "CHAOS (To-Do)",
      gradient: "linear-gradient(135deg, #a78bfa, #c084fc)",
    },
    Doing: {
      emoji: "🔥",
      label: "VIBE (Doing)",
      gradient: "linear-gradient(135deg, #f472b6, #ec4899)",
    },
    Done: {
      emoji: "💎",
      label: "ICONIC (Done)",
      gradient: "linear-gradient(135deg, #60a5fa, #38bdf8)",
    },
  };

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task);
  };

  const handleDragOver = () => {};

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over) {
      const draggedTask = tasks.find((t) => t.id === active.id);
      let newStatus = over.id;
      if (!columns.includes(over.id)) {
        const overTask = tasks.find((t) => t.id === over.id);
        if (overTask) newStatus = overTask.status;
      }
      if (draggedTask.status !== newStatus) {
        updateTask(active.id, { status: newStatus });
      }
    }
    setActiveTask(null);
  };

  const openCreateModal = (status = "Todo") => {
    setTargetStatus(status);
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask({ ...taskData, status: targetStatus });
    }
  };

  const confirmReset = () => {
    if (window.confirm("Reset the entire board? All tasks will be lost! 😱")) {
      resetBoard();
    }
    setShowProfileMenu(false);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: "0.5" } },
    }),
  };

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === "Done").length;

  return (
    <div className="board-root mesh-bg">
      <div className="noise-overlay" />
      <div className="light-leak leak-1 animate-float-slow" />
      <div className="light-leak leak-2 animate-float-slower" />

      {/* Top Nav */}
      <header className="board-nav">
        <div className="board-nav-left">
          <span className="text-gradient board-logo">To do Task.</span>
        </div>
        <div className="board-nav-center">
          <div className="workspace-badge">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1rem" }}
            >
              workspaces
            </span>
            Workspace: Aura
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "0.9rem" }}
            >
              expand_more
            </span>
          </div>
        </div>
        <div className="board-nav-right">
          <div className="board-search">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="board-filter">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1rem" }}
            >
              filter_list
            </span>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button
            className="board-sort-btn"
            onClick={() =>
              setSortBy(sortBy === "dueDate" ? "createdAt" : "dueDate")
            }
            title={
              sortBy === "dueDate" ? "Sorted by Due Date" : "Sorted by Newest"
            }
          >
            <span className="material-symbols-outlined">sort</span>
          </button>
          <button
            className="board-activity-btn"
            onClick={() => setShowActivityLog(!showActivityLog)}
            title="Activity Log"
          >
            <span className="material-symbols-outlined">history</span>
          </button>
          <div className="board-profile-wrap">
            <button
              className="board-avatar"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {user?.name?.charAt(0) || "P"}
            </button>
            {showProfileMenu && (
              <div className="profile-dropdown glass-card">
                <div className="profile-info">
                  <div className="profile-avatar-lg">
                    {user?.name?.charAt(0) || "P"}
                  </div>
                  <div>
                    <p className="profile-name">{user?.name}</p>
                    <p className="profile-email">{user?.email}</p>
                  </div>
                </div>
                <div className="profile-divider" />
                <button onClick={confirmReset} className="profile-action">
                  <span className="material-symbols-outlined">refresh</span>
                  Reset Board
                </button>
                <button
                  onClick={logout}
                  className="profile-action logout-action"
                >
                  <span className="material-symbols-outlined">logout</span>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Board Content */}
      <main className="board-content">
        <div className="board-columns">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {columns.map((status) => (
              <TaskColumn
                key={status}
                id={status}
                title={columnMeta[status].label}
                emoji={columnMeta[status].emoji}
                gradient={columnMeta[status].gradient}
                tasks={tasks.filter((t) => t.status === status)}
                onAddTask={openCreateModal}
                onEditTask={openEditModal}
                onDeleteTask={deleteTask}
              />
            ))}

            <DragOverlay dropAnimation={dropAnimation}>
              {activeTask ? (
                <TaskCard
                  task={activeTask}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        {/* Empty State */}
        {totalTasks === 0 && (
          <div className="board-empty">
            <p className="empty-title">Your chaos awaits ✨</p>
            <p className="empty-sub">
              Start by creating your first iconic task.
            </p>
            <button className="empty-cta" onClick={() => openCreateModal()}>
              <span className="material-symbols-outlined">add</span>
              Create First Task
            </button>
          </div>
        )}
      </main>

      {/* Activity Log Slide-in */}
      {showActivityLog && (
        <div
          className="activity-overlay"
          onClick={() => setShowActivityLog(false)}
        >
          <div
            className="activity-panel glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            <ActivityLog onClose={() => setShowActivityLog(false)} />
          </div>
        </div>
      )}

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
      />

      <style>{`
        /* ===== BASE ===== */
        .board-root {
          min-height: 100vh; min-width: 100vw;
          font-family: 'Space Grotesk', sans-serif;
          color: white; position: relative;
          display: flex; flex-direction: column;
          overflow: hidden;
        }
        .mesh-bg {
          background-color: #06060a;
          background-image:
            radial-gradient(at 0% 0%, hsla(273,100%,12%,1) 0, transparent 50%),
            radial-gradient(at 50% 0%, hsla(220,100%,15%,0.6) 0, transparent 50%),
            radial-gradient(at 100% 0%, hsla(320,100%,18%,0.5) 0, transparent 50%),
            radial-gradient(at 85% 65%, hsla(260,100%,20%,0.4) 0, transparent 50%),
            radial-gradient(at 15% 85%, hsla(330,100%,25%,0.3) 0, transparent 50%),
            radial-gradient(at 50% 100%, hsla(210,100%,10%,1) 0, transparent 50%);
        }
        .noise-overlay {
          position: fixed; inset: 0; z-index: 1; opacity: 0.03;
          pointer-events: none;
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          filter: contrast(170%) brightness(1000%);
        }
        .light-leak {
          position: fixed; border-radius: 100%;
          filter: blur(150px); z-index: 0; pointer-events: none; opacity: 0.25;
        }
        .leak-1 { width: 600px; height: 600px; background: #8b5cf6; top: -10%; left: -10%; }
        .leak-2 { width: 500px; height: 500px; background: #ec4899; bottom: -5%; right: -5%; }
        @keyframes float {
          0%, 100% { transform: translate(0,0); }
          33% { transform: translate(30px,-30px); }
          66% { transform: translate(-20px,15px); }
        }
        .animate-float-slow { animation: float 20s ease-in-out infinite; }
        .animate-float-slower { animation: float 25s ease-in-out infinite reverse; }
        .text-gradient {
          background: linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.08);
        }

        /* ===== TOP NAV ===== */
        .board-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.75rem 1.5rem;
          position: relative; z-index: 20;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .board-logo { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.05em; }
        .board-nav-center { display: flex; align-items: center; }
        .workspace-badge {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.4rem 1rem; border-radius: 9999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 0.8rem; font-weight: 600;
          color: rgba(255,255,255,0.7); cursor: pointer;
          transition: background 0.3s;
        }
        .workspace-badge:hover { background: rgba(255,255,255,0.1); }
        .board-nav-right { display: flex; align-items: center; gap: 0.75rem; }
        .board-search {
          position: relative; display: flex; align-items: center;
        }
        .search-icon {
          position: absolute; left: 0.75rem;
          font-size: 1.1rem; color: rgba(255,255,255,0.4);
        }
        .board-search input {
          padding: 0.5rem 0.75rem 0.5rem 2.25rem;
          border-radius: 9999px; border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05); color: white;
          font-size: 0.85rem; width: 200px; outline: none;
          font-family: 'Space Grotesk', sans-serif;
          transition: all 0.3s;
        }
        .board-search input::placeholder { color: rgba(255,255,255,0.3); }
        .board-search input:focus {
          border-color: rgba(139,92,246,0.4);
          background: rgba(255,255,255,0.08);
          width: 260px;
        }
        .board-filter {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.4rem 0.75rem; border-radius: 9999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6); font-size: 0.8rem;
        }
        .board-filter select {
          background: transparent; border: none; color: rgba(255,255,255,0.7);
          font-size: 0.8rem; font-family: 'Space Grotesk', sans-serif;
          outline: none; cursor: pointer;
        }
        .board-filter select option { background: #1a1a2e; color: white; }
        .board-sort-btn, .board-activity-btn {
          width: 2.25rem; height: 2.25rem; border-radius: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5); display: flex;
          align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s;
        }
        .board-sort-btn:hover, .board-activity-btn:hover {
          background: rgba(255,255,255,0.1); color: white;
        }
        .board-sort-btn .material-symbols-outlined,
        .board-activity-btn .material-symbols-outlined { font-size: 1.1rem; }
        .board-profile-wrap { position: relative; }
        .board-avatar {
          width: 2.25rem; height: 2.25rem; border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          color: white; font-weight: 700; font-size: 0.9rem;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid rgba(255,255,255,0.2); cursor: pointer;
          transition: all 0.3s;
        }
        .board-avatar:hover { border-color: rgba(255,255,255,0.4); transform: scale(1.05); }
        .profile-dropdown {
          position: absolute; top: 120%; right: 0;
          width: 240px; border-radius: 1rem; padding: 1rem;
          z-index: 100;
          background: rgba(15,15,30,0.95);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        }
        .profile-info { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
        .profile-avatar-lg {
          width: 2.5rem; height: 2.5rem; border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1rem;
        }
        .profile-name { font-weight: 700; font-size: 0.9rem; margin: 0; }
        .profile-email { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin: 0; }
        .profile-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 0.5rem 0; }
        .profile-action {
          width: 100%; display: flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 0.75rem; border-radius: 0.5rem;
          background: transparent; border: none; color: rgba(255,255,255,0.6);
          font-size: 0.85rem; cursor: pointer; transition: all 0.2s;
          font-family: 'Space Grotesk', sans-serif;
        }
        .profile-action:hover { background: rgba(255,255,255,0.08); color: white; }
        .profile-action .material-symbols-outlined { font-size: 1.1rem; }
        .logout-action:hover { color: #f87171; background: rgba(248,113,113,0.1); }

        /* ===== BOARD CONTENT ===== */
        .board-content {
          flex: 1; padding: 1.5rem;
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          overflow: hidden;
        }
        .board-columns {
          display: flex; gap: 1.25rem;
          flex: 1; overflow-x: auto;
          padding-bottom: 0.5rem;
        }
        .board-columns::-webkit-scrollbar { height: 6px; }
        .board-columns::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1); border-radius: 10px;
        }

        /* ===== EMPTY STATE ===== */
        .board-empty {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          z-index: 5;
        }
        .empty-title { font-size: 1.75rem; font-weight: 700; margin: 0 0 0.5rem; }
        .empty-sub { color: rgba(255,255,255,0.4); font-size: 1rem; margin: 0 0 1.5rem; }
        .empty-cta {
          padding: 0.875rem 2rem; border-radius: 9999px;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          color: white; font-weight: 700; font-size: 1rem;
          border: none; cursor: pointer; display: flex;
          align-items: center; gap: 0.5rem;
          font-family: 'Space Grotesk', sans-serif;
          transition: all 0.3s;
          box-shadow: 0 10px 30px rgba(139,92,246,0.3);
        }
        .empty-cta:hover { transform: translateY(-2px); box-shadow: 0 15px 40px rgba(139,92,246,0.4); }
        .empty-cta .material-symbols-outlined { font-size: 1.2rem; }

        /* ===== ACTIVITY LOG PANEL ===== */
        .activity-overlay {
          position: fixed; inset: 0; z-index: 50;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
        }
        .activity-panel {
          position: fixed; top: 0; right: 0;
          width: 360px; height: 100vh;
          padding: 1.5rem;
          background: rgba(10,10,25,0.95);
          border-left: 1px solid rgba(255,255,255,0.08);
          overflow-y: auto; z-index: 51;
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        ::selection { background: rgba(236,72,153,0.3); }

        @media (max-width: 768px) {
          .board-nav { flex-wrap: wrap; gap: 0.5rem; padding: 0.75rem 1rem; }
          .board-nav-center { display: none; }
          .board-search input { width: 140px; }
          .board-filter { display: none; }
          .board-columns { flex-direction: column; }
          .activity-panel { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Board;
