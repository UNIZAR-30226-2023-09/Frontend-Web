import React, { useState, useEffect } from "react";
import "./CSS/Chat.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useSocket } from "./socketContext";
import moment from "moment";
import enviar from './Imagenes/enviar.png'
import tite from './Imagenes/TITE.png';

const Chat = (props) => {
    const socket = useSocket();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        // Aquí puedes colocar el código para cargar los mensajes existentes del chat
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes colocar el código para enviar el nuevo mensaje al chat
        setMessages([...messages, { text: newMessage, timestamp: new Date() },]);
        setNewMessage("");
    };

    const handleClose = () => {
        props.handleClose();
    };

    const handleNewMessage = (e) => {
        // Verificar si el mensaje es vacío o solo contiene saltos de línea
        if (e.target.value.trim()) {
          setNewMessage(e.target.value);
        }
      };

    return (
        <div className="row">
            <div className="col-7"></div>
            <div className="col-7">
                <div className="popup2" style={{ display: "flex" }}>
                    <div className="chat-container">
                        <h1 style={{ textAlign: "center" }}>CHAT</h1>
                        
                        <div className="message-list" style={{ overflowY: "scroll" }}>
                            {messages.map((message, index) => (
                                <div key={index} className="message">
                                    <div className="message-content">
                                        <div className="message-text">
                                            {message.text}
                                        </div>
                                        <div className="message-timestamp"></div>
                                    </div>
                                    <img src={tite} alt="Descripción de la imagen" className="my-image" />
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} className="message-form">
                            <div className="form-group" style={{ position: "", bottom: 0 }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newMessage}
                                    onChange={handleNewMessage}
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