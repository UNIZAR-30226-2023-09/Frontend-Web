import React, { useState, useEffect } from "react";
import "./CSS/PopupPropiedad.css";

import "bootstrap/dist/css/bootstrap.min.css";

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

// Importar todas las imagenes de las cartas de la carpeta Imagenes/CARTAS_EDIFICIOS
import Monterrey from './Imagenes/CARTAS_EDIFICIOS/MEXICO/MONTERREY.png';
import Guadalajara from './Imagenes/CARTAS_EDIFICIOS/MEXICO/GUADALAJARA.png';
import Kioto from './Imagenes/CARTAS_EDIFICIOS/JAPON/KIOTO.png';
import Osaka from './Imagenes/CARTAS_EDIFICIOS/JAPON/OSAKA.png';
import Tokio from './Imagenes/CARTAS_EDIFICIOS/JAPON/TOKIO.png';
import Napoles from './Imagenes/CARTAS_EDIFICIOS/ITALIA/NAPOLES.png';
import Milan from './Imagenes/CARTAS_EDIFICIOS/ITALIA/MILAN.png';
import Roma from './Imagenes/CARTAS_EDIFICIOS/ITALIA/ROMA.png';
import Madrid from './Imagenes/CARTAS_EDIFICIOS/ESP/MADRID.png';
import Barcelona from './Imagenes/CARTAS_EDIFICIOS/ESP/BARCELONA.png';
import Zaragoza from './Imagenes/CARTAS_EDIFICIOS/ESP/ZGZ.png';
import Paris from './Imagenes/CARTAS_EDIFICIOS/FRANCIA/PARIS.png';
import Marsella from './Imagenes/CARTAS_EDIFICIOS/FRANCIA/MARSELLA.png';
import Lyon from './Imagenes/CARTAS_EDIFICIOS/FRANCIA/LYON.png';
import Londres from './Imagenes/CARTAS_EDIFICIOS/ENG/LONDRES.png';
import Manchester from './Imagenes/CARTAS_EDIFICIOS/ENG/MANCHESTER.png';
import Edimburgo from './Imagenes/CARTAS_EDIFICIOS/ENG/EDIMBURGO.png';
import NuevaYork from './Imagenes/CARTAS_EDIFICIOS/EEUU/NY.png';
import LosAngeles from './Imagenes/CARTAS_EDIFICIOS/EEUU/LA.png';
import Chicago from './Imagenes/CARTAS_EDIFICIOS/EEUU/CHICAGO.png';
import Toronto from './Imagenes/CARTAS_EDIFICIOS/CANADA/TORONTO.png';
import Vancouver from './Imagenes/CARTAS_EDIFICIOS/CANADA/VANCOUVER.png';
import Ottawa from './Imagenes/CARTAS_EDIFICIOS/CANADA/OTTAWA.png';
import AeropuertoNarita from './Imagenes/AEROPUERTOS/NARITA_AP.png';
import AeropuertoHeathrow from './Imagenes/AEROPUERTOS/LONDRES_AP.png';
import AeropuertoOrly from './Imagenes/AEROPUERTOS/ORLY_AP.png';
import AeropuertoDeLosAngeles from './Imagenes/AEROPUERTOS/LA_AP.png';


const PopupSubastar = (props) => {
    const socket = useSocket();
    /* --------------TABLERO------------*/
    let tableroPropiedades = ["nada","Salida", "Monterrey", "Guadalajara", "Treasure", "Tax", "AeropuertoNarita", // 6
    "Tokio", "Kioto", "Superpoder", "Osaka", "Carcel", "Roma", "Milan", "Casino", "Napoles", // 15
    "Aeropuerto Heathrow", "Londres", "Superpoder", "Manchester", "Edimburgo", "Bote", "Madrid", // 22
    "Barcelona", "Treasure", "Zaragoza", "AeropuertoOrly", "Paris", "Banco", "Marsella", // 29
    "Lyon", "IrCarcel", "Toronto", "Vancouver", "Treasure", "Ottawa", "AeropuertoDeLosAngeles", // 36
    "NuevaYork", "LosAngeles", "LuxuryTax", "Chicago"];

    const nombrePropiedad = props.propiedad;

    const [cantidad, setCantidad] = useState("");


    const handleAccept = async () =>  {

//window.alert("Has comprado la propiedad " + nombrePropiedad);
        let resultado = await socketActions.comprarSubasta(socket, sesion.email, estadoPartida.id_partida, estadoPartida.subastaJugador);
        if (resultado === true) {
            props.handleClose(1);
        }
        else {
            props.handleClose(0);
        }

    }

    // props.carta  -> será la carta a mostrar en el src
    return (
        <div className="popup">
            <div className="popup__content">
                <button className="popup__close" onClick={props.handleClose}>X</button>
                <div>
                    <label htmlFor="number" className="popup__label">
                        El jugador {estadoPartida.subastaJugador} está subastando la propiedad {estadoPartida.subastaPropiedad} por {estadoPartida.subastaPrecio}. ¿Deseas comprarla?
                    </label>
                </div>
                <div className="buttons-container">
                    <div className="cancel">
                        <button onClick={props.handleClose}>Rechazar</button>
                    </div>
                    <div className="acept">
                        <button onClick={handleAccept}>Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupSubastar;