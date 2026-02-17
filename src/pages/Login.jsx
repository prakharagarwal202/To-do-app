import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = login(email, password, true);
    if (result.success) {
      navigate("/board");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page mesh-bg">
      <div className="noise-overlay" />
      <div className="light-leak leak-1 animate-float-slow" />
      <div className="light-leak leak-2 animate-float-slower" />

      {/* Logo */}
      <div className="auth-logo">
        <Link to="/" className="text-gradient logo-text">
          To do task.
        </Link>
      </div>

      {/* Login Card */}
      <div className="auth-card glass-card">
        <div className="auth-card-header">
          <h1>
            Welcome back,
            <br />
            <span className="text-gradient">Prakhar Agarwal</span> ✨
          </h1>
          <p>Enter your vibes to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="you@vibe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <div className="auth-field-header">
              <label>PASSWORD</label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="auth-error">😫 {error}</div>}

          <button type="submit" className="auth-submit-btn">
            Log In
          </button>
        </form>

        <div className="auth-switch">
          <p>
            New here?{" "}
            <Link to="/register" className="auth-switch-link">
              Join the movement
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh; min-width: 100vw;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          color: white; position: relative; overflow: hidden;
          padding: 1rem;
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
        .light-leak {
          position: absolute; border-radius: 100%;
          filter: blur(120px); z-index: 0; pointer-events: none; opacity: 0.5;
        }
        .leak-1 { width: 600px; height: 600px; background: #8b5cf6; top: -10%; left: -10%; }
        .leak-2 { width: 500px; height: 500px; background: #ec4899; bottom: 10%; right: 5%; }
        @keyframes float {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          33% { transform: translate(30px,-50px) rotate(2deg); }
          66% { transform: translate(-20px,20px) rotate(-1deg); }
        }
        .animate-float-slow { animation: float 15s ease-in-out infinite; }
        .animate-float-slower { animation: float 20s ease-in-out infinite reverse; }
        .text-gradient {
          background: linear-gradient(135deg, #f472b6 0%, #a78bfa 50%, #60a5fa 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Logo */
        .auth-logo {
          position: relative; z-index: 10; margin-bottom: 1.25rem;
        }
        .logo-text {
          font-size: 1.75rem; font-weight: 700; letter-spacing: -0.05em;
          text-decoration: none;
        }

        /* Card */
        .auth-card {
          position: relative; z-index: 10;
          width: 100%; max-width: 400px;
          padding: 2rem;
          border-radius: 1.5rem;
          background: rgba(10,10,20,0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }
        .auth-card-header { text-align: center; margin-bottom: 1.5rem; }
        .auth-card-header h1 {
          font-size: 1.5rem; font-weight: 700; line-height: 1.3; margin: 0 0 0.35rem;
        }
        .auth-card-header p {
          color: rgba(255,255,255,0.5); font-size: 0.9rem; margin: 0;
        }

        /* Form */
        .auth-form { display: flex; flex-direction: column; gap: 1rem; }
        .auth-field { display: flex; flex-direction: column; gap: 0.5rem; }
        .auth-field label {
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.5);
        }
        .auth-field-header {
          display: flex; justify-content: space-between; align-items: center;
        }
        .forgot-link {
          font-size: 0.8rem; color: rgba(255,255,255,0.6);
          text-decoration: none; font-weight: 600; transition: color 0.3s;
        }
        .forgot-link:hover { color: #ec4899; }
        .auth-field input {
          width: 100%; padding: 0.75rem 1rem;
          border-radius: 0.75rem; border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: white; font-size: 0.95rem;
          font-family: 'Space Grotesk', sans-serif;
          outline: none; transition: border-color 0.3s;
        }
        .auth-field input::placeholder { color: rgba(255,255,255,0.3); }
        .auth-field input:focus { border-color: rgba(139,92,246,0.5); }

        /* Error */
        .auth-error {
          padding: 0.75rem 1rem; border-radius: 0.75rem;
          background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5; font-size: 0.85rem; text-align: center;
        }

        /* Submit */
        .auth-submit-btn {
          width: 100%; padding: 0.875rem; border-radius: 0.75rem;
          background: linear-gradient(to right, #ec4899, #a78bfa);
          color: white; font-size: 1.1rem; font-weight: 700;
          border: none; cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
          transition: all 0.3s; margin-top: 0.5rem;
        }
        .auth-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(236,72,153,0.4);
        }

        /* Switch */
        .auth-switch {
          text-align: center; margin-top: 1.25rem;
          padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.08);
        }
        .auth-switch p { color: rgba(255,255,255,0.5); margin: 0; font-size: 0.9rem; }
        .auth-switch-link {
          color: white; font-weight: 700; text-decoration: none;
          transition: color 0.3s;
        }
        .auth-switch-link:hover { color: #ec4899; }

        /* Status Bar */
        .auth-status-bar {
          position: relative; z-index: 10;
          display: flex; gap: 2rem; margin-top: 2rem;
        }
        .status-item {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.4);
        }
        .status-dot-green {
          width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
        }
        .status-dot-pink {
          width: 6px; height: 6px; border-radius: 50%; background: #ec4899;
        }

        ::selection { background: rgba(236,72,153,0.3); }
      `}</style>
    </div>
  );
};

export default Login;
