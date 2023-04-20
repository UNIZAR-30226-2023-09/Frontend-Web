/******************************************************************************\
* Asignatura: Proyecto Software (2022/2023)                                    *
* Fichero: socketActions.js                                                    *
* Autor: David Rivera Seves (NIP: 815124)                                      *
\******************************************************************************/

import { sesion, estadoPartida } from './estadoGeneral.js';


let waitingForResponse = false

const waitForResponse = (socket) => {
    return new Promise((resolve) => {
        socket.onmessage = (event) => {
            console.log("waitForResponse: " + event.data)
            if (waitingForResponse) {
                waitingForResponse = false
                resolve(event.data)
            } else {
                cambiarEstado(event.data)
            }
        }
    })
}

function cambiarEstado(data) {
    
    let msg = data.toString().split(",")
    switch (msg[0]) {

        case 'TURNO':
            //TURNO,${jugador},${ID_partida}
            break

        case 'REINICIAR_SUERTE':
            break

        case 'ACTUALIZAR_USUARIO':
            //ACTUALIZAR_USUARIO,${ID_jugador},${dinero},${casilla},${propiedades}
            break

        case 'NUEVO_DINERO_JUGADOR':
            //NUEVO_DINERO_JUGADOR,${ID_jugador},${nuevoDinero}
            break
            
        case 'ELIMINADO':
            //ELIMINADO
            break

        case 'NUEVO_DINERO_BOTE':
            //NUEVO_DINERO_BOTE,${dineroBote}
            break

        case 'DINERO_APOSTAR':
            //DINERO_APOSTAR,${ID_jugador}
            break

        case 'OBTENER_BOTE':
            //OBTENER_BOTE,${ID_jugador},${dineroBote}
            break

        case 'ACCION_BANCO':
            //ACCION_BANCO,${ID_jugador},${ID_partida},${dineroBanco}
            break

        case 'DENTRO_CARCEL':
            //DENTRO_CARCEL,${ID_jugador}
            break

        case 'SUPERPODER':
            //SUPERPODER,${superPoder}
            break

        case 'ELEGIR_CASILLA':
            //ELEGIR_CASILLA
            break

        case 'DESPLAZAR_JUGADOR':
            //DESPLAZAR_JUGADOR,${nuevaPosicion}
            break

        case 'AUMENTAR_SUERTE':
            //AUMENTAR_SUERTE
            break

        case 'NADA':
            //NADA
            break

        case 'QUIERES_COMPRAR_PROPIEDAD':
            //QUIERES_COMPRAR_PROPIEDAD,${posicion},${ID_jugador},${ID_partida},${precio}
            break

        case 'NUEVO_DINERO_ALQUILER':
            //NUEVO_DINERO_ALQUILER,${dineroJugadorPaga},${dineroJugadorRecibe}
            break

        case 'NUEVO_DINERO_ALQUILER_RECIBES':
            //NUEVO_DINERO_ALQUILER_RECIBES,${dineroJugadorRecibe},${ID_jugador},${dineroJugadorPaga}
            break
        
        case 'CASILLA':
            //CASILLA
            break
        
        case 'CHAT':
            //CHAT,"${ID_jugador}, ${mensaje}
            break

        default:
            console.log("!!!!!!! NUEVO MSG !!!!!!!" + data)
        
        console.log("cambiarEstado: " + data)
    }
}

// Síncrona
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

// Síncrona
export async function iniciarSesion(socket, email, contrasenya) {
    if (socket) {
        socket.send(`iniciarSesion,${email},${contrasenya}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'INICIO_OK') {
            console.log("Sí iniciarSesion, gemas: " + msg[2])
            sesion.email = msg[1]    // Guarda email
            sesion.gemas = msg[2]    // Guarda gemas
            return true
        } else {
            console.log("No iniciarSesion")
            return false
        }
    }
}

// Síncrona
export async function crearPartida(socket, email) {
    if (socket) {
        socket.send(`crearPartida,${email}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'CREADAP_OK') {
            console.log("Sí crearPartida, id_partida: " + msg[1])
            estadoPartida.id_partida = msg[1]   // Guarda id_partida
            return true
        } else {
            console.log("No crearPartida")
            return false
        }
    }
}

