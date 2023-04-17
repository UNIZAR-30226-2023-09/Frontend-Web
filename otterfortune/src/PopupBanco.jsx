import React, { useState, useEffect } from "react";
import "./CSS/PopupBanco.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useSocket } from "./socketContext";

import PopupIngresar from "./PopupIngresar";
import PopupRetirar from "./PopupRetirar";

import chicago from './Imagenes/CHICAGO.png';

const PopupBanco = (props) => {
    const socket = useSocket();

    const [openIngresar, setopenIngresar] = useState(false);
    const [openRetirar, setopenRetirar] = useState(false);

    const [cantidadIngresar, setcantidadIngresar] = useState(0);
    const [cantidadRetirar, setcantidadRetirar] = useState(0);
    
    const ingresar = () =>  {
        setopenIngresar(true);
    }

    const retirar = () =>  {
        setopenRetirar(true);
    }

    // Para guardar la cantidad introducida a ingresar
    const modificarCantidadIngresar = async (cantidadI) => {
        setcantidadIngresar(cantidadI);
        // TODO: Mensajes
    }

    // Para guardar la cantidad introducida a retirar
    const modificarCantidadRetirar = async (cantidadI) => {
        setcantidadRetirar(cantidadI);
        // TODO: Mensajes
    }

    // Gestionar el cierre de la ventana emergente de ingresar cantidad
    const handleCloseP = () => {
        setopenIngresar(false);
        setopenRetirar(false);
    }

    const handleClose = () => {
        props.handleClose(); 
    }
    
    return (
        <>
            {openIngresar ? (
                <PopupIngresar modificarCantidadIngresar={modificarCantidadIngresar} handleCloseP={handleCloseP} handleClose={handleClose}/>
            ) : openRetirar ? <PopupRetirar modificarCantidadRetirar={modificarCantidadRetirar} handleCloseP={handleCloseP} handleClose={handleClose}/> 
            : (
            <div className="row">
                <div className="col-7"> </div>
                <div className="col-7">
                <div className="col-7">
                    <div className="popupProp">
                        <h3 className="popup__title">¿Que desea hacer?</h3>
                        <button className="popup__close5" onClick={props.handleClose}>X</button>
                        <img className="popup__imageProp" src={chicago} />
                        <div className="buttonContainer">
                            <button className="confirmarP" onClick={ingresar}>INGRESAR</button>
                            <button className="retirarP" onClick={retirar}>RETIRAR</button>
                            <button className="rechazarP" onClick={props.handleClose}>CANCELAR</button>
                        </div>
                    </div>
                </div>

                </div>
            </div>
            )}
        </>
    );
};

export default PopupBanco;