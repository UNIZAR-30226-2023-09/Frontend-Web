import React, { useState } from "react";
import './CSS/TiendaSkins.css';
import nutria from './Imagenes/otter.png';
import Menu from "./Menu";

export const TiendaSkins = (props) => {
    const email = props.email;
    const gemas = props.gemas;

    const [showMenu, setShowMenu] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const skins = [
      {
        id: 1,
        name: "Skin 1",
        price: 10,
        image: nutria,
        description: "This is skin 1."
      },
      {
        id: 2,
        name: "Skin 2",
        price: 20,
        image: nutria,
        description: "This is skin 2."
      },
      {
        id: 3,
        name: "Skin 3",
        price: 30,
        image: nutria,
        description: "This is skin 3."
      },
      {
        id: 4,
        name: "Skin 3",
        price: 30,
        image: nutria,
        description: "This is skin 3."
      },
      {
        id: 5,
        name: "Skin 3",
        price: 30,
        image: nutria,
        description: "This is skin 3."
      },
      {
        id: 6,
        name: "Skin 3",
        price: 30,
        image: nutria,
        description: "This is skin 3."
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
      };

      // Función para manejar la compra de skins
      const handleBuy = (skinId) => {
          alert(`Ha comprado la piel con el ID: ${skinId}`);
      };
  
      // Muestra el log in cuando se pone a true (cuando se cierra sesion)
      if (showMenu) {
          // Llamar a menu y guardar el valor del email en 'email'
          // También se guarda en 'props.email' y se accede en menu
          return <Menu email={email} gemas={gemas}/>;
      }
  
    return (
    <div className="tienda-container">
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
                {email}
                {isHovered && (
                    <span> <br/><br/>
                        Tienes {gemas} gemas</span>   
                )}
            </button>
        </header>
        <div className="skins-container">
            <div className="skin">
                <img src={nutria} alt="Skin 1" className="spin"/>
                <h2>Skin 1</h2>
                <h3>$10</h3>
                <button className="comprar-option" onClick={() => handleBuy(1)}>COMPRAR</button>
            </div>
            <div className="skin">
                <img src={nutria} alt="Skin 2" className="spin"/>
                <h2>Skin 2</h2>
                <h3>$20</h3>
                <button className="comprar-option" onClick={() => handleBuy(2)}>COMPRAR</button>
            </div>
            <div className="skin">
                <img src={nutria} alt="Skin 3" className="spin"/>
                <h2>Skin 3</h2>
                <h3>$30</h3>
                <button className="comprar-option" onClick={() => handleBuy(3)}>COMPRAR</button>
            </div>
            <div className="skin">
                <img src={nutria} alt="Skin 4" className="spin"/>
                <h2>Skin 4</h2>
                <h3>$30</h3>
                <button className="comprar-option" onClick={() => handleBuy(4)}>COMPRAR</button>
            </div>
            <div className="skin">
                <img src={nutria} alt="Skin 5" className="spin"/>
                <h2>Skin 5</h2>
                <h3>$30</h3>
                <button className="comprar-option" onClick={() => handleBuy(5)}>COMPRAR</button>
            </div>
            <div className="skin">
                <img src={nutria} alt="Skin 6" className="spin"/>
                <h2>Skin 6</h2>
                <h3>$30</h3>
                <button className="comprar-option" onClick={() => handleBuy(6)}>COMPRAR</button>
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