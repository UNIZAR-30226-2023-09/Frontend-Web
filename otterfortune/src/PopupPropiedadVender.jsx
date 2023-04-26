import React, { useState, useEffect } from "react";
import "./CSS/PopupPropiedad.css";

import "bootstrap/dist/css/bootstrap.min.css";

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

import chicago from './Imagenes/CHICAGO.png';

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
        console.log("posicion del vector = " + propiedadPosicion);
        let resultado = await socketActions.venderPropiedad(socket, sesion.email, propiedadPosicion, estadoPartida.id_partida);
        if (resultado === true) {
            props.handleClose(1);
        }
        else {
            props.handleClose(0);
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
                    <img className="popup__imageProp" src={chicago} />
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


