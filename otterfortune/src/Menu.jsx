import React, { useState } from "react";
import Login from "./Login";
import loginImage from './logo.png';
import './Menu.css';
import nutria from './otter.png';


export const Menu = (props) => {
    // Obtener el valor del email
    //const { email } = props.data;
    const { email } = props;
    const [showLogin, setShowLogin] = useState(false);

    console.log(email);   // una forma de acceder a email
    console.log(props.email);   // otra forma a través de props
    
    const handleCrearPartida = (event) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        window.alert('Partida creada con ID: x.');
    };

    const handleUnirsePartida = (event) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        window.alert('Unirse Partida con ID: x.');
    };

    const handleCrearTorneo = (event) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        window.alert('Torneo creado con ID: x.');
    };

    const handleUnirseTorneo = (event) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        window.alert('Unirse torneo con ID: x.');
    };

    const handleTiendaSkins = (event) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        window.alert('Tienda skins');
    };

    const handleCerrarSesion = (event) => {
        setShowLogin(true);
    };

    if (showLogin) {
        // Llamar a menu y guardar el valor del email en 'email'
        // También se guarda en 'props.email' y se accede en menu
        return <Login />;
      }

    return (
        <div className="menu-container">
        <div className="login-image image-container"> 
            <img src={nutria} alt="Login" className="login-image"/>
        </div>
        <p>Bienvenido a OtterFortune </p>
        <div className="email-container">
                <p>{email}</p>
        </div>
        <div className="gemas-container">
                <p>Tienes x gemas</p>
        </div>
        <button className="cerrar-sesion-button" 
            onClick={handleCerrarSesion}>Cerrar sesión</button>
        <div className="menu-option">
            <label htmlFor="crearPartida">Crear partida</label>
            <input 
                onClick={handleCrearPartida} 
                type="radio" 
                name="crearPartida" 
                id="crearPartida"/>
        </div>
        <div className="menu-option">
            <label htmlFor="unirsePartida">Unirse a partida</label>
            <input 
                onClick={handleUnirsePartida}
                type="radio" 
                name="menu" 
                id="unirsePartida"/>
        </div>
        <div className="menu-option">
            <label htmlFor="crearTorneo">Crear torneo</label>
            <input 
                onClick={handleCrearTorneo} 
                type="radio" 
                name="menu" 
                id="crearTorneo"/>
        </div>
        <div className="menu-option">
            <label htmlFor="unirseTorneo">Unirse a torneo</label>
            <input 
                onClick={handleUnirseTorneo}
                type="radio" 
                name="menu" 
                id="unirseTorneo"/>
        </div>
        <div className="menu-option">
            <label htmlFor="tiendaSkins">Tienda de skins</label>
            <input 
                onClick={handleTiendaSkins}
                type="radio" 
                name="menu" 
                id="tiendaSkins"/>
        </div>
        </div>
    )
}

