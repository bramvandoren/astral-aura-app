// src/components/Login.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_LOGIN } from '../graphql/users/LOGIN';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({setUser}) => {
  const navigate = useNavigate(); // Get the navigate function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginMutation, { loading, error }] = useMutation(GET_LOGIN);

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({ variables: { email, password }, onCompleted:({authenticate}) => {
        setUser(authenticate)
    } });
      console.log('Mutation data:', data);
    const token = data.authenticate.jwt;

    // Log token to ensure it's correct
    console.log('JWT Token:', token);

    localStorage.setItem('token', token);
    
    
    // Log a message before redirection
    console.log('Redirecting to dashboard...');

    // Redirect to the dashboard after a successful login
    // window.location.href = '/';

      
      // Redirect to the dashboard after a successful login
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <div>
        <h1>AstralAura</h1>
      </div>
      <h2>Login</h2>
      
      <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: {error.message}</p>}
      <p>
        Nog geen account? 
        <Link to="/register">Registreer hier</Link>
      </p>
    </div>
  );
};

export default Login;
