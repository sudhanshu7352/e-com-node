import React, { useState } from 'react';
import api, { setAuthToken } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      alert(res.data.message);
      navigate('/products');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("err",error);       
        alert(error.response?.data.error);
      } else {
        console.log('Unexpected error:', error);        
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Page</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
