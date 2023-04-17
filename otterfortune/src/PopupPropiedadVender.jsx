import React, { useState, useEffect } from "react";
import "./CSS/PopupPropiedadVender.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { useSocket } from "./socketContext";

import chicago from './Imagenes/CHICAGO.png';

const PopupPropiedadVender = (props) => {
    const socket = useSocket();
    const nombrePropiedad = props.propiedad;

    const venderPropiedad = () =>  {
        // TODO: Mensaje de comprar la propiedad
        window.alert("Has comprado la propiedad " + nombrePropiedad);
        props.handleClose();
    }

    // props.carta  -> será la carta a mostrar en el src
    return (
        <div className="row">

            <div className="col-7">
            <div className="col-7">
                <div className="popupProp">
                    <h3 className="popup__titleV">Quieres vender la propiedad: {props.propiedad}?</h3>
                    <button className="popup__close5" onClick={props.handleClose}>X</button>
                    <img className="popup__imagePropV" src={chicago} />
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