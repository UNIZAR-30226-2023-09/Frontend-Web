import React, { useState } from "react";
import loginImage from './Imagenes/logo.png';
import styles from './CSS/Register.module.css';
import { Menu } from "./Menu";
import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import Login from "./Login";

import { mostrarAlerta } from './alertas.jsx';
import { mostrarAlertaRegister } from './alertas.jsx';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [register, setRegister] = useState(false);

    const socket = useSocket();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() === '') {
            //window.alert('Por favor, ingrese su nombre.');
            mostrarAlerta("errorIngresarNombre");
        }
        else if (email.trim() === '') {
            //window.alert('Por favor, ingrese su email.');
            mostrarAlerta("errorIngresarEmail");
        }
        else if (pass.trim() === '') {
            //window.alert('Por favor, ingrese su contraseña.');
            mostrarAlerta("errorIngresarContrasenha");
        }
        else {
            // Mandar al servidor y comprobar
            const registroExitoso = await socketActions.registrarse(socket, email, pass, name);
            if (registroExitoso) {
                // Poner a true para mostrar el menu si se inicia correctamente
                //window.alert('Te has registrado correctamente. Inicie sesión aquí');
                mostrarAlertaRegister("registerBien");
                //window.location.replace(Login);
                setShowLogin(true);
            }
            else {
                setShowLogin(false);
                //window.alert('Registro incorrecto: El usuario ya existe');
                mostrarAlerta("errorUsuario");
            }
            // console.log(email);
            //props.onFormSwitch('Menu', { email });
        }
    }

    const handleLogin = (event) => {
        setRegister(true);
    };

    if (register || showLogin) {
        return <Login />;
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
                        onClick={(handleLogin)}>
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