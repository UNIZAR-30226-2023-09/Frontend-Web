import React, { useState } from "react";
import './CSS/Popup.css';
import { Menu } from "./Menu";

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupGanador = (props) => {
    // Para ir al meno
    const [irMenu, setIrMenu] = useState(false);

    const socket = useSocket();
   // socketActions.finTurno(socket, sesion.email, estadoPartida.id_partida);

    const handleAccept = () => {
        setIrMenu(true);    // mostrar el menu de vuelta
        estadoPartida.Jugadores[estadoPartida.indiceYO].muerto = false;
    };  

    return (
        <>
            {irMenu ? <Menu email={sesion.email} gemas={sesion.gemas} /> 
            : ( 
                <div className="popup">
                    <div className="popup__content">
                        <div>
                            <label htmlFor="text" className="popup__label">
                                Has ganado la partida. Has ganado 5 gemas
                            </label>

                        </div>
                        <div className="buttons-container">
                            <div className="acept">
                                <button onClick={handleAccept}>Ir al menu</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PopupGanador;