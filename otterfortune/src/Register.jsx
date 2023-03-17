import React, { useState } from "react";
import loginImage from './Imagenes/logo.png';
import styles from './CSS/Register.module.css';
import { Menu } from "./Menu";
import * as socketActions from './socketActions';
import { useSocket } from './socketContext';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const socket = useSocket();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      window.alert('Por favor, ingrese su nombre.');
    } 
    else if (email.trim() === '') {
      window.alert('Por favor, ingrese su email.');
    } 
    else if (pass.trim() === '') {
      window.alert('Por favor, ingrese su contraseña.');
    }
    else {
      // Mandar al servidor y comprobar
      const registroExitoso = await socketActions.registrarse(socket, email, pass, name);
      if (registroExitoso) {
        // Poner a true para mostrar el menu si se inicia correctamente
        setShowMenu(true);
      }
      else {
        setShowMenu(false);
        window.alert('Te has registrado mal');
      }
      // console.log(email);
      //props.onFormSwitch('Menu', { email });
    }
  }
  if (showMenu) {
    // Para pasar el valor del email en la variable 'email'
    return <Menu email={email} />;
  }

  return (
    <div className={styles["auth-container"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div className={styles["form-container"]}>
          <h2>Registro</h2>
          <label htmlFor="name">Nombre</label>
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Nombre" />

          <label htmlFor="email">Correo Electrónico</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email" />

          <label htmlFor="password">Contraseña</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password" />

          <button type="submit">Registrarse</button>
          <button
            className={styles["link-btn"]}
            onClick={() => props.onFormSwitch('login')}>
            ¿Ya tienes una cuenta? Inicia sesión aquí.
          </button>
        </div>
      </form>
      <div className={styles["login-image"]}>
        <img src={loginImage} alt="Login" className="login-image" />
      </div>
    </div>
  );
}

export default Register;