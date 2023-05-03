import React, { useState, useEffect } from "react";
import "./CSS/PopupPropiedad.css";

import "bootstrap/dist/css/bootstrap.min.css";

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

// Importar las tarjetas de los superpoderes
import SUPERPODER1 from './Imagenes/SUPERPODERES/SP1.png';
import SUPERPODER2 from './Imagenes/SUPERPODERES/SP2.png';
import SUPERPODER3 from './Imagenes/SUPERPODERES/SP3.png';
import SUPERPODER4 from './Imagenes/SUPERPODERES/SP4.png';
import SUPERPODER5 from './Imagenes/SUPERPODERES/SP5.png';
import SUPERPODER6 from './Imagenes/SUPERPODERES/SP6.png';
import SUPERPODER7 from './Imagenes/SUPERPODERES/SP7.png';
import SUPERPODER8 from './Imagenes/SUPERPODERES/SP8.png';
import SUPERPODER9 from './Imagenes/SUPERPODERES/SP9.png';
import SUPERPODER10 from './Imagenes/SUPERPODERES/SP10.png';
import SUPERPODER11 from './Imagenes/SUPERPODERES/SP11.png';
import SUPERPODER12 from './Imagenes/SUPERPODERES/SP12.png';


const PopupSuperpoder = (props) => {

    const socket = useSocket();

    // Funcion que dado el nombre de un superpoder devuelva la tarjeta correspondiente
    /*
    1 - Elegir casilla
    2
    3
    4
    5
    6
    */
    const tarjetaSuperpoder = (superpoder) => {
        console.log("SUPERPODER:" + superpoder);
        console.log("ESTADO PARTIDA:" + estadoPartida.superPoder);
        switch (superpoder) {
            case "1":
                return SUPERPODER1;
            case "2":
                return SUPERPODER2;
            case "3":
                return SUPERPODER3;
            case "4":
                return SUPERPODER4;
            case "5":
                return SUPERPODER5;
            case "6":
                return SUPERPODER6;
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
                    <h3 className="popup__titleP"> ¡¡¡SUPERPODER!!! </h3>
                    <button className="popup__close5" onClick={props.handleClose}>X</button>
                    <img className="popup__imageProp" src={tarjetaSuperpoder(props.superPoder)} />
                </div>
            </div>

            </div>
        </div>
    );
};

export default PopupSuperpoder;