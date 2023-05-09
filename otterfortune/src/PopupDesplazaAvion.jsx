import React, { useState, useEffect } from "react";
import "./CSS/PopupPropiedad.css";

import "bootstrap/dist/css/bootstrap.min.css";

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

// Importar las tarjetas de los superpoderes
import salto from './Imagenes/salto_felino.png';


const PopupSuperpoder = (props) => {

    const socket = useSocket();

    // props.carta  -> será la carta a mostrar en el src
    return (
        <div className="row">
            <div className="col-7">

            </div>
            <div className="col-7">
            <div className="col-7">
                <div className="popupProp">
                    <h3 className="popup__titleP"> ¡¡¡JESÚS Y SU FIRULAIS TE LLEVAN AL SIGUIENTE AEROPUERTO!!! </h3>
                    <button className="popup__close5" onClick={props.handleClose}>X</button>
                    <img className="popup__imageProp" src={salto} />
                </div>
            </div>

            </div>
        </div>
    );
};

export default PopupSuperpoder;