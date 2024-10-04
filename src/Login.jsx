///librerías para pedir peticiones http, actualizaciones, aplicar estilos
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
//Manejo del Envío del Formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/login.php', { email, password });
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setIsLoggedIn(true);
        setIsAdmin(response.data.user.email === 'administrador@gmail.com');
        if (response.data.user.email === 'administrador@gmail.com') {
          navigate('/admin-profile');
        } else {
          navigate('/');
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };
//Renderizado del Componente
  return (
    <div className="login-container">
      <img src="src/img/logo2.png" alt="Logo" className="login-logo" />
      <h2 className="login-heading">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-field">
          <label className="login-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <div className="login-field">
          <label className="login-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-button">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes una cuenta? <a href="/Registro">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
