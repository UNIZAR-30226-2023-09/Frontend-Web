import React, { useState } from "react";
import './CSS/Clasificacion.css';

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';

import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from "./Menu";

import perfil from './Imagenes/perfil.png';
import gema from './Imagenes/gema.png';

import tite from './Imagenes/TITE.png';
import plex from './Imagenes/PLEX.png';
import lucas from './Imagenes/LUCAS.png';
import jeancarlo from './Imagenes/JEAN-CARLO.png';
import logo from './Imagenes/logo.png';


// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const Clasificacion = (props) => {
	//const [content, setContent] = useState("");
	const [id, setId] = useState(""); // Agregar esta línea
    const [showMenu, setShowMenu] = useState(false);

    // Para el perfil
    const [isHovered, setIsHovered] = useState(false);

    const email = props.email;
    const gemas = props.gemas;

	console.log(props.content);

	const socket = useSocket();

    const clasificacionGeneral = [
        { posicion: 1, nombre: "Equipo 1", puntos: 20, skin: tite },
        { posicion: 2, nombre: "Equipo 2", puntos: 15, skin: plex },
        { posicion: 3, nombre: "Equipo 3", puntos: 12, skin: lucas },
        { posicion: 4, nombre: "Equipo 4", puntos: 10, skin: jeancarlo },
    ];

	const handleClose = () => {
		props.handleClose();
	};

    
    // Funciones para controlar el hover del correo electrónico
    const handleHover = () => {
        setIsHovered(true);
    };

    const handleLeave = () => {
        setIsHovered(false);
    };

    // Gestiona el boton de ir al menú
    const handleMenu = (e) => {
        setShowMenu(true);
    };

    // Muestra el log in cuando se pone a true (cuando se cierra sesion)
    if (showMenu) {
        // Llamar a menu y guardar el valor del email en 'email'
        // También se guarda en 'props.email' y se accede en menu
        return <Menu email={props.email} gemas={props.gemas}/>;
    }
	
    return (
        <div className="fondoC">
            <header className="App-header">
                <img src={logo} className="menu-sesion-button" onClick={handleMenu}/>
                <div className="titulo">
                    <p> Clasificación general </p>
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
            <div className="submenuC">
                <div className="table-container">
                    <table className="my-table">
                    <thead>
                        <tr>
                            <th>Posición</th>
                            <th>Nombre y Skin</th>
                            <th>Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clasificacionGeneral.map((equipo, index) => (
                        <tr key={equipo.posicion}>
                            <td className="position">{equipo.posicion}</td>
                            <td className="name">
                                <div className="nombre-skin">
                                    <img src={equipo.skin} className="skinC" />
                                    {equipo.nombre}
                                </div>

                            </td>
                            <td className="points">{equipo.puntos}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                <button>
                        Finalizar torneo
                </button>
                <button>
                        Iniciar partida
                </button>

            </div>
      </div>
      );
};

export default Clasificacion;
