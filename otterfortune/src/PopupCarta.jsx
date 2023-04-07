import React, { useState, useEffect } from "react";
import "./CSS/Chat.css";
import "./CSS/PopupCarta.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { useSocket } from "./socketContext";
import moment from "moment";
import enviar from './Imagenes/enviar.png'
import tite from './Imagenes/TITE.png';

const PopupCarta = (props) => {
    const socket = useSocket();

    // props.carta  -> será la carta a mostrar en el src
    return (
        <div className="row">
            <div className="col-7">

            </div>
            <div className="col-7">
                <div className="popup5">
                    <button className="popup__close5" onClick={props.handleClose}>X</button>
                    <img className="popup__image5" src={tite} />
                </div>

            </div>
        </div>
    );
};

export default PopupCarta;