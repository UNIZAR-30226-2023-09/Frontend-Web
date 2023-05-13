import React, { useState } from "react";
import './CSS/Clasificacion.css';

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from "./Menu";

import perfil from './Imagenes/perfil.png';
import gema from './Imagenes/gema.png';

import BAXTER from './Imagenes/BAXTER.png';
import BERTA from './Imagenes/BERTA.png';
import DIONIX from './Imagenes/DIONIX.png';
import JEANCARLO from './Imagenes/JEAN-CARLO.png';
import JULS from './Imagenes/JULS.png';
import LUCAS from './Imagenes/LUCAS.png';
import PLEX from './Imagenes/PLEX.png';
import TITE from './Imagenes/TITE.png';

import logo from './Imagenes/logo.png';


// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const Clasificacion = (props) => {
	//const [content, setContent] = useState("");
	const [id, setId] = useState(""); // Agregar esta línea
    const [showMenu, setShowMenu] = useState(false);

    // Para el perfil
    const [isHovered, setIsHovered] = useState(false);

    const email = sesion.email;
    const gemas = sesion.gemas;

	const socket = useSocket();

    function obtenerSkinDelJugadorEnPosicion(jugadorBuscado) {
        console.log("Jugador buscado: " + jugadorBuscado);

        const jugadorEncontrado = estadoPartida.Jugadores.find(
            (j) => j.email === jugadorBuscado
        );
        return jugadorEncontrado ? jugadorEncontrado.skin : null;
    }
      
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
            default:
                return BAXTER;
        }
    }    

    const clasificacionGeneral = [
        { posicion: estadoPartida.clasificacionTorneo[0].posicion, nombre: estadoPartida.clasificacionTorneo[0].email, puntos: 20, skin: obtenerSkinDelJugadorEnPosicion(estadoPartida.clasificacionTorneo[0].email) },
        { posicion: estadoPartida.clasificacionTorneo[1].posicion, nombre: estadoPartida.clasificacionTorneo[1].email, puntos: 15, skin: obtenerSkinDelJugadorEnPosicion(estadoPartida.clasificacionTorneo[1].email) },
        { posicion: estadoPartida.clasificacionTorneo[2].posicion, nombre: estadoPartida.clasificacionTorneo[2].email, puntos: 12, skin: obtenerSkinDelJugadorEnPosicion(estadoPartida.clasificacionTorneo[2].email) },
        { posicion: estadoPartida.clasificacionTorneo[3].posicion, nombre: estadoPartida.clasificacionTorneo[3].email, puntos: 10, skin: obtenerSkinDelJugadorEnPosicion(estadoPartida.clasificacionTorneo[3].email) },
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
        return <Menu email={sesion.email} gemas={sesion.gemas}/>;
    }
	
    return (
        <div className="fondoC">
            <header className="App-header">
                {estadoPartida.torneoFinalizado && (
                    <img src={logo} className="menu-sesion-button" onClick={handleMenu}/>
                )}
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
                            <th>Jugador</th>
                            <th>Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clasificacionGeneral.map((equipo, index) => (
                        <tr key={equipo.posicion}>
                            <td className="position">{equipo.posicion}</td>
                            <td className="name">
                                <div className="nombre-skin">
                                    <img src={obtenerImagen(equipo.skin)} className="skinC" />
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
