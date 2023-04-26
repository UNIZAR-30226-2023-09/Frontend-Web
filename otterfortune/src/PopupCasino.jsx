import React, { useState, useEffect } from "react";
import "./CSS/PopupCasino.css";

import "bootstrap/dist/css/bootstrap.min.css";

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

import ruleta from './Imagenes/rule.png';
import rule from './Imagenes/ruleta2.png';
import bola from './Imagenes/bola2.png';

const PopupCasino = (props) => {
    const socket = useSocket();

    const [betAmount, setBetAmount] = useState(0); // Estado para almacenar la cantidad de dinero a apostar
    const [isBetting, setIsBetting] = useState(false);

    const handleBetAmountChange = (event) => {
        setBetAmount(event.target.value); // Actualiza el estado de betAmount con el valor de entrada del usuario
    };

    const handlePlaceBet = async () => {
        setIsBetting(true); // cambia el estado a "haciendo apuesta"
        // Lógica para enviar la apuesta al servidor a través del socket
        // Cuando se complete la lógica de la apuesta, cambia el estado de nuevo a "no haciendo apuesta" para detener la animación
        await socketActions.apostar(socket, sesion.email, estadoPartida.id_partida, betAmount, 0);
        setTimeout(() => {
            setIsBetting(false);
            if (estadoPartida.resultCasino === true) {
                props.handleClose(1);
            }
            else {
                props.handleClose(0);
            }
            // TODO: Aquí iría el mensaje de ganado/perdido
        }, 10000);    
    };

    return (
        <div className="row">
            <div className="col-7">

            </div>
            <div className="col-7">
                <div className="popup5">
                    <button className="popup__close5" onClick={props.handleClose}>X</button>
                    <div className="image-container">
                        {/* <img className="popup__imageC" src={ruleta} /> */}
                        <img className={`rule2 ${isBetting ? "rotate" : ""}`} src={rule}/>
                        <img className={`pelota-rule ${isBetting ? "rotate2" : ""}`} src={bola}/>
                        <div className="caja-rule">
                            <label className="titulo-apostar">Dinero a apostar:</label>
                            <input type="number" className="cantidad-apostar" value={betAmount} onChange={handleBetAmountChange} />
                            <button className="boton-apostar" onClick={handlePlaceBet}>Apostar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
};

export default PopupCasino;