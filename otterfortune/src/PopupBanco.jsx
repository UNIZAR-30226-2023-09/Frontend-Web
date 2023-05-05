import React, { useState, useEffect } from "react";
import "./CSS/PopupBanco.css";
import "bootstrap/dist/css/bootstrap.min.css";

import PopupIngresar from "./PopupIngresar";
import PopupRetirar from "./PopupRetirar";

import banco from './Imagenes/banco.png';

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

import { mostrarAlertaBanco } from './alertas.jsx';

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
        // Almacenamos el dinero ingresado en el banco
        estadoPartida.dineroEnBanco += cantidadI;
        // TODO: Mensajes
    }

    // Para guardar la cantidad introducida a retirar
    const modificarCantidadRetirar = async (cantidadI) => {
        setcantidadRetirar(cantidadI);
        // TODO: Mensajes
    }

    // Gestionar el cierre de la ventana emergente de ingresar cantidad
    const handleCloseIngresar = (resultado) => {
        setopenIngresar(false);
        if (resultado === 1) {
            //window.alert('Dinero ingresado correctamente.');
            mostrarAlertaBanco("bancoIngresarBien");
            handleClose();
        }
        else if (resultado === 0) {
            //window.alert('No se ha podido ingresar el dinero en el banco.');
            mostrarAlertaBanco("bancoIngresarMal");
            handleClose();
        }
        
    }

    // Gestionar el cierre de la ventana emergente de retirar cantidad
    const handleCloseRetirar = (resultado) => {
        setopenRetirar(false);
        if (resultado === 1) {
            //window.alert('Dinero retirado correctamente.');
            mostrarAlertaBanco("bancoRetirarBien");
            handleClose();
        }
        else if (resultado === 0) {
            //window.alert('No hay suficiente dinero en el banco.');
            mostrarAlertaBanco("bancoRetirarMal");
            handleClose();
        }
        
    }

    const handleClose = () => {
        props.handleClose(); 
    }
    
    return (
        <>
            {openIngresar ? (
                <PopupIngresar handleCloseP={handleCloseIngresar} handleClose={handleClose}/>
            ) : openRetirar ? <PopupRetirar handleCloseP={handleCloseRetirar} handleClose={handleClose}/> 
            : (
            <div className="row">
                <div className="col-7"> </div>
                <div className="col-7">
                <div className="col-7">
                    <div className="popupProp">
                        <h3 className="popup__title">¿Que desea hacer?</h3>
                        <button className="popup__close5" onClick={props.handleClose}>X</button>
                        <img className="popup__imageProp" src={banco} />
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