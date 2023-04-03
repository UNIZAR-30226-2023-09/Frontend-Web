import React, { useState } from 'react';
import loginImage from './Imagenes/logo.png';
import styles from './CSS/Login.module.css'; // Importar el CSS como módulo
import { Menu } from "./Menu";
import { Register } from "./Register";

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [register, setRegister] = useState(false);
    const [numGemas, setNumGemas] = useState(0);

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
            // Mandar al servidor y comprobar. RegistroExitoso devuelve el numero de gemas
            const gemas = await socketActions.iniciarSesion(socket, email, password);
            if (gemas >= 0) {
                // Poner a true para mostrar el menu si se inicia correctamente
                // TODO: Obtener nombre en vez de email
                setNumGemas(gemas);
                setShowMenu(true);
            }
            else {
                setShowMenu(false);
                window.alert('Login incorrecto.');
            }
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

    const handleRegister = (event) => {
        setRegister(true);
    };

    if (register) {
        return <Register />;
    }

    if (showMenu) {
        // Llamar a menu y guardar el valor del email en 'email'
        // También se guarda en 'props.email' y se accede en menu
        return <Menu email={email} gemas={numGemas} />;
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
                        onClick={handleRegister}>
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