import React, { useState } from "react";
import './CSS/Popup.css';

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupIngresar = (props) => {
    //const [content, setContent] = useState("");
    const [cantidad, setCantidad] = useState("");

    const handleAccept = () => {
        if (cantidad.trim() === '') {
            window.alert('Por favor, ingrese la cantidad.');
        }
        else {
            //props.handleClose(id, load);
            setTimeout(() => {
                // TODO: aquí iría la lógica para comprobar el mensaje de unirse con el id
                // Llamada a handleVerificarUnirsePartida dentro del then de la promesa que devuelve setTimeout
                setTimeout(() => {
                    props.modificarCantidadIngresar(cantidad);
                    window.alert('Se han ingresado ' + cantidad + '$ con éxito');
                    props.handleClose();
                }, 200);
            }, 200);
        }
    };

    return (
        <div className="popup">
            <div className="popup__content">
                <button className="popup__close" onClick={props.handleCloseP}>X</button>
                <div>
                    <label htmlFor="number" className="popup__label">
                        Introduzca la cantidad a ingresar:</label>
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

export default PopupIngresar;