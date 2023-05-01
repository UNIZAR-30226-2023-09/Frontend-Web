import React, { useState, useEffect } from "react";
import "./CSS/PopupPropiedad.css";

import "bootstrap/dist/css/bootstrap.min.css";

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

// Importar las tarjetas de los eventos
import EVENTO1 from './Imagenes/EVENTOS/EV1.png';
import EVENTO2 from './Imagenes/EVENTOS/EV2.png';
import EVENTO3 from './Imagenes/EVENTOS/EV3.png';
import EVENTO4 from './Imagenes/EVENTOS/EV4.png';
import EVENTO5 from './Imagenes/EVENTOS/EV5.png';


const PopupEvento = (props) => {

    const socket = useSocket();

    // Funcion que dado el nombre de una propiedad, devuelve su imagen
    // Funcion que dado el nombre de un evento devuelva la tarjeta correspondiente
    /*
    1. BancaRota 
    2. BancoDispara 
    3. DadosDobles
    4. DadosMitad
    5. EconomiaInestable 
    */
    const tarjetaEvento = (evento) => {
        switch (evento) {
            case "BancaRota":
                return EVENTO1;
            case "BancoDispara":
                return EVENTO2;
            case "DadosDobles":
                return EVENTO3;
            case "DadosMitad":
                return EVENTO4;
            case "EconomiaInestable":
                return EVENTO5;
        }
    };

    // props.carta  -> será la carta a mostrar en el src
    return (
        <div className="row">
            <div className="col-7">

            </div>
            <div className="col-7">
            <div className="col-7">
                <div className="popupProp">
                    <h3 className="popup__titleP"> ¡¡¡NUEVO EVENTO!!! </h3>
                    <button className="popup__close5" onClick={props.handleClose}>X</button>
                    <img className="popup__imageProp" src={tarjetaEvento(props.evento)} />
                </div>
            </div>

            </div>
        </div>
    );
};

export default PopupEvento;