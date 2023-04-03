import React, { useState, useRef } from "react";
import './CSS/TiendaSkins.css';
import nutria from './Imagenes/otter.png';
import Menu from "./Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import perfil from './Imagenes/perfil.png';
import gema from './Imagenes/gema.png';


export const TiendaSkins = (props) => {
    const email = props.email;
    const gemas = props.gemas;
    const audioRef = useRef();

    const [showMenu, setShowMenu] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // TODO: Aquí iria el mensaje de obtener las skins con su precio
    const nombreSkin = ["Skin 1","Skin 2","Skin 3","Skin 4","Skin 5","Skin 6","Skin 7","Skin 8"];
    const precio = [1,2,3,4,5,6,7,8];

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

    // Función para manejar la compra de skins
    const handleBuy = (skinId) => {
        alert(`Ha comprado la piel con el ID: ${skinId}`);
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
        <div className="prueba">
            <header className="App-header">
                <button className="menu-sesion-button" 
                        onClick={handleMenu}>Menú de inicio</button>
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

            <div className="col-6 col-md-2 col-lg-3">
            <div className="skin">
            <img src={nutria} alt="Skin 1" className="spin img-fluid"/>
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
                <img src={nutria} alt="Skin 2" className="spin img-fluid" />
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
        </div>
        </div>
    );
  }
  
  /*
            <div className="email-container">
                <p>{email}</p>
            </div>
            <div className="gemas-container">
                <p><br></br>{gemas} gemas</p>
            </div>
        */

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