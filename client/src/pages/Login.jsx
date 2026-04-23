import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');

  // change these to your own admin login
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'amuma123';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('amumaAdminLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      setErrorText('Invalid username or password.');
    }
  };

  return (
    <div className="amuma-login-page">
      <div className="login-bg-shape shape-one"></div>
      <div className="login-bg-shape shape-two"></div>
      <div className="login-bg-shape shape-three"></div>

      <div className="amuma-login-card">
        <div className="amuma-login-left">
          <div className="login-brand">
            <div className="brand-icon">
              <FaHeart />
            </div>
            <div className="brand-text">
              <h1>amuma</h1>
              <span>ADMIN</span>
            </div>
          </div>

          <div className="login-left-content">
            <h2>Admin Portal</h2>
            <p>
              Monitor and manage Amuma devices, users, and health data in
              real-time.
            </p>
          </div>

          <div className="device-visual-area">
            <div className="ecg-line"></div>
            <div className="device-mockup">
              <span>amuma</span>
            </div>
          </div>
        </div>

        <div className="amuma-login-right">
          <div className="welcome-icon">
            <FaHeart />
          </div>

          <h2 className="welcome-title">Welcome Back</h2>
          <p className="welcome-subtitle">
            Log in to your Amuma Admin account
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {errorText && <p className="login-error-text">{errorText}</p>}

            <button type="submit" className="login-main-btn">
              Log In
            </button>

            <div className="divider">
              <span>Admin Access Only</span>
            </div>

            <button type="button" className="sso-btn">
              <FiShield />
              <span>Secure Admin Portal</span>
            </button>

            <p className="login-footer-text">
              Need access? <Link to="/signup">Contact Support</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}