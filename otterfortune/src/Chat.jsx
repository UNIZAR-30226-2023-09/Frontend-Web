import React, { useState, useEffect } from "react";
import "./CSS/Chat.css";
import "bootstrap/dist/css/bootstrap.min.css";

import moment from "moment";
import enviar from './Imagenes/enviar.png'
import tite from './Imagenes/TITE.png';

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';

import TITE from './Imagenes/TITE.png';
import PLEX from './Imagenes/PLEX.png';
import LUCAS from './Imagenes/LUCAS.png';
import JEANCARLO from './Imagenes/JEAN-CARLO.png';
import BAXTER from './Imagenes/BAXTER.png';
import BERTA from './Imagenes/BERTA.png';
import DIONIX from './Imagenes/DIONIX.png';
import JULS from './Imagenes/JULS.png';

const Chat = (props) => {
    const socket = useSocket();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatNuestro, setChatNuestro] = useState([]); // [author, text

    // Para saber mi email en la partida 
    const miEmail = sesion.email;

    useEffect(() => {
        const interval = setInterval(() => {
          // Cargar la variable chat aquí
          // Actualizar el estado de messages con los nuevos mensajes recibidos
          setChatNuestro(estadoPartida.chat);
        }, 100);
      
        return () => clearInterval(interval);
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes colocar el código para enviar el nuevo mensaje al chat
        setMessages([...messages, { text: newMessage, timestamp: new Date() },]);
        await socketActions.chat(socket, sesion.email, estadoPartida.id_partida, newMessage);
        setNewMessage("");
    };

    const handleClose = () => {
        props.handleClose();
    };

    return (
        <div className="row">
            <div className="col-7"></div>
            <div className="col-7">
                <div className="popup2" style={{ display: "flex" }}>
                    <div className="chat-container">
                        <h1 style={{ textAlign: "center" }}>CHAT</h1>
                        
                        <div className="message-list" style={{ overflowY: "scroll" }}>
                            {/*Mostrar el contenido del array estadoPartida.chat */}
                            {chatNuestro.map((message, index) => {
                                const [author, text] = String(message).split(':');
                                const isMyMessage = author === miEmail;
                                console.log("autor: " + author);
                                // Buscar en que posicion de estadoPartida.jugadores está el autor
                                const posicion = estadoPartida.Jugadores.findIndex(jugador => jugador.email == author);
                                console.log("posicion: " + posicion);
                                // Funcion que dado el de una skin devuelva la imagen importada
                                const skinToImage = (skin) => {
                                    switch (skin) {
                                        case "TITE":
                                            return TITE;
                                        case "PLEX":
                                            return PLEX;
                                        case "LUCAS":
                                            return LUCAS;
                                        case "JEAN-CARLO":
                                            return JEANCARLO;
                                        case "BAXTER":
                                            return BAXTER;
                                        case "BERTA":
                                            return BERTA;
                                        case "DIONIX":
                                            return DIONIX;
                                        case "JULS":
                                            return JULS;
                                        default:
                                            return TITE;
                                    }
                                }

                                return (
                                    <div key={index} className="message">
                                        <div className="message-content">
                                            <div className={`${isMyMessage ? "message-text" : "other-message"}`}>{text}</div>
                                            <div className="message-timestamp"></div>
                                        </div>
                                        <img src={skinToImage(estadoPartida.Jugadores[posicion].skin)} alt="Descripción de la imagen" className="my-image" />
                                    </div>
                                );
                            })}


                        </div>
                        <form onSubmit={handleSubmit} className="message-form">
                            <div className="form-group" style={{ position: "", bottom: 0 }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                    style={{ width: "103%", position: "", bottom: 0 }}
                                />
                            </div>
                            <div >
                                <button id="my-button" className="send-container" type="submit">
                                    <img src={enviar} id="my-img" className="send-boton" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;

/*
                <div style={{ position: "absolute", right: "10px", bottom: "6px" }}>
                <button type="submit" className="btn btn-primary btn-send">
                  Enviar
                </button>
*/
