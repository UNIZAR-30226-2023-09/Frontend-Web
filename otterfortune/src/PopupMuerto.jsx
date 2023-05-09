import React, { useState } from "react";
import './CSS/Popup.css';
import { Menu } from "./Menu";

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupMuerto = (props) => {
    // Para ir al meno
    const [irMenu, setIrMenu] = useState(false);

    const socket = useSocket();

    // Dormirme 1ms
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }


    const handleAccept = async () => {
        // Esperar 1 segundo antes de establecer el estado de irMenu en true
        await socketActions.finTurno(socket, sesion.email, estadoPartida.id_partida);
        estadoPartida.miTurno = false;

        await sleep(300);
        setIrMenu(true);    // mostrar el menu de vuelta
        estadoPartida.Jugadores[estadoPartida.indiceYO].muerto = false;
        console.log("Las gemas son en muerto: " + sesion.gemas);
      };  
      

    // Funcion que dada una posicion devuelva el numero de gemas ganadas, 5-3-2-1
    const gemasGanadas = (posicion) => {
        if (posicion === 1) {
            return 5;
        }
        else if (posicion === 2) {
            return 3;
        }
        else if (posicion === 3) {
            return 2;
        }
        else {
            return 1;
        }
    }
    

    return (
        <>
            {irMenu ? <Menu gemas={sesion.gemas+gemasGanadas(estadoPartida.hasQuedadoPosicion)}/> 
            : ( 
                <div className="popup">
                    <div className="popup__content">
                        <div>
                            <label htmlFor="text" className="popup__label">
                                Te has quedado sin dinero y estás eliminado de la partida. ¡¡Has ganado {gemasGanadas(estadoPartida.hasQuedadoPosicion)}{" "}
                                {gemasGanadas(estadoPartida.hasQuedadoPosicion) === 1 ? "gema!!" : "gemas!!"}
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

export default PopupMuerto;