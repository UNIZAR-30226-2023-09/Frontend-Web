import React, { useState } from "react";
import './CSS/Popup.css';
import Loading from "./Loading";
import { Menu } from "./Menu";

import { mostrarAlertaSuperpoder } from './alertas.jsx';

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupSuperpoder1 = (props) => {
    //const [content, setContent] = useState("");
    const [id, setId] = useState("");

    const handleAccept = () => {
        if (id.trim() === '' || id.trim() < 0 || id.trim() > 40) {
            //window.alert('Por favor, ingresa una posición correcta.');
            mostrarAlertaSuperpoder("posicionMal");
        }
        else {
            props.handleClose(id);
        }
    };

    return (
        <div className="popup">
            <div className="popup__content">
                <button className="popup__close" onClick={props.handleClose}>X</button>
                <div>
                    <label htmlFor="text" className="popup__label">
                        Introduzca la posicion a la que quieres ir:</label>
                    <input
                        type="number"
                        id="input-id" /* Para modificar solo este en el css*/
                        value={id}
                        onChange={(e) => setId(e.target.value)}  /* almacenar el valor introducido en id*/
                    />
                </div>
                <div className="buttons-container">
                    <div className="cancel">
                        <button onClick={props.handleClose}>Cancelar</button>
                    </div>
                    <div className="acept">
                        <button onClick={handleAccept}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupSuperpoder1;