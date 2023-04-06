import React, { useState, useEffect } from "react";
import './CSS/Chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useSocket } from './socketContext';
import moment from "moment";

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
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
	  setMessages([...messages, { text: newMessage, timestamp: new Date() }]);
	  setNewMessage("");
	};
	const handleClose = () => {
		props.handleClose();
	};
	
	return (
		<div className="row">
			<div className="col-7">

			</div>
			<div className="col-7">
				<div className="popup2">
				<div className="chat-container">
            <div className="message-list">
              {messages.map((message, index) => (
                <div key={index} className="message">
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-timestamp">
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </form>
          </div>
				</div>
			</div>
			</div>
	);
};

export default Chat;