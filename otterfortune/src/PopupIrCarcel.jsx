import React, { useState, useEffect } from "react";
import "./CSS/PopupPropiedad.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { useSocket } from "./socketContext";

import policia from './Imagenes/POLICIA.png';

const PopupIrCarcel = (props) => {
    const socket = useSocket();

    return (
        <div className="row">
            <div className="col-7">

            </div>
            <div className="col-7">
            <div className="col-7">
                <div className="popupProp">
                    <h3 className="popup__title">Podrás salir de la cárcel cuando pasen 3 turnos.</h3>
                    <button className="popup__close5" onClick={props.handleClose}>X</button>
                    <img className="popup__imageProp" src={policia} style={{ marginTop: "12px" }} />
                </div>
            </div>

            </div>
        </div>
    );
};

export default PopupIrCarcel;