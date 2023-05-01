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


const PopupPropiedadVender = (props) => {
    const socket = useSocket();
    /* --------------TABLERO------------*/
    let tableroPropiedades = ["nada","Salida", "Monterrey", "Guadalajara", "Treasure", "Tax", "AeropuertoNarita", // 6
    "Tokio", "Kioto", "Superpoder", "Osaka", "Carcel", "Roma", "Milan", "Casino", "Napoles", // 15
    "Aeropuerto Heathrow", "Londres", "Superpoder", "Manchester", "Edimburgo", "Bote", "Madrid", // 22
    "Barcelona", "Treasure", "Zaragoza", "AeropuertoOrly", "Paris", "Banco", "Marsella", // 29
    "Lyon", "IrCarcel", "Toronto", "Vancouver", "Treasure", "Ottawa", "AeropuertoDeLosAngeles", // 36
    "NuevaYork", "LosAngeles", "LuxuryTax", "Chicago"];

    const nombrePropiedad = props.propiedad;
    console.log(nombrePropiedad);


    // Funcion que dado el nombre de una propiedad, devuelve su posicion en el tablero
    const getPosicion = (nombrePropiedad) => {
        let posicion = 0;
        for (let i = 0; i < tableroPropiedades.length; i++) {
            if (tableroPropiedades[i] === nombrePropiedad) {
                posicion = i;
            }
        }
        return posicion;
    }

    const venderPropiedad = async () =>  {
        // TODO: Mensaje de comprar la propiedad
        //window.alert("Has comprado la propiedad " + nombrePropiedad);
        let propiedadPosicion = getPosicion(nombrePropiedad);
        let resultado = await socketActions.venderPropiedad(socket, sesion.email, propiedadPosicion, estadoPartida.id_partida);
        if (resultado === true) {
            props.handleClose(1);
        }
        else {
            props.handleClose(0);
        }
    }

     // Funcion que dado el nombre de una propiedad, devuelve su imagen
     const getImagen = (nombrePropiedad) => {
        switch (nombrePropiedad) {
            case "Monterrey":
                return Monterrey;
            case "Guadalajara":
                return Guadalajara;
            case "Kioto":
                return Kioto;
            case "Osaka":
                return Osaka;
            case "Tokio":
                return Tokio;
            case "Napoles":
                return Napoles;
            case "Milan":
                return Milan;
            case "Roma":
                return Roma;
            case "Madrid":
                return Madrid;
            case "Barcelona":
                return Barcelona;
            case "Zaragoza":
                return Zaragoza;
            case "Paris":
                return Paris;
            case "Marsella":
                return Marsella;
            case "Lyon":
                return Lyon;
            case "Londres":
                return Londres;
            case "Manchester":
                return Manchester;
            case "Edimburgo":
                return Edimburgo;
            case "NuevaYork":
                return NuevaYork;
            case "LosAngeles":
                return LosAngeles;
            case "Chicago":
                return Chicago;
            case "Toronto":
                return Toronto;
            case "Vancouver":
                return Vancouver;
            case "Ottawa":
                return Ottawa;
            case "AeropuertoNarita":
                return AeropuertoNarita;
            case "Aeropuerto Heathrow":
                return AeropuertoHeathrow;
            case "AeropuertoOrly":
                return AeropuertoOrly;
            default:
                return AeropuertoDeLosAngeles;
        }
    }

    // props.carta  -> será la carta a mostrar en el src
    return (
        <div className="row">
            <div className="col-7">

            </div>
            <div className="col-7">
            <div className="col-7">
                <div className="popupProp">
                    <h3 className="popup__title">Quieres vender la propiedad: {props.propiedad}?</h3>
                    <button className="popup__close5" onClick={props.handleClose}>X</button>
                    <img className="popup__imageProp" src={getImagen(props.propiedad)} />
                    <div className="buttonContainer">
                        <button className="confirmarP" onClick={venderPropiedad}>VENDER</button>
                        <button className="rechazarP" onClick={props.handleClose}>CANCELAR</button>
                    </div>
                </div>
            </div>

            </div>
        </div>
    );
};

export default PopupPropiedadVender;


