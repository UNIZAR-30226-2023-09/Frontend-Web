import React, { useState, useEffect } from "react";
import './CSS/TiendaSkins.css';
import nutria from './Imagenes/otter.png';
import Menu from "./Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import perfil from './Imagenes/perfil.png';
import gema from './Imagenes/gema.png';
import logo from './Imagenes/logo.png';

import BAXTER from './Imagenes/BAXTER.png';
import BERTA from './Imagenes/BERTA.png';
import DIONIX from './Imagenes/DIONIX.png';
import JEANCARLO from './Imagenes/JEAN-CARLO.png';
import JULS from './Imagenes/JULS.png';
import LUCAS from './Imagenes/LUCAS.png';
import PLEX from './Imagenes/PLEX.png';
import TITE from './Imagenes/TITE.png';

// Importar los tableros
import TABLERO1 from './Imagenes/TABLEROS/WEB1.png';
import TABLERO2 from './Imagenes/TABLEROS/WEB2.png';
import TABLERO3 from './Imagenes/TABLEROS/WEB3.png';
import TABLERO4 from './Imagenes/TABLEROS/WEB4.png';
 

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

import { mostrarAlertaMENU } from './alertas.jsx';
import { mostrarAlertaSkins } from './alertas.jsx';

export const TiendaSkins = (props) => {
    const email = sesion.email;
    const gemas = sesion.gemas;

    const socket = useSocket();

    const [showMenu, setShowMenu] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Funcion que dado el nombre de una skin devuelva su imagen
    const obtenerImagen = (nombre) => {
        switch (nombre) {
            case "PLEX":
                return PLEX;
            case "JULS":
                return JULS;
            case "JEANCARLO":
                return JEANCARLO;
            case "TITE":
                return TITE;
            case "DIONIX":
                return DIONIX;
            case "BERTA":
                return BERTA;
            case "LUCAS":
                return LUCAS;
            case "BAXTER":
                return BAXTER;
            case "TABLERO1":
                return TABLERO1;
            case "TABLERO2":
                return TABLERO2;
            case "TABLERO3":
                return TABLERO3;
            case "TABLERO4":
                return TABLERO4;
            default:
                return BAXTER;
        }
    }    

    // TODO: Aquí iria el mensaje de obtener las skins con su precio
    const skins = [];

    for (let i = 0; i < sesion.todasSkins.length; i++) {
        skins.push({
            nombre: sesion.todasSkins[i].nombre,
            precio: sesion.todasSkins[i].precio,
            imagen: obtenerImagen(sesion.todasSkins[i].nombre),
            // Si el precio es 0, pertenece ponerlo a true, sino a false
            pertenece: sesion.todasSkins[i].precio === 0 ? true : false,
        });
    }

    // Gestiona el boton de ir al menú
    const handleMenu = (e) => {
        setShowMenu(true);
    };

    // Funciones para controlar el hover del correo electrónico
    const handleHover = () => {
        setIsHovered(true);
    };

    const handleLeave = () => {
        setIsHovered(false);
       // audioRef.current.pause();
    };

    // Función que dado un índice de la skin devuelva el nombre de esta en el vector 
    const getSkinName = (index) => {
        return skins[index].nombre;
    };

    const [skinList, setSkinList] = useState(skins);

    // Función para manejar la compra de skins
    const handleBuy = async (skinId) => {
        let skinComprar = getSkinName(skinId);
        // Comprobar si skin[skinId].pertenece es true o false
        // Si es true, se equipa
        // Si es false, se puede comprar
        if (skinList[skinId].pertenece === true) {
            handleEquip(skinId);
        } else {
            let resultado = await socketActions.comprarSkin(socket, email, skinComprar);
            if (resultado === true) {
                const newSkinList = [...skinList];
                newSkinList[skinId].pertenece = true;
                newSkinList[skinId].precio = 0;
                setSkinList(newSkinList);
                //window.alert("Skin " + skinComprar + " comprada correctamente");
                mostrarAlertaSkins("comprar","Skin " + skinComprar + " comprada correctamente");
            } else {
                //window.alert("No tienes gemas suficientes para comprar " + skinComprar);
                mostrarAlertaMENU("errorGemasTienda", "No tienes gemas suficientes para comprar " + skinComprar);
            }
        }
    };

    // Función para manejar equipar una skin
    const handleEquip = async (skinId) => {
        let skinEquipar = getSkinName(skinId);
        let resultado = await socketActions.equiparSkin(socket, email, skinEquipar);
        if (resultado === true) {
            //window.alert("Skin " + skinEquipar + " equipada correctamente");
            mostrarAlertaSkins("equipar","Skin " + skinEquipar + " equipada correctamente");
        } else {
            //window.alert("No tienes la skin " + skinEquipar + " comprada");
            mostrarAlertaMENU("errorSkinTienda", "No tienes la skin " + skinEquipar + " comprada");
        }
    };


    /*const handleAudio = () => {
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
    }*/

    // Muestra el log in cuando se pone a true (cuando se cierra sesion)
    if (showMenu) {
        // Llamar a menu y guardar el valor del email en 'email'
        // También se guarda en 'props.email' y se accede en menu
        return <Menu email={email} gemas={gemas}/>;
    }
  
    return (
        <div className="cabecera">
            <header className="App-header">
                <img src={logo} className="menu-sesion-button" onClick={handleMenu}/>
                <div className="titulo">
                    <p> Tienda </p>
                </div>
                <button
                    className="email-container-button"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleLeave}>
                    <img src={perfil}  className="logo-perfil" />
                    {isHovered && (
                        <span> 
                            <br/>{email}<br/>
                            <div className="gemas-mail">
                                <h3>{gemas}</h3><img src={gema} alt="Gemas" className="gema-mail-img" />
                            </div>
                        </span>   
                    )}
                </button>
            </header>
        <div className="row">
            {skinList.map((skin, index) => (
            <div className="col-6 col-md-2 col-lg-3" key={index}>
            <div className="skin">
                <img src={skin.imagen} alt={skin.nombre} className="spin img-fluid"/>
                    <h2>{skin.nombre}</h2>

                        
                            {skin.pertenece ? (
                                <div className="skin-price">
                                    <h3> 
                                        <br/>
                                    </h3>
                                </div> 
                            ) : (
                                <div className="skin-price">
                                    <h3>{skin.precio}</h3><img src={gema} alt="Gemas" className="gema-skin" />
                                </div>
                            )}
                        
                        <button className="comprar-option" onClick={() => {handleBuy(index)}}>
                            {skin.pertenece ? "EQUIPAR" : "COMPRAR"}
                        </button>

            </div>
            </div>
        ))}
           
        </div>
        </div>
    );
}
