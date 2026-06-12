import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    if (email === 'teste@teste.com' && password === '123') {
      navigate('/home');
    } else {
      setError('Sorry, we can\'t find an account with this email address or the password is incorrect. Please try again.');
    }
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen-background">
        <img
          className="loginScreen-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix Logo"
        />
        <div className="loginScreen-gradient" />
      </div>

      <div className="loginScreen-body">
        <h1>Sign In</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="loginScreen-form" onSubmit={signIn}>
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
          
          <div style={{ marginTop: '20px', color: '#737373', fontSize: '14px' }}>
            New to Netflix? <span style={{ color: 'white' }}>Sign up now.</span>
          </div>
          <div style={{ marginTop: '10px', color: '#8c8c8c', fontSize: '13px' }}>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
