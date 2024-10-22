import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './styles.css';

import axios from 'axios';


export const LoginButton = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
    if (isAuthenticated && user) { 
      const userData = {
        nombre: user.name,
        email: user.email,
        imagen_perfil: user.picture
      };
      try {
        await axios.post('http://localhost/registro.php', userData);
      } catch (error) {
        console.error('Error al guardar el usuario:', error);
      }
    }
  };
  

  return (
    <button className="loginButton" onClick={handleLogin}>
      <img src="src/img/google.png" alt="Google Logo" />
      Iniciar sesión con Google o Facebook
    </button>
  );
};