// Síncrona
export async function unirsePartida(socket, email, id_partida) {
    if (socket) {
        socket.send(`unirsePartida,${email},${id_partida}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'UNIRP_OK') {
            console.log("Sí unirsePartida, id_partida: " + msg[1] + " email: " + msg[2])
            estadoPartida.id_partida = msg[1]   // Guarda id_partida
            return true
        } else {
            console.log("No unirsePartida")
            return false
        }
    }
}


/******************************************************************************\
* Funciones de partida                                                         *
\******************************************************************************/


export async function empezarPartida(socket, id_partida, email_lider) {
    if (socket) {
        socket.send(`empezarPartida,${id_partida},${email_lider}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'EMPEZAR_OK') {
            // Guarda los Jugadores
            estadoPartida.indiceYO = parseInt(msg[2])
            estadoPartida.Jugadores[0].email = msg[3]
            estadoPartida.Jugadores[1].email = msg[4]
            estadoPartida.Jugadores[2].email = msg[5]
            estadoPartida.Jugadores[3].email = msg[6]

            console.log("Sí empezarPartida, id_partida: " + msg[1] + ", Jugadores: " + estadoPartida.Jugadores[0].email + ", " + estadoPartida.Jugadores[1].email + ", " + estadoPartida.Jugadores[2].email + ", " + estadoPartida.Jugadores[3].email + ", YOsoy [" + estadoPartida.indiceYO + "]")
            return true
        } else {
            console.log("No empezarPartida")
            return false
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
            // Guarda los Jugadores
            estadoPartida.indiceYO = parseInt(msg[2])
            estadoPartida.Jugadores[0].email = msg[3]
            estadoPartida.Jugadores[1].email = msg[4]
            estadoPartida.Jugadores[2].email = msg[5]
            estadoPartida.Jugadores[3].email = msg[6]

            console.log("Sí empezarPartida, id_partida: " + msg[1] + ", Jugadores: " + estadoPartida.Jugadores[0].email + ", " + estadoPartida.Jugadores[1].email + ", " + estadoPartida.Jugadores[2].email + ", " + estadoPartida.Jugadores[3].email + ", YOsoy [" + estadoPartida.indiceYO + "]")
            return true
        } else {
            console.log("No empezarPartida")
            return false
        }
    }
}


export async function lanzarDados(socket, email, id_partida) {
    if (socket) {
        socket.send(`lanzarDados,${email},${id_partida}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'DADOS') {
            estadoPartida.dado1 = parseInt(msg[1])
            estadoPartida.dado2 = parseInt(msg[2])
            estadoPartida.Jugadores[estadoPartida.indiceYO].posicion = parseInt(msg[3])
            estadoPartida.Jugadores[estadoPartida.indiceYO].estaCarcel = msg[4]
            console.log("Sí lanzarDados, dado1: " + estadoPartida.dado1 + " dado2: " + estadoPartida.dado2 + " posicion: " + estadoPartida.Jugadores[estadoPartida.indiceYO].posicion + " estaCarcel: " + msg[4])
            return true
        } else {
            console.log("No lanzarDados")
            return false
        }
    }
}


export async function apostar(socket, email, id_partida, cantidad, suerte) {
    if (socket) {
        socket.send(`APOSTAR,${email},${id_partida},${cantidad},${suerte}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'APOSTAR_OK') {
            //msg[2]      // nuevoDinero
            console.log("Sí apostar")
            return true
        } else {
            console.log("No apostar")
            return false
        }
    }
}


export async function meterBanco(socket, email, id_partida, cantidad) {
    if (socket) {
        socket.send(`METER,${email},${id_partida},${cantidad}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'METER_DINERO_BANCO') {
            //msg[3]  dineroJugadorBanco
            //msg[4]  dineroJugador
            console.log("Sí meterBanco")
            return true
        } else {
            console.log("No meterBanco")
            return false
        }
    }
}


export async function sacarBanco(socket, email, id_partida, cantidad) {
    if (socket) {
        socket.send(`SACAR,${email},${id_partida},${cantidad}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'SACAR_DINERO_BANCO') {
            //msg[3]  dineroJugadorBanco
            //msg[4]  dineroJugador
            console.log("Sí sacarBanco")
            return true
        } else {
            console.log("No sacarBanco")
            return false
        }
    }
}


