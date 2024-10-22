import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { LoginButton } from './autenticacion'; // Importar LoginButton

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/login.php', { email, password });
      if (response.data.success) {
        // Guardar datos del usuario en localStorage
        const userData = {
          email: response.data.user.email,
          name: response.data.user.name || 'Nombre por defecto', // Asegúrate de que esto venga de tu respuesta
          picture: response.data.user.picture || 'url_imagen_por_defecto', // Asegúrate de que esto venga de tu respuesta
        };

        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        setIsAdmin(userData.email === 'administrador@gmail.com');

        // Enviar datos a registro.php para guardarlos en la base de datos
        await axios.post('http://localhost/registro.php', userData);

        if (userData.email === 'administrador@gmail.com') {
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
      <br />
      <p>------------------------------------ ór ------------------------------------</p>
      
      <LoginButton  /> 
      <p>
        ¿No tienes una cuenta? <a href="/Registro">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
