/******************************************************************************\
* Asignatura: Proyecto Software (2022/2023)                                    *
* Fichero: socketContext.js                                                    *
* Autor: David Rivera Seves (NIP: 815124)                                      *
\******************************************************************************/

import { createContext, useContext, useState, useEffect } from 'react';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://34.175.149.140:8080');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
