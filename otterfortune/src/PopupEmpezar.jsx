import React, { useState } from "react";
import './CSS/EmpezarPartida.css';

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupEmpezar = (props) => {
    //const [content, setContent] = useState("");

    const socket = useSocket();

    const handleAccept = () => {
        // TODO: mirar como hacer esto para ir al tablero del monopoly

        // TODO: SI DA ERROR ESTO ES POR AWAIT ASYNC
        socketActions.empezarPartida(socket, estadoPartida.id_partida, sesion.email)

        props.handleCloseCreate();
    };

    return (
        <div className="popupE">
            <div className="popup__contentE">
                <div>
                    <p className="popup__labelE">Partida creada correctamente con ID: {props.id}</p>
                </div>
                <div className="buttons-containerE">
                    <div className="aceptE">
                        <button onClick={handleAccept}>Empezar Partida</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupEmpezar;
