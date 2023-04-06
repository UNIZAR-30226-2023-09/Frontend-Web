import React, { useState, useRef } from "react";
import './CSS/Tablero.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import tablero from './Imagenes/TABLERO2.jpg'
import iconoChat from './Imagenes/iconoChat.png';
import Chat from './Chat';

import dice1 from './Imagenes/Dice1.png';
import dice2 from './Imagenes/Dice2.png';
import dice3 from './Imagenes/Dice3.png';
import dice4 from './Imagenes/Dice4.png';
import dice5 from './Imagenes/Dice5.png';
import dice6 from './Imagenes/Dice6.png';

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';

export const Tablero = (props) => {

    const [abrirChat, setAbrirChat] = useState(false);

    const [mostrarPropiedades, setMostrarPropiedades] = useState(true);
    const [veces, setVeces] = useState(0);

    const handleMostrarPropiedades = () => {
      setMostrarPropiedades(true);
    };
  
    const handleMostrarCartas = () => {
      setMostrarPropiedades(false);
    };

    const handleClose = (e) => {
        setAbrirChat(false);
    }

    const handleChat = () => {
        if (veces === 0) {
            setAbrirChat(true);
            setVeces(1);
        }
        else {
            setAbrirChat(false);
            setVeces(0);   
        }
    }

    // {isOpenChat && popUpChat}
    const popUpChat = (
        // De esta forma, en popup, a través del props, se podrá acceder
        // a handleClose y a content
        // Se le puede pasar cualquier cosa
        <Chat handleClose={handleClose} />
    );

    return (

        <div className="row">
            <div className="col-7">
                <img src={tablero} className="imagen-tablero w-100" alt="Tablero" />
            </div>
            <div className="col-5">
                <div className="">
                    <div className="col-12 caja-jugadores">
                        <div className="btn-container">
                            <input type="button" className="btn-jugadores" value="Lista de jugadores" />
                        </div>
                        <div className="lista-jugadores">
                            <ul>
                                <li>Jugador 1</li>
                                <li>Jugador 2</li>
                                <li>Jugador 3</li>
                                <li>Jugador 4</li>
                            </ul>
                        </div>
                    </div>
                    <div className="caja-propiedades">
                        <div className="row no-gutters">
                            <div className="col-6">
                                <div className="btn-container">
                                    <input type="button" className="btn-propiedades" value="Propiedades" onClick={handleMostrarPropiedades}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="btn-container btn-cartas-container">
                                    <input type="button" className="btn-cartas" value="Cartas" onClick={handleMostrarCartas}/>
                                </div>
                            </div>
                        </div>
                        {mostrarPropiedades ? (
                        <div className="lista-propiedades">
                            <ul>
                                <li>Propiedad 1</li>
                                <li>Propiedad 2</li>
                                <li>Propiedad 3</li>
                                <li>Propiedad 4</li>
                                <li>Propiedad 5</li>
                                <li>Propiedad 6</li>
                                <li>Propiedad 7</li>
                                <li>Propiedad 8</li>

                            </ul>
                        </div>
                        ) : (
                        <div className="lista-cartas">
                                <ul>
                                    <li>Carta 1</li>
                                    <li>Carta 2</li>
                                    <li>Carta 3</li>
                                    <li>Carta 4</li>
                                    <li>Carta 5</li>
                                    <li>Carta 6</li>
                                    <li>Carta 7</li>
                                    <li>Carta 8</li>
                                </ul>
                        </div>
                         )}
                    </div>
                </div>
                <div className="imagen-extra">
                    <img src={iconoChat} className="imagen-extra-tablero" onClick={handleChat}/>
                </div>
                {abrirChat && popUpChat}
            </div>
        </div>

    )
}

export default Tablero;

/*
        {abrirChat ? (
            <Chat email={email} gemas={gemas} />
        ) : (
*/

/*
        <div className="row">
            <div className="col-9">
                <img src={tablero} className="imagen-tablero w-75" alt="Tablero" />
            </div>
            <div className="col-3">
                <div className="row">
                    <div className="col-12 col-md-6 caja-jugadores">
                        <input type="button" placeholder="1/4" />
                    </div>
                    <div className="col-12 col-md-6 caja-propiedades">
                        <input type="text"  placeholder="3/4" />
                    </div>
                </div>
                <div className="imagen-extra">
                    <img src={iconoChat} className="imagen-extra-tablero" onClick={handleChat}/>
                </div>
            </div>
        </div>
*/