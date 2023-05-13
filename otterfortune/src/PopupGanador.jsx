import React, { useState } from "react";
import './CSS/Popup.css';
import { Menu } from "./Menu";
import Clasificacion from "./Clasificacion";


import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupGanador = (props) => {
    // Para ir al meno
    const [irMenu, setIrMenu] = useState(false);

    // Para ir a la clasificacion
    const [irClasificacion, setIrClasificacion] = useState(false);

    const socket = useSocket();
    socketActions.finTurno(socket, sesion.email, estadoPartida.id_partida);

    const handleAccept = () => {
        setIrMenu(true);    // mostrar el menu de vuelta
        estadoPartida.Jugadores[estadoPartida.indiceYO].muerto = false;
        // Esperar 1 segundo antes de establecer el estado de irMenu en true
        // await socketActions.finTurno(socket, sesion.email, estadoPartida.id_partida);
        // estadoPartida.miTurno = false;

        //await sleep(300);

        if (estadoPartida.menuEsperaTorneo) {
            setIrClasificacion(true);
            setIrMenu(false);
        }
        else {
            setIrMenu(true);    // mostrar el menu de vuelta
            setIrClasificacion(false);
        }
        console.log("Valor de: " + estadoPartida.menuEsperaTorneo);
        
    };  
    
    return (
        <>
            {irMenu ? <Menu email={sesion.email} gemas={sesion.gemas + 5} /> 
            : irClasificacion ? <Clasificacion/> : (

                <div className="popup">
                    <div className="popup__content">
                        {!estadoPartida.menuEsperaTorneo && (
                            <div>
                                <label htmlFor="text" className="popup__label">
                                    Has ganado la partida. Has ganado 5 gemas.
                                </label>
                            </div>
                        )}

                        {estadoPartida.menuEsperaTorneo && (
                            <div>
                                <label htmlFor="text" className="popup__label">
                                    Has ganado la partida. Eres el mejor.
                                </label>
                            </div>
                        )}

                        <div className="buttons-container">
                            <div className="acept">
                                <button onClick={handleAccept}>{estadoPartida.menuEsperaTorneo ? "Clasificación" : "Ir al menu"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PopupGanador;