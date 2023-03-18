import React, { useState } from "react";
import Login from "./Login";
import './CSS/Menu.css';
import nutria from './Imagenes/otter.png';
import Popup from './Popup';
import PopupCrear from "./PopupCrear";
import Loading from "./Loading";


export const Menu = (props) => {
    // Obtener el valor del email
    //const { email } = props.data;
    const { email } = props;
    const [showLogin, setShowLogin] = useState(false);
    // Para unirse
    const [isOpen, setIsOpen] = useState(false);
    // Para crear
    const [isOpenCreate, setIsOpenCreate] = useState(false);

    const [content, setContent] = useState("");
    const [id, setId] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    // Para guardar el ID introducido
    const handleIdChange = (newId) => {
      setId(newId); // Establecemos el nuevo id
    };

    //const handleOpen = () => setIsOpen(true);
    const handleClose = (id, loading) => {
        console.log(loading);
        setIsOpen(false);
        // Actualizamos el id introducido
        handleIdChange(id);
        // Actualizamos el valor de loading
        setLoading(loading);
        setShowLoading(loading);
        // console.log(id);
    }


    // Cuando se pulsa el botón de unirse a partida realizar lo necesario
    const handleUnirsePartida = (e) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        e.preventDefault();
        setIsOpen(true);
        setContent("Introduzca el ID de la partida");
        setId("");
        //window.alert('Torneo creado con ID: x.');

    };

    // Cuando se pulsa el botón de unirse torneo realizar lo necesario
    const handleUnirseTorneo = (e) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        e.preventDefault();
        setIsOpen(true);
        setContent("Introduzca el ID del torneo");
        setId("");
        //window.alert('Unirse torneo con ID: x.');
    };

    //const handleOpen = () => setIsOpen(true);
    const handleCloseCreate = () => {
        setIsOpenCreate(false);
        // Actualizamos el id introducido
        // console.log(id);
    }

    //console.log(email);   // una forma de acceder a email
    //console.log(props.email);   // otra forma a través de props
    
    // Cuando se pulsa el botón de crear partida realizar lo necesario
    const handleCrearPartida = (e) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        e.preventDefault(); // Para que no se abran dos ventanas alert
        setIsOpenCreate(true);
        setContent("la partida");
        //window.alert('Partida creada con ID: x.');
    };

    // Cuando se pulsa el botón de crear torneo realizar lo necesario
    const handleCrearTorneo = (e) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        e.preventDefault(); // Para que no se abran dos ventanas alert
        setIsOpenCreate(true);
        setContent("el torneo");
        //window.alert('Torneo creado con ID: x.');
    };


    // Cuando se pulsa el botón de tienda skins realizar lo necesario
    const handleTiendaSkins = (e) => {
        // TODO:
        // Aqui seria mandar al servidor y comprobar 
        e.preventDefault();
        window.alert('Tienda skins');
    };

    // Gestiona la ventana emergente 
    const popup = (
        // De esta forma, en popup, a través del props, se podrá acceder
        // a handleClose y a content
        // Se le puede pasar cualquier cosa
        <Popup handleClose={handleClose}
             content={content}/>
     );

     const popupCrear = (
        // De esta forma, en popup, a través del props, se podrá acceder
        // a handleClose y a content
        // Se le puede pasar cualquier cosa
        <PopupCrear handleCloseCreate={handleCloseCreate}
             content={content}/>
     );


    // Gestiona el boton de cerrar sesion
    const handleCerrarSesion = (e) => {
        setShowLogin(true);
    };

    // Muestra el log in cuando se pone a true (cuando se cierra sesion)
    if (showLogin) {
        // Llamar a menu y guardar el valor del email en 'email'
        // También se guarda en 'props.email' y se accede en menu
        return <Login />;
    }
    return (
        <>
        {loading ? (
          <Loading email={email}/>
        ) : (
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
            <div className="menu-option" onClick={handleCrearPartida}>
                <label htmlFor="crearPartida">Crear partida</label>
                <input 
                    
                    type="button" 
                    name="crearPartida" 
                    id="crearPartida"/>
            </div>
            {isOpenCreate && popupCrear}

            <div className="menu-option" onClick={handleUnirsePartida}>
                <label htmlFor="unirsePartida">Unirse a partida</label>
                <input 
                    type="button" 
                    name="menu" 
                    id="unirsePartida"/>
            </div>
            {isOpen && popup}

            <div className="menu-option" onClick={handleCrearTorneo}>
                <label htmlFor="crearTorneo">Crear torneo</label>
                <input  
                    type="button" 
                    name="menu" 
                    id="crearTorneo"/>
            </div>
            {isOpenCreate && popupCrear}

            <div className="menu-option" onClick={handleUnirseTorneo}>
                <label htmlFor="unirseTorneo">Unirse a torneo</label>
                <input 
                    type="button" 
                    name="menu" 
                    id="unirseTorneo"/>
            </div>
            {isOpen && popup}

            <div className="menu-option" onClick={handleTiendaSkins}>
                <label htmlFor="tiendaSkins">Tienda de skins</label>
                <input 
                    type="button" 
                    name="menu" 
                    id="tiendaSkins"/>
            </div>
        </div>
        )}
        </>
    );
}

export default Menu;
