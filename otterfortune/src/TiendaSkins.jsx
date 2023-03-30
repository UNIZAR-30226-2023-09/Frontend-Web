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
  
      // Muestra el log in cuando se pone a true (cuando se cierra sesion)
      if (showMenu) {
          // Llamar a menu y guardar el valor del email en 'email'
          // También se guarda en 'props.email' y se accede en menu
          return <Menu email={email} gemas={gemas}/>;
      }
  
    return (
    <div className="tienda-container">
      <button className="menu-sesion-button" 
                onClick={handleMenu}>Menú de inicio</button>
        <p> Tienda </p>

        <button
            className="email-container-button"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
        {email}
            {isHovered && (
                <span> <br/><br/>
                    Tienes {gemas} gemas</span>   
            )}
        </button>

        <div className="skins-container">
          {skins.map((skin) => (
            <div key={skin.id} className="skin">
              <img src={skin.image} alt={skin.name} className="spin"/>
              <h2>{skin.name}</h2>
              <h3>${skin.price}</h3>
              <a href={`/skin/${skin.id}`}>View Details</a>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  /*
          <div className="email-container">
            <p>{email}</p>
        </div>
        <div className="gemas-container">
                <p>Tienes {gemas} gemas</p>
        </div>
        */