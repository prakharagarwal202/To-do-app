import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Board from './pages/Board';
import './styles/global.css';
import './styles/components.css';

const Landing = () => (
  <div className="landing-root mesh-bg">
    <div className="noise-overlay" />

    {/* Light Leaks */}
    <div className="light-leak leak-1 animate-float-slow" />
    <div className="light-leak leak-2 animate-float-slower" />
    <div className="light-leak leak-3 animate-float-slow" style={{ animationDelay: '-5s' }} />

    {/* Navigation */}
    <nav className="landing-nav">
      <div className="nav-logo">
        <span className="text-gradient logo-text">Iconic.</span>
      </div>
      <div className="nav-actions">
        <Link to="/login" className="login-link">Log In</Link>
        <Link to="/register" className="join-btn">Join Now</Link>
      </div>
    </nav>

    {/* Hero */}
    <main className="hero-main">
      <div className="hero-text">
        <h1 className="hero-title">
          Organize your <span className="text-gradient">chaos.</span><br />
          Make it <span className="text-gradient italic">iconic.</span> ✨
        </h1>
        <p className="hero-subtitle">
          The dopamine-fueled task board for the modern aesthetic. Pure vibes, zero clutter, maximum productivity.
        </p>
        <div className="hero-buttons">
          <Link to="/login" className="cta-primary">
            Start Crushing Tasks
            <span className="material-symbols-outlined rocket-icon">rocket_launch</span>
          </Link>
        </div>
      </div>

      {/* App Preview */}
      <div className="app-preview-container">
        <div className="app-preview-window">
          {/* Window Header */}
          <div className="win-header">
            <div className="dot-group">
              <div className="dot red" />
              <div className="dot yellow" />
              <div className="dot green" />
            </div>
            <div className="win-header-right">
              <div className="workspace-badge">Workspace: Aura</div>
              <div className="user-orb" />
            </div>
          </div>

          {/* Window Body - Task Board */}
          <div className="win-body">
            {/* Column: Chaos */}
            <div className="board-col">
              <div className="col-header">
                <h4>Chaos</h4>
                <span className="col-count">4</span>
              </div>
              <div className="task-card card-hoverable">
                <div className="card-top">
                  <span className="emoji">🚀</span>
                  <span className="status-tag tag-primary">High Vibe</span>
                </div>
                <h5 className="card-title">Launch Project X</h5>
                <p className="card-desc">Ship the beta by Friday.</p>
              </div>
              <div className="task-card">
                <div className="card-top">
                  <span className="emoji">🎨</span>
                  <span className="status-tag tag-accent">Design</span>
                </div>
                <h5 className="card-title">New UI Assets</h5>
                <div className="mini-avatars">
                  <div className="mini-av bg-pink" />
                  <div className="mini-av bg-purple" />
                </div>
              </div>
            </div>

            {/* Column: Vibe */}
            <div className="board-col">
              <div className="col-header">
                <h4>Vibe</h4>
                <span className="col-count">2</span>
              </div>
              <div className="task-card card-active">
                <div className="card-top">
                  <span className="emoji">✨</span>
                  <span className="status-tag tag-secondary">In Flow</span>
                </div>
                <h5 className="card-title">Brand Refresh</h5>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '60%' }} />
                </div>
              </div>
              <div className="task-card card-ghost">
                <div className="card-top">
                  <span className="emoji">🎧</span>
                  <span className="status-tag tag-muted">Chill</span>
                </div>
                <h5 className="card-title">Deep Work Mix</h5>
              </div>
            </div>

            {/* Column: Iconic */}
            <div className="board-col">
              <div className="col-header col-header-iconic">
                <h4>Iconic</h4>
                <span className="col-count col-count-iconic">1</span>
              </div>
              <div className="task-card card-done">
                <div className="card-top">
                  <span className="emoji">💎</span>
                  <span className="status-tag tag-success">Done</span>
                </div>
                <h5 className="card-title">MVP Finished</h5>
                <p className="card-desc">Everything is optimal.</p>
              </div>
            </div>
          </div>

          {/* Window Footer */}
          <div className="win-footer">
            <div className="win-footer-icons">
              <span className="material-symbols-outlined">grid_view</span>
              <span className="material-symbols-outlined">notifications</span>
              <span className="material-symbols-outlined">settings</span>
            </div>
            <div className="system-status">
              <div className="status-dot pulse" />
              <span>System Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </main>


    <style>{`
      /* ===== BASE ===== */
      .landing-root {
        height: 100vh;
        min-width: 100vw;
        font-family: 'Space Grotesk', sans-serif;
        color: white;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .mesh-bg {
        background-color: #06060a;
        background-image:
          radial-gradient(at 0% 0%, hsla(273,100%,15%,1) 0, transparent 50%),
          radial-gradient(at 50% 0%, hsla(220,100%,20%,0.8) 0, transparent 50%),
          radial-gradient(at 100% 0%, hsla(320,100%,25%,0.7) 0, transparent 50%),
          radial-gradient(at 85% 65%, hsla(260,100%,30%,0.6) 0, transparent 50%),
          radial-gradient(at 15% 85%, hsla(330,100%,40%,0.5) 0, transparent 50%),
          radial-gradient(at 50% 100%, hsla(210,100%,15%,1) 0, transparent 50%);
      }
      .noise-overlay {
        position: fixed; inset: 0; z-index: 1; opacity: 0.05;
        pointer-events: none;
        background-image: url("https://grainy-gradients.vercel.app/noise.svg");
        filter: contrast(170%) brightness(1000%);
      }

      /* ===== LIGHT LEAKS ===== */
      .light-leak {
        position: absolute; border-radius: 100%;
        filter: blur(120px); z-index: 0; pointer-events: none; opacity: 0.5;
      }
      .leak-1 { width: 600px; height: 600px; background: #8b5cf6; top: -10%; left: -10%; }
      .leak-2 { width: 500px; height: 500px; background: #ec4899; bottom: 10%; right: 5%; }
      .leak-3 { width: 400px; height: 400px; background: #3b82f6; top: 40%; left: 30%; }
      @keyframes float {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(30px, -50px) rotate(2deg); }
        66% { transform: translate(-20px, 20px) rotate(-1deg); }
      }
      .animate-float-slow { animation: float 15s ease-in-out infinite; }
      .animate-float-slower { animation: float 20s ease-in-out infinite reverse; }

      /* ===== SHARED ===== */
      .text-gradient {
        background: linear-gradient(135deg, #f472b6 0%, #a78bfa 50%, #60a5fa 100%);
        -webkit-background-clip: text; background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .italic { font-style: italic; }
      .glass-panel {
        background: rgba(255,255,255,0.03);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255,255,255,0.1);
      }

      /* ===== NAV ===== */
      .landing-nav {
        width: 100%; padding: 1rem 2.5rem;
        display: flex; align-items: center; justify-content: space-between;
        position: relative; z-index: 20;
      }
      .logo-text { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.05em; }
      .nav-links { display: none; align-items: center; gap: 2rem; font-weight: 500; }
      .nav-links a { color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.3s; }
      .nav-links a:hover { color: white; }
      @media (min-width: 768px) { .nav-links { display: flex; } }
      .nav-actions { display: flex; align-items: center; gap: 1.5rem; }
      .theme-toggle-btn {
        padding: 0.5rem; border-radius: 50%;
        background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
        color: white; display: flex; cursor: pointer; transition: all 0.3s;
      }
      .theme-toggle-btn:hover { background: rgba(255,255,255,0.1); }
      .login-link {
        font-weight: 600; color: white;
        text-decoration: none; transition: color 0.3s;
      }
      .login-link:hover { color: #ec4899; }
      @media (min-width: 640px) { .login-link { display: block; } }
      .join-btn {
        padding: 0.5rem 1.25rem; border-radius: 9999px;
        background: linear-gradient(to right, #8b5cf6, #ec4899, #3b82f6);
        color: white; font-weight: 700; text-decoration: none;
        box-shadow: 0 10px 15px rgba(236,72,153,0.2);
        transition: transform 0.3s;
      }
      .join-btn:hover { transform: scale(1.05); }

      /* ===== HERO ===== */
      .hero-main {
        max-width: 1280px; margin: 0 auto;
        padding: 1.5rem 1.5rem 2rem;
        display: flex; flex-direction: column; align-items: center; gap: 2rem;
        position: relative; z-index: 10;
        flex: 1;
      }
      @media (min-width: 1024px) {
        .hero-main {
          flex-direction: row; padding: 1rem 1.5rem;
        }
      }
      .hero-text { flex: 1; text-align: center; }
      @media (min-width: 1024px) { .hero-text { text-align: left; } }
      .hero-title {
        font-size: 3rem; font-weight: 800; letter-spacing: -0.025em;
        line-height: 1.1; margin-bottom: 1rem;
      }
      @media (min-width: 768px) { .hero-title { font-size: 3.75rem; } }
      @media (min-width: 1024px) { .hero-title { font-size: 5rem; } }
      .hero-subtitle {
        font-size: 1rem; color: rgba(255,255,255,0.6);
        max-width: 36rem; margin: 0 auto 1.5rem; line-height: 1.5;
      }
      @media (min-width: 768px) { .hero-subtitle { font-size: 1.125rem; } }
      @media (min-width: 1024px) { .hero-subtitle { margin-left: 0; } }
      .hero-buttons {
        display: flex; flex-direction: column; align-items: center; gap: 1rem;
      }
      @media (min-width: 640px) {
        .hero-buttons { flex-direction: row; justify-content: center; }
      }
      @media (min-width: 1024px) {
        .hero-buttons { justify-content: flex-start; }
      }
      .cta-primary {
        padding: 1rem 1.75rem; border-radius: 2.5rem;
        background: linear-gradient(to right, #8b5cf6, #ec4899);
        color: white; font-size: 1.1rem; font-weight: 700;
        box-shadow: 0 25px 50px -12px rgba(236,72,153,0.4);
        display: flex; align-items: center; gap: 0.75rem;
        text-decoration: none; transition: all 0.3s;
      }
      .cta-primary:hover {
        transform: translateY(-4px);
        box-shadow: 0 25px 50px -12px rgba(236,72,153,0.6);
      }
      .rocket-icon { transition: transform 0.3s; }
      .cta-primary:hover .rocket-icon { transform: rotate(12deg); }
      .cta-secondary {
        padding: 1.25rem 2rem; border-radius: 2.5rem; font-weight: 700;
        background: rgba(255,255,255,0.03); backdrop-filter: blur(12px);
        border: 1px solid rgba(255,255,255,0.1); color: white;
        cursor: pointer; transition: all 0.3s; font-size: 1rem;
        font-family: 'Space Grotesk', sans-serif;
      }
      .cta-secondary:hover { background: rgba(255,255,255,0.1); }

      /* ===== SOCIAL PROOF ===== */
      .social-proof {
        margin-top: 4rem; display: flex; flex-direction: column;
        align-items: center; gap: 1rem;
        font-size: 0.875rem; color: rgba(255,255,255,0.4);
      }
      @media (min-width: 640px) { .social-proof { flex-direction: row; justify-content: center; } }
      @media (min-width: 1024px) { .social-proof { justify-content: flex-start; } }
      .avatar-stack { display: flex; }
      .avatar {
        width: 2.5rem; height: 2.5rem; border-radius: 50%;
        border: 2px solid #06060a;
        display: flex; align-items: center; justify-content: center;
        font-weight: 700; font-size: 0.75rem; color: white;
        margin-left: -0.75rem;
      }
      .avatar:first-child { margin-left: 0; }
      .av-purple { background: #8b5cf6; }
      .av-pink { background: #ec4899; }
      .av-blue { background: #3b82f6; }
      .social-proof p { margin: 0; }

      /* ===== APP PREVIEW ===== */
      .app-preview-container { flex: 1; width: 100%; perspective: 1200px; padding-right: 2rem; }
      .app-preview-window {
        position: relative; width: 100%; aspect-ratio: 4 / 3;
        border-radius: 2rem; overflow: hidden;
        transform: rotateY(-12deg) rotateX(5deg);
        box-shadow:
          -20px 20px 50px rgba(0,0,0,0.5),
          0 0 80px -10px rgba(139,92,246,0.4),
          0 0 40px -5px rgba(236,72,153,0.3);
        background: rgba(10,10,15,0.8);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.15);
        transition: all 0.7s;
      }

      /* Window Header */
      .win-header {
        padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);
        display: flex; align-items: center; justify-content: space-between;
      }
      .dot-group { display: flex; gap: 0.5rem; }
      .dot { width: 0.75rem; height: 0.75rem; border-radius: 50%; }
      .dot.red { background: rgba(239,68,68,0.5); }
      .dot.yellow { background: rgba(234,179,8,0.5); }
      .dot.green { background: rgba(34,197,94,0.5); }
      .win-header-right { display: flex; align-items: center; gap: 1rem; }
      .workspace-badge {
        padding: 0.375rem 1rem; border-radius: 9999px;
        background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
        color: rgba(255,255,255,0.7); font-size: 0.625rem;
        text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;
      }
      .user-orb {
        width: 2rem; height: 2rem; border-radius: 50%;
        background: linear-gradient(to top right, #ec4899, #8b5cf6);
      }

      /* Window Body */
      .win-body {
        padding: 1.5rem; height: 100%;
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
      }
      .board-col { display: flex; flex-direction: column; gap: 1rem; }
      .col-header {
        display: flex; align-items: center; justify-content: space-between; padding: 0 0.5rem;
      }
      .col-header h4 {
        font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
        letter-spacing: -0.05em; color: rgba(255,255,255,0.4); margin: 0;
      }
      .col-count {
        font-size: 0.625rem; background: rgba(255,255,255,0.05);
        padding: 0.125rem 0.5rem; border-radius: 4px; color: rgba(255,255,255,0.3);
      }
      .col-header-iconic h4 { color: #ec4899; }
      .col-count-iconic { background: rgba(236,72,153,0.1); color: rgba(236,72,153,0.7); }

      /* Task Cards */
      .task-card {
        padding: 1rem; border-radius: 1rem;
        background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
        transition: border-color 0.3s;
      }
      .card-hoverable:hover { border-color: rgba(236,72,153,0.5); }
      .card-hoverable:hover .card-title { color: #ec4899; }
      .card-active {
        background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.2);
        box-shadow: 0 20px 25px -5px rgba(139,92,246,0.05);
      }
      .card-ghost { opacity: 0.6; }
      .card-done {
        background: linear-gradient(to bottom right, rgba(236,72,153,0.1), transparent);
        border-color: rgba(236,72,153,0.3);
        box-shadow: 0 25px 50px -12px rgba(236,72,153,0.1);
      }
      .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
      .emoji { font-size: 1.125rem; }
      .status-tag {
        font-size: 0.65rem; padding: 2px 8px; border-radius: 9999px;
        font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
      }
      .tag-primary { background: rgba(236,72,153,0.2); color: #ec4899; }
      .tag-secondary { background: rgba(139,92,246,0.2); color: #8b5cf6; }
      .tag-accent { background: rgba(59,130,246,0.2); color: #3b82f6; }
      .tag-success { background: rgba(34,197,94,0.2); color: #4ade80; }
      .tag-muted { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); }
      .card-title {
        font-size: 0.875rem; font-weight: 700; margin: 0 0 0.25rem; transition: color 0.3s;
      }
      .card-desc { font-size: 0.625rem; color: rgba(255,255,255,0.4); margin: 0; }
      .mini-avatars { display: flex; margin-top: 0.5rem; }
      .mini-av {
        width: 1.25rem; height: 1.25rem; border-radius: 50%;
        border: 1px solid black; margin-left: -0.375rem;
      }
      .mini-av:first-child { margin-left: 0; }
      .bg-pink { background: #ec4899; }
      .bg-purple { background: #8b5cf6; }
      .progress-bar {
        width: 100%; height: 6px; background: rgba(255,255,255,0.05);
        border-radius: 9999px; margin-top: 0.75rem; overflow: hidden;
      }
      .progress-fill { height: 100%; background: #8b5cf6; }

      /* Window Footer */
      .win-footer {
        position: absolute; bottom: 0; left: 0; right: 0;
        padding: 1rem 1.5rem;
        background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
        border-top: 1px solid rgba(255,255,255,0.05);
        display: flex; justify-content: space-between; align-items: center;
        color: rgba(255,255,255,0.3);
      }
      .win-footer-icons { display: flex; gap: 1rem; }
      .win-footer-icons span { font-size: 0.875rem; }
      .system-status { display: flex; align-items: center; gap: 0.5rem; }
      .status-dot {
        width: 0.5rem; height: 0.5rem; border-radius: 50%; background: #4ade80;
      }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      .pulse { animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
      .system-status span {
        font-size: 0.625rem; text-transform: uppercase;
        font-weight: 700; letter-spacing: 0.1em; color: rgba(74,222,128,0.7);
      }

      /* ===== FEATURES ===== */
      .features-section {
        max-width: 1280px; margin: 0 auto; padding: 5rem 1.5rem;
        position: relative; z-index: 10;
      }
      .features-grid {
        display: grid; grid-template-columns: 1fr; gap: 2rem;
      }
      @media (min-width: 768px) { .features-grid { grid-template-columns: repeat(3, 1fr); } }
      .feature-card {
        padding: 2rem; border-radius: 2.5rem;
        border-color: rgba(255,255,255,0.05);
        transition: background 0.3s; cursor: default;
      }
      .feature-card:hover { background: rgba(255,255,255,0.05); }
      .f-icon {
        width: 3rem; height: 3rem; border-radius: 1rem;
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 1.5rem;
      }
      .pink-icon { background: rgba(236,72,153,0.2); color: #ec4899; }
      .purple-icon { background: rgba(139,92,246,0.2); color: #8b5cf6; }
      .blue-icon { background: rgba(59,130,246,0.2); color: #3b82f6; }
      .feature-card h3 { font-size: 1.25rem; font-weight: 700; margin: 0 0 0.75rem; }
      .feature-card p { color: rgba(255,255,255,0.5); margin: 0; line-height: 1.5; }

      /* ===== FOOTER ===== */
      .landing-footer {
        max-width: 1280px; margin: 0 auto; padding: 3rem 1.5rem;
        border-top: 1px solid rgba(255,255,255,0.1);
        display: flex; flex-direction: column; align-items: center; gap: 2rem;
        position: relative; z-index: 10;
      }
      @media (min-width: 768px) {
        .landing-footer { flex-direction: row; justify-content: space-between; }
      }
      .landing-footer > p { color: rgba(255,255,255,0.4); font-size: 0.875rem; margin: 0; }
      .footer-links { display: flex; gap: 2rem; font-size: 0.875rem; font-weight: 500; }
      .footer-links a {
        color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.3s;
      }
      .footer-links a:hover { color: #ec4899; }

      /* ===== SELECTION COLOR ===== */
      .landing-root ::selection { background: rgba(236,72,153,0.3); }
    `}</style>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <TaskProvider>
                  <Board />
                </TaskProvider>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