export async function comprarPropiedad(socket, email, propiedad, id_partida) {
    if (socket) {
        socket.send(`SI_COMPRAR_PROPIEDAD,${email},${propiedad},${id_partida}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'COMPRAR_OK') {
            //msg[3]  dineroJugador
            console.log("Sí comprarPropiedad")
            return true
        } else {
            console.log("No comprarPropiedad")
            return false
        }
    }
}


export async function noComprarPropiedad(socket) {
    if (socket) {
        socket.send(`NO_COMPRAR_PROPIEDAD`)
        //waitingForResponse = true
        //const response = await waitForResponse(socket)
        return true
    }
}


export async function venderPropiedad(socket, email, propiedad, id_partida) {
    if (socket) {
        socket.send(`venderPropiedad,${email},${propiedad},${id_partida}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'VENDER_OK') {
            //msg[2]  dineroJugador
            console.log("Sí venderPropiedad")
            return true
        } else {
            console.log("No venderPropiedad")
            return false
        }
    }
}


export async function quieroEdificar(socket, email, id_partida) {
    if (socket) {
        socket.send(`QUIERO_EDIFICAR,${email},${id_partida}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'EDIFICAR') {
            //msg[2]  resultadoFinal (propiedades que puede edificar)
            // puede ser que no haya msg[2], simplemente [0] y [1]
            console.log("Sí quieroEdificar")
            return true
        } else {
            console.log("No quieroEdificar")
            return false
        }
    }
}


export async function edificarPropiedad(socket, email, id_partida, propiedadPrecio) {
    if (socket) {
        socket.send(`EDIFICAR,${email},${id_partida},${propiedadPrecio}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'EDIFICAR_OK') {
            //msg[2]  dineroJugador
            console.log("Sí edificarPropiedad")
            return true
        } else {
            console.log("No edificarPropiedad")
            return false
        }
    }
}


export async function finTurno(socket, email, id_partida) {
    if (socket) {
        socket.send(`finTurno,${email},${id_partida}`)
        //waitingForResponse = true
        //const response = await waitForResponse(socket)
        return true
    }
}


export async function desplazarJugador(socket, email, id_partida, posicion) {
    if (socket) {
        socket.send(`DESPLAZARSE_CASILLA,${email},${id_partida},${posicion}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'DESPLAZAR_JUGADOR') {
            console.log("Sí desplazarJugador")
            return true
        } else {
            console.log("No desplazarJugador")
            return false
        }
    }
}


export async function crearTorneo(socket, email, nPartidas) {
    if (socket) {
        socket.send(`crearTorneo,${email},${nPartidas}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'CREADOT_OK') {
            //msg[1]    id_torneo
            console.log("Sí crearTorneo")
            return true
        } else {
            console.log("No crearTorneo")
            return false
        }
    }
}


export async function unirseTorneo(socket, email, id_torneo) {
    if (socket) {
        socket.send(`unirseTorneo,${email},${id_torneo}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'UNIRSET_OK') {
            //msg[1]    id_torneo
            console.log("Sí unirseTorneo")
            return true
        } else {
            console.log("No unirseTorneo")
            return false
        }
    }
}

/*
export async function intercambio(socket, email, id_torneo) {
    if (socket) {
        socket.send(`intercambio,${email},${id_torneo}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'UNIRSET_OK') {
            //msg[1]    id_torneo
            console.log("Sí intercambio")
            return true
        } else {
            console.log("No intercambio")
            return false
        }
    }
}
*/

export async function comprarSkin(socket, email, skin) {
    if (socket) {
        socket.send(`comprarSkin,${email},${skin}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'COMPRADA_OK') {
            //msg[2]    gemas
            console.log("Sí comprarSkin")
            return true
        } else {
            console.log("No comprarSkin")
            return false
        }
    }
}


export async function verSkins(socket, email) {
    if (socket) {
        socket.send(`verSkins,${email}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'LISTA_SKIN') {
            //msg[2]    lista skins
            console.log("Sí verSkins")
            return true
        } else {
            console.log("No verSkins")
            return false
        }
    }
}


export async function chat(socket, email, id_partida, mensaje) {
    if (socket) {
        socket.send(`chat,${email},${id_partida},${mensaje}`)
        //waitingForResponse = true
        //const response = await waitForResponse(socket)
        return true
    }
}