import React, { useState, useEffect } from 'react';

const WebSocketExample = () => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://34.175.156.130:8080');
    setSocket(ws);

    ws.onopen = () => {
      console.log('Conectado al servidor');
    };

    ws.onmessage = (event) => {
      console.log('Mensaje recibido:', event.data);
    };

    ws.onclose = (event) => {
      console.log('Conexión cerrada con código', event.code, 'y razón:', event.reason);
    };

    ws.onerror = (error) => {
      console.error('Error:', error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (socket) {
      socket.send(message);
    }
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={handleSendMessage}>
        <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default WebSocketExample;
