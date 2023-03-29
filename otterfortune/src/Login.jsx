import React, { useState } from 'react';
import loginImage from './Imagenes/logo.png';
import styles from './CSS/Login.module.css'; // Importar el CSS como módulo
import { Menu } from "./Menu";
import * as socketActions from './socketActions';
import { useSocket } from './socketContext';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const socket = useSocket();

  // Cuando se pulsa el boton del login
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Comprobamos los campos
    if (email.trim() === '') {
      window.alert('Por favor, ingrese su email.');
    } 
    else if (password.trim() === '') {
      window.alert('Por favor, ingrese su contraseña.');
    }
    else {
      // Mandar al servidor y comprobar
      const registroExitoso = await socketActions.iniciarSesion(socket, email, password);
      if (registroExitoso) {
        // Poner a true para mostrar el menu si se inicia correctamente
        setShowMenu(true);
      }
      else {
        setShowMenu(false);
        window.alert('Login incorrecto.');
      }
      // console.log(email);
      //props.onFormSwitch('Menu', { email });
    }
  }

// Cuando se rellena el campo del email se guarda
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Cuando se rellena el campo de la contraseña se guarda
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  if (showMenu) {
    // Llamar a menu y guardar el valor del email en 'email'
    // También se guarda en 'props.email' y se accede en menu
    // TODO: Pasar las gemas
    return <Menu email={email} gemas={0}/>;
  }

  return (
    <div className={styles["auth-container"]}> {/* Utilizar la clase CSS desde el módulo */}
        <form className={styles["login-form"]}>
            <div className={styles["form-container"]}>
                <h2>Iniciar Sesión</h2>
                <label htmlFor="email">Email</label>
                <input 
                  value={email} 
                  onChange={handleEmailChange} 
                  type="email" 
                  placeholder="tuEmail@unizar.es" 
                  id="email" 
                  name="email" />

                <label htmlFor="password">Contraseña</label>
                <input value={password} 
                  onChange={handlePasswordChange} 
                  type="password" 
                  placeholder="********" 
                  id="password" 
                  name="password" />

                <button type="submit" onClick={handleSubmit}>Log In</button>
                <button className={styles["link-btn"]} 
                  onClick={() => props.onFormSwitch('register')}>
                  ¿Eres nuevo? Crea una cuenta ahora.</button>
            </div>
        </form>
        <div className={`${styles["login-image"]} ${styles["image-container"]}`}> {/* Utilizar las clases CSS desde el módulo */}
          <img src={loginImage} alt="Login" className={styles["login-image"]} />
        </div>
    </div>
  )
}

export default Login;