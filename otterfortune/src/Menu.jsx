import React, { useState, useRef } from "react";
import Login from "./Login";
import './CSS/Menu.css';
import nutria from './Imagenes/otter.png';
import PopupPartida from './PopupPartida';
import PopupTorneo from './PopupTorneo';

import PopupCrearPartida from "./PopupCrearPartida";
import PopupCrearTorneo from "./PopupCrearTorneo";
import Tablero from "./Tablero";
import Clasificacion from "./Clasificacion";
import PopupEmpezarTorneo from "./PopupEmpezarTorneo";

import Loading from "./Loading";
import PopupEmpezar from "./PopupEmpezar";
import { TiendaSkins } from "./TiendaSkins";
import perfil from './Imagenes/perfil.png';
import logout from './Imagenes/logout.png';
import gema from './Imagenes/gema.png';

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

import { mostrarAlertaMENU } from './alertas.jsx';

export const Menu = (props) => {
    // Obtener el valor del email
    //const { email } = props;
    const email = sesion.email;
    const gemas = props.gemas;

    const [showLogin, setShowLogin] = useState(false);
    // Para unirse y crear partida
    const [isOpenPartida, setIsOpenPartida] = useState(false);
    const [isOpenCreatePartida, setIsOpenCreatePartida] = useState(false);

    // Para unirse y crear torneo
    const [isOpenTorneo, setIsOpenTorneo] = useState(false);
    const [isOpenCreateTorneo, setIsOpenCreateTorneo] = useState(false);

    // Para guardar el ID 
    const [id, setId] = useState("");

    // Para mostrar la pantalla de cargando
    const [loading, setLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    // Para la pantalla de empezar partida
    const [empPartida, setEmpPartida] = useState(false);
    const [idPartida, setIdPartida] = useState(0);

    // Para la pantalla de empezar torneo
    const [empTorneo, setEmpTorneo] = useState(false);
    const [idTorneo, setIdTorneo] = useState(0);
    
    // Para la pantalla de tienda de skins
    const [tiendaSkin, setTiendaSkin] = useState(false);

    // Para el perfil
    const [isHovered, setIsHovered] = useState(false);

    // Para ir al tablero
    const [irTablero, setIrTablero] = useState(false);

    const socket = useSocket();


    // Para guardar el ID introducido
    const handleIdChange = (newId) => {
        setId(newId); // Establecemos el nuevo id
    };

    // Para guardar el ID introducido
    const handleIdChangeTorneo = (newId) => {
        setIdTorneo(newId); // Establecemos el nuevo id
    };

    const handleVerificarUnirsePartida = async (id, loading) => {
        setIsOpenPartida(false);
        // Actualizamos el id introducido
        handleIdChange(id);
        // Actualizamos el valor de loading
        const resultado = await socketActions.unirsePartida(socket, sesion.email, id);
        console.log("El resultado de unirse a la partida es: " + resultado);
        if (resultado) {
            setLoading(true);
            setShowLoading(true);
        }
        else {
            console.log("AQUIII2");
            setLoading(false);
            setShowLoading(false);
            //window.alert("No existe la partida con ese ID");
            mostrarAlertaMENU("errorIdPartida", "errorIdPartida");
        }
    }

    const handleVerificarUnirseTorneo = async (id, loading) => {
        setIsOpenTorneo(false);
        // Actualizamos el id introducido
        handleIdChangeTorneo(id);
        // Actualizamos el valor de loading
        const resultado = await socketActions.unirseTorneo(socket, sesion.email, id);
        console.log("El resultado de unirse al torneo es: " + resultado);
        if (resultado) {
            setLoading(true);
            setShowLoading(true);
        }
        else {
            setLoading(false);
            setShowLoading(false);
            mostrarAlertaMENU("errorIdPartida", "errorIdPartida");
        }
    }

    //const handleOpen = () => setIsOpen(true);
    const handleClose = (e) => {
        setIsOpenPartida(false);
        setIsOpenTorneo(false);
        setIsOpenCreatePartida(false);
        setIsOpenCreateTorneo(false);
    }

    // Cuando se pulsa el botón de unirse a partida realizar lo necesario
    const handleUnirsePartida = (e) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        e.preventDefault();
        setIsOpenPartida(true);
        setId("");
        //window.alert('Torneo creado con ID: x.');

    };

    // Cuando se pulsa el botón de unirse torneo realizar lo necesario
    const handleUnirseTorneo = (e) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        e.preventDefault();
        setIsOpenTorneo(true);
        setId("");
        //window.alert('Unirse torneo con ID: x.');
    };

    //const handleOpen = () => setIsOpen(true);
    const handleCloseCreatePartida = (id, empezarP) => {
        setEmpPartida(empezarP);
        setIsOpenCreatePartida(false);
        // Actualizamos el id introducido
        setIdPartida(id);
    }

    const handleCloseCreateTorneo = (id, empezarT) => {
        setEmpTorneo(empezarT);
        setIsOpenCreateTorneo(false);
        // Actualizamos el id introducido
        setIdTorneo(id);
    }

    //console.log(email);   // una forma de acceder a email
    //console.log(props.email);   // otra forma a través de props

    // Cuando se pulsa el botón de crear partida realizar lo necesario
    const handleCrearPartida = (e) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        e.preventDefault(); // Para que no se abran dos ventanas alert
        setIsOpenCreatePartida(true);
        //window.alert('Partida creada con ID: x.');
    };

    // Cuando se pulsa el botón de crear torneo realizar lo necesario
    const handleCrearTorneo = (e) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        e.preventDefault(); // Para que no se abran dos ventanas alert
        setIsOpenCreateTorneo(true);
        //window.alert('Torneo creado con ID: x.');
    };


    // Cuando se pulsa el botón de tienda skins realizar lo necesario
    const handleTiendaSkins = async (e) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        e.preventDefault();
        await socketActions.verSkins(socket, sesion.email);
        setTiendaSkin(true);
    };

    const handleIrTablero = (id) => {
        setIsOpenCreatePartida(false);
        // Actualizamos el id introducido
        setIdPartida(id);
        setIrTablero(true);
    }


    // Gestiona la ventana emergente 
    const popupPartida = (
        // De esta forma, en popup, a través del props, se podrá acceder
        // a handleClose y a content
        // Se le puede pasar cualquier cosa
        <PopupPartida handleClose={handleClose}
            handleVerificarUnirsePartida={handleVerificarUnirsePartida} 
            email={email} gemas={gemas}/>
    );

    // Gestiona la ventana emergente 
    const popupTorneo = (
        // De esta forma, en popup, a través del props, se podrá acceder
        // a handleClose y a content
        // Se le puede pasar cualquier cosa
        <PopupTorneo handleClose={handleClose}
            handleVerificarUnirseTorneo={handleVerificarUnirseTorneo}
            email={email} gemas={gemas} />
    );

    const popupCrearPartida = (
        // De esta forma, en popup, a través del props, se podrá acceder
        // a handleClose y a content
        // Se le puede pasar cualquier cosa
        <PopupCrearPartida handleCloseCreate={handleCloseCreatePartida}
            handleClose={handleClose}  email={email} gemas={gemas} />
    );

    const popupCrearTorneo = (
        <PopupCrearTorneo handleCloseCreate={handleCloseCreateTorneo}
            handleClose={handleClose}  email={email} gemas={gemas} />
    )

    const popupEmpezar = (
        <PopupEmpezar handleCloseCreate={handleIrTablero} id={idPartida} 
            email={email} gemas={gemas}/>
    );

    const popupEmpezarTorneo = (
        <PopupEmpezarTorneo handleCloseCreate={handleIrTablero} id={idTorneo}
            email={email} gemas={gemas} />
    );


    // Gestiona el boton de cerrar sesion
    const handleCerrarSesion = (e) => {
        setShowLogin(true);
    };

    // Funciones para controlar el hover del correo electrónico
    const handleHover = () => {
        setIsHovered(true);
    };

    const handleLeave = () => {
        setIsHovered(false);
    };

    // Muestra el log in cuando se pone a true (cuando se cierra sesion)
    if (showLogin) {
        // Llamar a menu y guardar el valor del email en 'email'
        // También se guarda en 'props.email' y se accede en menu
        return <Login />;
    }

    // if (tiendaSkin) {
    //     return <TiendaSkins email={email} gemas={gemas} />;
    // }

    /*
        empPartida ? (
            <EmpezarPartida email={email}/>
        ) : 
    */
    return (
        <>
            {loading ? (
                        <Loading email={email} gemas={gemas} />
                    ) 
                    : irTablero ? <Tablero email={email} gemas={gemas}/>
                    : tiendaSkin ? <TiendaSkins email={email} gemas={gemas}/>
                    // : empTorneo ? <Clasificacion email={email} gemas={gemas}/> 
                    : (

                <div className="menu-container">
                    <header className="App-header">
                        <button className="menu-sesion-button2" onClick={handleCerrarSesion}>
                            <img src={logout} alt="Cerrar sesión" className="logo-logout" />
                        </button>
                        <div className="titulo">
                            <p>Bienvenido a OtterFortune </p>
                        </div>
                        <button
                            className="email-container-button2"
                            onMouseEnter={handleHover}
                            onMouseLeave={handleLeave}>
                            <img src={perfil} className="logo-perfil" />
                            {isHovered && (
                                <span>
                                    <br />{email}<br />
                                    <div className="gemas-mail">
                                        <h3>{gemas}</h3><img src={gema} alt="Gemas" className="gema-mail-img" />
                                    </div>
                                </span>
                            )}
                        </button>
                    </header>

                    <div className="submenu">
                        <div className="login-image image-container">
                            <img
                                src={nutria} alt="Login" className="login-image" />
                        </div>

                        <div className="menu-option" onClick={handleCrearPartida}>
                            <label htmlFor="crearPartida">Crear partida</label>
                            <input

                                type="button"
                                name="crearPartida"
                                id="crearPartida" />
                        </div>
                        {isOpenCreatePartida && popupCrearPartida}
                        {empPartida && popupEmpezar}

                        <div className="menu-option" onClick={handleUnirsePartida}>
                            <label htmlFor="unirsePartida">Unirse a partida</label>
                            <input
                                type="button"
                                name="menu"
                                id="unirsePartida" />
                        </div>
                        {isOpenPartida && popupPartida}

                        <div className="menu-option" onClick={handleCrearTorneo}>
                            <label htmlFor="crearTorneo">Crear torneo</label>
                            <input
                                type="button"
                                name="menu"
                                id="crearTorneo" />
                        </div>
                        {isOpenCreateTorneo && popupCrearTorneo}
                        {empTorneo && popupEmpezarTorneo}

                        <div className="menu-option" onClick={handleUnirseTorneo}>
                            <label htmlFor="unirseTorneo">Unirse a torneo</label>
                            <input
                                type="button"
                                name="menu"
                                id="unirseTorneo" />
                        </div>
                        {isOpenTorneo && popupTorneo}

                        <div className="menu-option" onClick={handleTiendaSkins}>
                            <label htmlFor="tiendaSkins">Tienda de skins</label>
                            <input
                                type="button"
                                name="menu"
                                id="tiendaSkins" />
                        </div>
                        {tiendaSkin}
                    </div>
                </div>
            )}
        </>
    );
}

export default Menu;

/*
            <button className="cerrar-sesion-button" 
                    onClick={handleCerrarSesion}>Cerrar sesión</button>
*/