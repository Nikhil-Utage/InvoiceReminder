import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-form">
        <h2 className="login-title">Login form</h2>
        <input
          type="email"
          placeholder="Enter email"
          className="login-input"
        />
        <input
          type="password"
          placeholder="Enter password"
          className="login-input"
        />
        <button className="login-button">Submit</button>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="https://www.facebook.com" className="icon fb" target="_blank" rel="noopener noreferrer">
            f
          </a>
          <a href="http://localhost:5000/auth/google" className="icon google">
            G
          </a>
          <a href="https://www.twitter.com" className="icon twitter" target="_blank" rel="noopener noreferrer">
            t
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
