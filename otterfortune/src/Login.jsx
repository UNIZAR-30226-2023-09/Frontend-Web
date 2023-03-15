import React, { useState } from "react";
import loginImage from './logo.png';
import styles from './Login.module.css'; // Importar el CSS como módulo
//import './Login.css'
import { Menu } from "./Menu";

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  // Para ver contraseña
  // const [showPassword, setShowPassword] = useState(false);

  // Cuando se pulsa el boton del login
  const handleSubmit = (e) => {
    e.preventDefault();
    // Comprobamos los campos
    if (email.trim() === '') {
      window.alert('Por favor, ingrese su email.');
    } 
    else if (password.trim() === '') {
      window.alert('Por favor, ingrese su contraseña.');
    }
    else {
      // TODO:
      // Aqui seria mandar al servidor y comprobar 
      // Poner a true para mostrar el menu
      setShowMenu(true);
      console.log(email);
      //props.onFormSwitch('Menu', { email });
    }
  }

// Lógica para enviar los datos del formulario al servidor
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  if (showMenu) {
    // Llamar a menu y guardar el valor del email en 'email'
    // También se guarda en 'props.email' y se accede en menu
    return <Menu email={email} />;
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
                  placeholder="youremail@gmail.com" 
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