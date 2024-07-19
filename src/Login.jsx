import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from './img/logo2.png'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida las credenciales con el servidor
    const response = await fetch('http://localhost/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data); // Mensaje de depuración

    if (data.success) {
      // Te envia al perfil del administrador si las credenciales son correctas
      navigate('/admin-profile');  
    } else {
      alert(data.message || 'Credenciales incorrectas. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      <h1 className="login-heading">Inicio de Sesión</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          Correo:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
        </label>
        <label className="login-label">
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        </label>
        <button type="submit" className="login-button">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
