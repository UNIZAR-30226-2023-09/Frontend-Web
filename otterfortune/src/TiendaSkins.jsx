import React, { useState, useRef } from "react";
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
 

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

export const TiendaSkins = (props) => {
    const email = props.email;
    const gemas = sesion.gemas;

    const socket = useSocket();

    const [showMenu, setShowMenu] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


    // TODO: Aquí iria el mensaje de obtener las skins con su precio
    const skins = [
        {
            nombre: "PLEX",
            imagen: PLEX,
            precio: 10,
        },
        {
            nombre: "JULS",
            imagen: JULS,
            precio: 7,
        },
        {
            nombre: "JEANCARLO",
            imagen: JEANCARLO,
            precio: 20,
        },
        {
            nombre: "TITE",
            imagen: TITE,
            precio: 50,
        },
        {
            nombre: "DIONIX",
            imagen: DIONIX,
            precio: 3,
        },
        {
            nombre: "BERTA",
            imagen: BERTA,
            precio: 2,
        },
        {
            nombre: "LUCAS",
            imagen: LUCAS,
            precio: 40,
        },
        {
            nombre: "BAXTER",
            imagen: BAXTER,
            precio: 1,
        }
    ];

      

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

    // Función para manejar la compra de skins
    const handleBuy = async (skinId) => {
        let skinComprar = getSkinName(skinId);
        let resultado = await socketActions.comprarSkin(socket, email, skinComprar);
        if (resultado === true) {
            alert("Skin " + skinComprar + " comprada correctamente");
        } else {
            alert("No tienes gemas suficientes para comprar " + skinComprar);
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
            {skins.map((skin, index) => (
            <div className="col-6 col-md-2 col-lg-3" key={index}>
            <div className="skin">
                <img src={skin.imagen} alt={skin.nombre} className="spin img-fluid"/>
                    <h2>{skin.nombre}</h2>
                <div className="skin-price">
                    <h3>{skin.precio}</h3><img src={gema} alt="Gemas" className="gema-skin" />
                </div>
                <button className="comprar-option" onClick={() => handleBuy(index)}>
                    COMPRAR
                </button>
            </div>
            </div>
        ))}
           
        </div>
        </div>
    );
  }
  

/*
            <button
                className="email-container-button"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}>
                {email}
                {isHovered && (
                    <span> <br/><br/>
                        Tienes {gemas} gemas</span>   
                )}
            </button>
*/

/*
            <img src={nutria} alt="Skin 1" className="spin nutria-imagen" onMouseOver={handleAudio} onMouseLeave={handleLeave} />
                <audio 
                        ref={audioRef} 
                        src={hoverSound} 
                        onCanPlayThrough={() => {
                            if (isPlaying) {
                                audioRef.current.play();
                            }
                      }}>
                </audio>
*/

/*
 <div className="col-6 col-md-2 col-lg-3">
            <div className="skin">
            <img src={plex} alt="Skin 1" className="spin img-fluid"/>
                <h2>{nombreSkin[0]}</h2>
                <div className="skin-price">
                    <h3>{precio[0]}</h3><img src={gema} alt="Gemas" className="gema-skin" />
                </div>
                <button className="comprar-option" onClick={() => handleBuy(1)}>
                COMPRAR
                </button>
            </div>
            </div>

            <div className="col-6 col-md-2 col-lg-3">
            <div className="skin">
                <img src={baxter} alt="Skin 2" className="spin img-fluid" />
                <h2>{nombreSkin[1]}</h2>
                <div className="skin-price">
                    <h3>{precio[1]}</h3><img src={gema} alt="Gemas" className="gema-skin" />
                </div>
                <button className="comprar-option" onClick={() => handleBuy(2)}>
                COMPRAR
                </button>
            </div>
            </div>

            <div className="col-6 col-md-2 col-lg-3">
            <div className="skin">
                <img src={nutria} alt="Skin 3" className="spin img-fluid" />
                <h2>{nombreSkin[2]}</h2>
                <div className="skin-price">
                    <h3>{precio[2]}</h3><img src={gema} alt="Gemas" className="gema-skin" />
                </div>
                <button className="comprar-option" onClick={() => handleBuy(3)}>
                COMPRAR
                </button>
            </div>
            </div>

            <div className="col-6 col-md-2 col-lg-3">
            <div className="skin">
                <img src={nutria} alt="Skin 4" className="spin img-fluid" />
                <h2>{nombreSkin[3]}</h2>
                <div className="skin-price">
                    <h3>{precio[3]}</h3><img src={gema} alt="Gemas" className="gema-skin" />
                </div>
                <button className="comprar-option" onClick={() => handleBuy(4)}>
                COMPRAR
                </button>
            </div>
            </div>

            <div className="col-6 col-md-2 col-lg-3">
            <div className="skin">
                <img src={nutria} alt="Skin 5" className="spin img-fluid" />
                <h2>{nombreSkin[4]}</h2>
                <div className="skin-price">
                    <h3>{precio[4]}</h3><img src={gema} alt="Gemas" className="gema-skin" />
                </div>
                <button className="comprar-option" onClick={() => handleBuy(5)}>
                COMPRAR
                </button>
            </div>
            </div>

            <div className="col-6 col-md-2 col-lg-3">
            <div className="skin">
                <img src={nutria} alt="Skin 6" className="spin img-fluid" />
                <h2>{nombreSkin[5]}</h2>
                <div className="skin-price">
                    <h3>{precio[5]}</h3><img src={gema} alt="Gemas" className="gema-skin" />
                </div>
                <button className="comprar-option" onClick={() => handleBuy(6)}>
                COMPRAR
                </button>
            </div>
            </div>

            <div className="col-6 col-md-2 col-lg-3">
            <div className="skin">
                <img src={nutria} alt="Skin 7" className="spin img-fluid" />
                <h2>{nombreSkin[6]}</h2>
                <div className="skin-price">
                    <h3>{precio[6]}</h3><img src={gema} alt="Gemas" className="gema-skin" />
                </div>
                <button className="comprar-option" onClick={() => handleBuy(1)}>
                COMPRAR
                </button>
            </div>
            </div>

            <div className="col-6 col-md-2 col-lg-3">
            <div className="skin">
                <img src={nutria} alt="Skin 8" className="spin img-fluid" />
                <h2>{nombreSkin[7]}</h2>
                <div className="skin-price">
                    <h3>{precio[7]}</h3><img src={gema} alt="Gemas" className="gema-skin" />
                </div>
                <button className="comprar-option" onClick={() => handleBuy(1)}>
                COMPRAR
                </button>
            </div>
            </div>
*/