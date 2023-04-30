import React, { useState } from "react";
import './CSS/Popup.css';
import { Menu } from "./Menu";

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupMuerto = (props) => {
    // Para ir al meno
    const [irMenu, setIrMenu] = useState(false);

    const handleAccept = () => {
        setIrMenu(true);    // mostrar el menu de vuelta
};  

    return (
        <>
            {irMenu ? <Menu email={props.email} gemas={props.gemas} /> 
            : ( 
                <div className="popup">
                    <div className="popup__content">
                        <div>
                            <label htmlFor="text" className="popup__label">
                                Te has quedado sin dinero y estás eliminado de la partida
                            </label>
                            <label htmlFor="text" className="popup__label">
                                Has ganado {props.gemasGanadas} gemas
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