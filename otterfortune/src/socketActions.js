/******************************************************************************\
* Asignatura: Proyecto Software (2022/2023)                                    *
* Fichero: socketActions.js                                                    *
* Autor: David Rivera Seves (NIP: 815124)                                      *
\******************************************************************************/

const waitForResponse = (socket) => {
    return new Promise((resolve) => {
      socket.onmessage = (event) => {
        resolve(event.data);
      };
    });
  };
  
  export async function registrarse(socket, email, contrasenya, nombre) {
    if (socket) {
      socket.send(`registrarse,${email},${contrasenya},${nombre}`);
      const response = await waitForResponse(socket);

      let msg = response.toString().split(",");
      if (msg[0] === 'REGISTRO_OK') {
        return true;
      } else {
        return false;
      }
    }
  }
  
  
  export async function iniciarSesion(socket, email, contrasenya) {
    if (socket) {
      socket.send(`iniciarSesion,${email},${contrasenya}`);
      const response = await waitForResponse(socket);

      let msg = response.toString().split(",");
      if (msg[0] === 'INICIO_OK') {
        return true;
      } else {
        return false;
      }
    }
  }
  
  export async function crearPartida(socket, ID_jugador) {
    if (socket) {
      socket.send(`crearPartida,${ID_jugador}`);
      const response = await waitForResponse(socket);
      // ...
      if (response === 'CREADAP_OK') {
        return true;
      } else {
        return false;
      }
    }
  }
  
  export async function unirsePartida(socket, ID_jugador, ID_partida) {
    if (socket) {
      socket.send(`unirsePartida,${ID_jugador},${ID_partida}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function empezarPartida(socket, ID_Partida, ID_Lider) {
    if (socket) {
      socket.send(`empezarPartida,${ID_Partida},${ID_Lider}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function lanzarDados(socket, ID_jugador, ID_partida) {
    if (socket) {
      socket.send(`lanzarDados,${ID_jugador},${ID_partida}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function apostar(socket, ID_jugador, ID_partida) {
    if (socket) {
      socket.send(`APOSTAR,${ID_jugador},${ID_partida}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function meterBanco(socket, ID_jugador, ID_partida, cantidad) {
    if (socket) {
      socket.send(`METER,${ID_jugador},${ID_partida},${cantidad}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function sacarBanco(socket, ID_jugador, ID_partida, cantidad) {
    if (socket) {
      socket.send(`SACAR,${ID_jugador},${ID_partida},${cantidad}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function comprarPropiedad(socket, ID_jugador, propiedad, ID_partida) {
    if (socket) {
      socket.send(`SI_COMPRAR_PROPIEDAD,${ID_jugador},${propiedad},${ID_partida}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function noComprarPropiedad(socket) {
    if (socket) {
      socket.send(`NO_COMPRAR_PROPIEDAD`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function venderPropiedad(socket, ID_jugador, propiedad) {
    if (socket) {
      socket.send(`venderPropiedad,${ID_jugador},${propiedad}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function quieroEdificar(socket, ID_jugador, ID_partida) {
    if (socket) {
    socket.send(`QUIERO_EDIFICAR,${ID_jugador},${ID_partida}`);
    const response = await waitForResponse(socket);
    return response;
  }
}

export async function edificarPropiedad(socket, ID_jugador, ID_partida, propiedadPrecio) {
    if (socket) {
      socket.send(`EDIFICAR,${ID_jugador},${ID_partida},${propiedadPrecio}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function usarCarta(socket) {
    if (socket) {
      socket.send(`usarCarta`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function finTurno(socket, ID_jugador, ID_partida) {
    if (socket) {
      socket.send(`finTurno,${ID_jugador},${ID_partida}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function crearTorneo(socket, ID_jugador) {
    if (socket) {
      socket.send(`crearTorneo,${ID_jugador}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }
  
  export async function unirseTorneo(socket, ID_jugador, ID_Torneo) {
    if (socket) {
      socket.send(`unirseTorneo,${ID_jugador},${ID_Torneo}`);
      const response = await waitForResponse(socket);
      return response;
    }
  }