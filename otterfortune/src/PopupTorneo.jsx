import React, { useState } from "react";
import './CSS/Popup.css';
import Loading from "./Loading";
import { Menu } from "./Menu";

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupTorneo = (props) => {
    //const [content, setContent] = useState("");
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);

    //setLoading(true);    // mostrar el nuevo Popup de carga
    console.log(loading); // debería mostrar false

    const handleAccept = () => {
        if (id.trim() === '') {
            window.alert('Por favor, ingrese el id.');
        }
        else {
            setLoading(true);    // mostrar el nuevo Popup de carga

            //props.handleClose(id, load);
            setTimeout(() => {
                // TODO: aquí iría la lógica para comprobar el mensaje de unirse con el id
                console.log(id);

                // Llamada a handleVerificarUnirsePartida dentro del then de la promesa que devuelve setTimeout
                setTimeout(() => {
                    props.handleVerificarUnirsePartida(id, true);
                }, 200);
            }, 200);
        }

        // TODO:
        // Aquí iría comprobar el mensaje de unirse con el id
        //console.log(id);

        // Esto te lleva de vuelta al menú, habría que mirar como ir a 
        // la pantalla del monopoly y pasarle el ID.
        // Seria hacer algo tipo <Tablero id={id} />
        // Y que tablero reciba props y acceder con props.id
        // Cambiar el estado de showLoadingPopup después de unos segundos
    };

    return (
        <div className="popup">
            <div className="popup__content">
                <button className="popup__close" onClick={props.handleClose}>X</button>
                <div>
                    <label htmlFor="text" className="popup__label">
                        Introduzca el ID del torneo:</label>
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

export default PopupTorneo;