/******************************************************************************\
* Asignatura: Proyecto Software (2022/2023)                                    *
* Fichero: socketActions.js                                                    *
* Autor: David Rivera Seves (NIP: 815124)                                      *
\******************************************************************************/

let waitingForResponse = false

const waitForResponse = (socket) => {
    return new Promise((resolve) => {
        socket.onmessage = (event) => {
            if (waitingForResponse) {
                waitingForResponse = false
                resolve(event.data)
            } else {
                cambiarEstado(event.data)
            }
        }
    })
}


/*
Escuchar:
    ACTUALIZAR_USUARIO,email,dinero,casilla,propiedades
    TURNO,email,id_partida
    CHAT,email,msg
*/
function cambiarEstado(data) {
    console.log("cambiarEstado: " + data)
}

export async function registrarse(socket, email, contrasenya, nombre) {
    if (socket) {
        socket.send(`registrarse,${email},${contrasenya},${nombre}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'REGISTRO_OK') {
            console.log("Sí registrado")
            return true
        } else {
            console.log("No registrado")
            return false
        }
    }
}

export async function iniciarSesion(socket, email, contrasenya) {
    if (socket) {
        socket.send(`iniciarSesion,${email},${contrasenya}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'INICIO_OK') {
            console.log("Sí iniciarSesion, gemas: " + msg[2])
            return msg[2]  // Devuelve gemas
        } else {
            console.log("No iniciarSesion")
            return -1
        }
    }
}

export async function crearPartida(socket, email) {
    if (socket) {
        socket.send(`crearPartida,${email}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'CREADAP_OK') {
            console.log("Sí crearPartida, id_partida: " + msg[1])
            return msg[1]    // Devuelve idPartida
        } else {
            console.log("No crearPartida")
            return -1
        }
    }
}

export async function unirsePartida(socket, email, id_partida) {
    if (socket) {
        socket.send(`unirsePartida,${email},${id_partida}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'UNIRP_OK') {
            console.log("Sí unirsePartida, id_partida: " + msg[1] + " email: " + msg[2])
            return true
        } else {
            console.log("No unirsePartida")
            return false
        }
    }
}


export async function empezarPartida(socket, id_partida, email_lider) {
    if (socket) {
        socket.send(`empezarPartida,${id_partida},${email_lider}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'EMPEZAR_OK') {
            const jugadorYO = msg[3 + parseInt(msg[2])]
            const indicesJugadores = [0, 1, 2, 3].filter(index => index !== parseInt(msg[2]))
            const jugador1 = msg[3 + indicesJugadores[0]]
            const jugador2 = msg[3 + indicesJugadores[1]]
            const jugador3 = msg[3 + indicesJugadores[2]]

            console.log("Sí empezarPartida, id_partida: " + msg[1] + " jugadorYO: " + jugadorYO + " jugador1: " + jugador1 + " jugador2: " + jugador2 + " jugador3: " +  jugador3)

            return [jugadorYO, jugador1, jugador2, jugador3]    // Devuelve lista de jugadores, el primero soy yo
        } else {
            console.log("No empezarPartida")
            return -1
        }
    }
}


export async function esperarEmpezarPartida(socket) {
    if (socket) {
        
        console.log('Esperando ...')

        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'EMPEZAR_OK') {
            const jugadorYO = msg[3 + parseInt(msg[2])]
            const indicesJugadores = [0, 1, 2, 3].filter(index => index !== parseInt(msg[2]))
            const jugador1 = msg[3 + indicesJugadores[0]]
            const jugador2 = msg[3 + indicesJugadores[1]]
            const jugador3 = msg[3 + indicesJugadores[2]]

            console.log("Sí empezarPartida, id_partida: " + msg[1] + " jugadorYO: " + jugadorYO + " jugador1: " + jugador1 + " jugador2: " + jugador2 + " jugador3: " +  jugador3)

            return [jugadorYO, jugador1, jugador2, jugador3]    // Devuelve lista de jugadores, el primero soy yo
        } else {
            console.log("No empezarPartida")
            return -1
        }
    }
}


export async function lanzarDados(socket, email, id_partida) {
    if (socket) {
        socket.send(`lanzarDados,${email},${id_partida}`);
        const response = await waitForResponse(socket);
        return response;
    }
}

export async function apostar(socket, email, id_partida) {
    if (socket) {
        socket.send(`APOSTAR,${email},${id_partida}`);
        const response = await waitForResponse(socket);
        return response;
    }
}

export async function meterBanco(socket, email, id_partida, cantidad) {
    if (socket) {
        socket.send(`METER,${email},${id_partida},${cantidad}`);
        const response = await waitForResponse(socket);
        return response;
    }
}

export async function sacarBanco(socket, email, id_partida, cantidad) {
    if (socket) {
        socket.send(`SACAR,${email},${id_partida},${cantidad}`);
        const response = await waitForResponse(socket);
        return response;
    }
}

export async function comprarPropiedad(socket, email, propiedad, id_partida) {
    if (socket) {
        socket.send(`SI_COMPRAR_PROPIEDAD,${email},${propiedad},${id_partida}`);
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

export async function venderPropiedad(socket, email, propiedad) {
    if (socket) {
        socket.send(`venderPropiedad,${email},${propiedad}`);
        const response = await waitForResponse(socket);
        return response;
    }
}

export async function quieroEdificar(socket, email, id_partida) {
    if (socket) {
        socket.send(`QUIERO_EDIFICAR,${email},${id_partida}`);
        const response = await waitForResponse(socket);
        return response;
    }
}

export async function edificarPropiedad(socket, email, id_partida, propiedadPrecio) {
    if (socket) {
        socket.send(`EDIFICAR,${email},${id_partida},${propiedadPrecio}`);
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

export async function finTurno(socket, email, id_partida) {
    if (socket) {
        socket.send(`finTurno,${email},${id_partida}`);
        const response = await waitForResponse(socket);
        return response;
    }
}

export async function crearTorneo(socket, email) {
    if (socket) {
        socket.send(`crearTorneo,${email}`);
        waitingForResponse = true
        const response = await waitForResponse(socket);

        let msg = response.toString().split(",")
        if (msg[0] === 'CREADOT_OK') {
            console.log("Sí crearTorneo, id_torneo: " + msg[1])
            return msg[1]    // CREADOT_OK,1 -> devuelve idTorneo
        } else {
            console.log("No crearTorneo")
            return -1
        }
    }
}


export async function unirseTorneo(socket, email, id_torneo) {
    if (socket) {
        socket.send(`unirseTorneo,${email},${id_torneo}`);
        waitingForResponse = true
        const response = await waitForResponse(socket);

        let msg = response.toString().split(",")
        if (msg[0] === 'UNIRSET_OK') {
            console.log("Sí unirseTorneo, id_torneo: " + msg[1] + " email: " + msg[2])
            return true
        } else {
            console.log("No unirseTorneo")
            return false
        }
    }
}