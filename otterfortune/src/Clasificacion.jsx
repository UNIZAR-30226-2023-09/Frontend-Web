import React, { useState, useEffect } from "react";
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
    const [clasificacionGeneral, setClasificacionGeneral] = useState([]);

    const actualizarClasificacion = () => {
        const nuevaClasificacion = [
            { posicion: 1, nombre: estadoPartida.Jugadores[0].email, puntos: estadoPartida.clasificacionTorneo.get(estadoPartida.Jugadores[0].email), skin: obtenerSkinDelJugadorEnPosicion(estadoPartida.Jugadores[0].email) },
            { posicion: 2, nombre: estadoPartida.Jugadores[1].email, puntos: estadoPartida.clasificacionTorneo.get(estadoPartida.Jugadores[1].email), skin: obtenerSkinDelJugadorEnPosicion(estadoPartida.Jugadores[1].email) },
            { posicion: 3, nombre: estadoPartida.Jugadores[2].email, puntos: estadoPartida.clasificacionTorneo.get(estadoPartida.Jugadores[2].email), skin: obtenerSkinDelJugadorEnPosicion(estadoPartida.Jugadores[2].email) },
            { posicion: 4, nombre: estadoPartida.Jugadores[3].email, puntos: estadoPartida.clasificacionTorneo.get(estadoPartida.Jugadores[3].email), skin: obtenerSkinDelJugadorEnPosicion(estadoPartida.Jugadores[3].email) },        
        ];

        // Ordenar el vector por puntos
        nuevaClasificacion.sort((a, b) => a.puntos - b.puntos);

        // Asignar el orden correspondiente a la posición
        nuevaClasificacion.forEach((item, index) => {
            item.posicion = index + 1;
        });

        setClasificacionGeneral(nuevaClasificacion);
    };

    useEffect(() => {
        actualizarClasificacion();
        const intervalId = setInterval(() => {
            actualizarClasificacion();
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [estadoPartida]);

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

    // Para iniciar la partida cuando todos los jugadores estén listos
    const handleIniciarPartida = async () => {
        await socketActions.empezarTorneo(socket, estadoPartida.id_torneo, sesion.email);
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
                {estadoPartida.liderTorneo && (
                    <div>
                        <button onClick={handleIniciarPartida}>
                                Iniciar partida
                        </button>
                    </div>
                )}


            </div>
      </div>
      );
};

export default Clasificacion;
