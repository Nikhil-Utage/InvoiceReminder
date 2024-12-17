import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-form">
        <h2 className="login-title">Login To Continue</h2>
        
        <button 
          className="google-signin-button" 
          onClick={() => window.location.href='http://localhost:5000/auth/google'}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
