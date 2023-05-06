import React, { useState } from "react";
import './CSS/Popup.css';

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

import { mostrarAlertaRetirar } from './alertas.jsx';
import { errorRetirar } from './alertas.jsx';

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupRetirar = (props) => {
    //const [content, setContent] = useState("");
    const [cantidad, setCantidad] = useState("");
    const socket = useSocket();

    const handleAccept = async () => {
        if (cantidad.trim() === '') {
            //window.alert('Por favor, ingrese la cantidad.');
            mostrarAlertaRetirar("ingresarCantidad");
        }
        // Si la cantidad es superior a mi dinero actual en el banco
        else if (cantidad > estadoPartida.dineroEnBanco || cantidad <= 0) {
            //window.alert('No puede retirar más dinero del que tiene.');
            errorRetirar("cantidadMal");
        }
        else {
            //props.handleClose(id, load);
            let resultado = await socketActions.sacarBanco(socket, sesion.email, estadoPartida.id_partida, cantidad);
            if (resultado === true) {
                props.handleCloseP(1);
            }
            else {
                props.handleCloseP(0);
            }
        }
    };

    return (
        <div className="popup">
            <div className="popup__content">
                <button className="popup__close" onClick={props.handleCloseP}>X</button>
                <div>
                    <label htmlFor="number" className="popup__label">
                        Introduzca la cantidad a retirar:</label>
                    <input
                        type="number"
                        id="input-id"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}  /* almacenar el valor introducido en cantidad*/
                    />
                </div>
                <div className="buttons-container">
                    <div className="cancel">
                        <button onClick={props.handleCloseP}>Cancelar</button>
                    </div>
                    <div className="acept">
                        <button onClick={handleAccept}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupRetirar;