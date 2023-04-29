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
            if (waitingForResponse) {
                waitingForResponse = false
                resolve(event.data)
            } else {
                cambiarEstado(event.data)
            }
        }
    })
}

// Funcion para escribir en pantalla todas las variables
export function printEstado() {
    
    console.log(sesion)
    console.log(estadoPartida)
}


function cambiarEstado(data) {
    
    let msg = data.toString().split(",")
    switch (msg[0]) {

        case 'TURNO':
            //TURNO,${jugador},${ID_partida}
            estadoPartida.miTurno = true
            console.log("Es tu turno!!")
            break

        case 'REINICIAR_SUERTE':
            estadoPartida.tengoSuerte = '0'
            console.log("Reiniciar suerte")
            break

        case 'AUMENTAR_SUERTE':
            //AUMENTAR_SUERTE
            estadoPartida.tengoSuerte = '1'
            console.log("Aumentar suerte")
            break

        case 'ACTUALIZAR_USUARIO':
            //ACTUALIZAR_USUARIO,${ID_jugador},${dinero},${casilla},${propiedades}
            const jugadorIndex = estadoPartida.Jugadores.findIndex(jugador => jugador.email === msg[1]);
            estadoPartida.Jugadores[jugadorIndex].dinero = parseFloat(msg[2]);
            estadoPartida.Jugadores[jugadorIndex].posicion = parseInt(msg[3]);
            // Tomar los elementos desde el índice 4 (msg[4]) hasta el final
            const newMsg = msg.slice(4);
            // Reemplazar 'propiedad' con '' en cada elemento de newMsg
            const replacedMsg = newMsg.map(element => element.replace(/propiedad/g, ''));
            // Si es null, se queda null, sino es "propiedad1, propiedad2, ..." -> [1,2,...]
            estadoPartida.Jugadores[jugadorIndex].propiedades = replacedMsg;
            console.log("Actualizar usuario: " + msg[1] + " dinero: " + estadoPartida.Jugadores[jugadorIndex].dinero + " posicion: " + estadoPartida.Jugadores[jugadorIndex].posicion + " propiedades: " + estadoPartida.Jugadores[jugadorIndex].propiedades)
            break

        case 'NUEVO_DINERO_JUGADOR':
            //NUEVO_DINERO_JUGADOR,${ID_jugador},${nuevoDinero}
            estadoPartida.Jugadores[estadoPartida.indiceYO].dinero = parseFloat(msg[2])
            console.log("Nuevo dinero: " + estadoPartida.Jugadores[estadoPartida.indiceYO].dinero)
            break
            
        case 'ELIMINADO':
            //ELIMINADO
            estadoPartida.Jugadores[estadoPartida.indiceYO].muerto = true
            console.log("Has muerto!!")
            break

        case 'NUEVO_DINERO_BOTE':
            //NUEVO_DINERO_BOTE,${dineroBote}
            estadoPartida.dineroBote = parseFloat(msg[1])
            console.log("Dinero bote: " + estadoPartida.dineroBote)
            break

        case 'DINERO_APOSTAR':
            //DINERO_APOSTAR,${ID_jugador}
            estadoPartida.enCasino = true
            console.log("Has caido en Casino, apuesta dinero!!")
            break

        case 'OBTENER_BOTE':
            //OBTENER_BOTE,${ID_jugador},${dineroBote}
            estadoPartida.Jugadores[estadoPartida.indiceYO].dinero = parseFloat(msg[2])
            console.log("Obtener bote, dinero: " + estadoPartida.Jugadores[estadoPartida.indiceYO].dinero)
            break

        case 'ACCION_BANCO':
            //ACCION_BANCO,${ID_jugador},${ID_partida},${dineroBanco}
            estadoPartida.enBanco = true
            estadoPartida.dineroEnBanco = parseFloat(msg[3])
            console.log("Estas en banco, dinero en banco: " + estadoPartida.dineroEnBanco)
            break

        case 'DENTRO_CARCEL':
            //DENTRO_CARCEL,${ID_jugador}
            estadoPartida.enCarcel = true
            estadoPartida.Jugadores[estadoPartida.indiceYO].posicion = 11
            console.log("Has entrado a la carcel!!")
            break

        case 'SUPERPODER':
            //SUPERPODER,${superPoder}
            estadoPartida.superPoder = msg[1]
            console.log("SuperPoder: " + estadoPartida.superPoder)
            break

        case 'ELEGIR_CASILLA':
            //ELEGIR_CASILLA
            estadoPartida.elegirCasilla = true
            console.log("Elegir casilla")
            break

        case 'DESPLAZAR_JUGADOR':
            //DESPLAZAR_JUGADOR,${nuevaPosicion}
            estadoPartida.Jugadores[estadoPartida.indiceYO].posicion = parseInt(msg[1])
            console.log("Desplazar posicion: " + estadoPartida.Jugadores[estadoPartida.indiceYO].posicion)
            break

        case 'NADA':
            //NADA
            console.log("NADA")
            break

        case 'QUIERES_COMPRAR_PROPIEDAD':
            //QUIERES_COMPRAR_PROPIEDAD,${posicion},${ID_jugador},${ID_partida},${precio}
            estadoPartida.puedesComprarPropiedad = true
            estadoPartida.comprarPropiedad = parseInt(msg[1])
            estadoPartida.comprarPropiedadPrecio = parseFloat(msg[4])
            console.log("Quieres comprar propiedad: " + estadoPartida.comprarPropiedad + " al precio: " + estadoPartida.comprarPropiedadPrecio)
            break

        case 'NUEVO_DINERO_ALQUILER':
            //NUEVO_DINERO_ALQUILER,${dineroJugadorPaga},${dineroJugadorRecibe}
            estadoPartida.Jugadores[estadoPartida.indiceYO].dinero = parseFloat(msg[1])
            console.log("Nuevo dinero alquiler, dinero: " + estadoPartida.Jugadores[estadoPartida.indiceYO].dinero)
            break

        case 'NUEVO_DINERO_ALQUILER_RECIBES':
            //NUEVO_DINERO_ALQUILER_RECIBES,${dineroJugadorRecibe},${ID_jugador},${dineroJugadorPaga}
            estadoPartida.Jugadores[estadoPartida.indiceYO].dinero = parseFloat(msg[1])
            const indiceJugadorPropiedad = estadoPartida.Jugadores.findIndex(jugador => jugador.email === msg[2]);
            estadoPartida.Jugadores[indiceJugadorPropiedad].dinero = parseFloat(msg[3])
            console.log("Nuevo dinero alquiler, recibes dinero: " + estadoPartida.Jugadores[estadoPartida.indiceYO].dinero + " desde: " + msg[2], + " [" + indiceJugadorPropiedad + "] " + " jugador paga: " + estadoPartida.Jugadores[indiceJugadorPropiedad].dinero)
            break
        
        case 'CASILLA':
            //CASILLA
            console.log("¿Quieres finalizar tu turno?")
            break
        
        case 'CHAT':
            //CHAT,"${ID_jugador}, ${mensaje}
            estadoPartida.chat.push(msg[1] + ": " + msg[2])
            console.log("Chat recibo: " + msg[1] + ": " + msg[2])
            break

        case 'JugadorMuerto':
            //JugadorMuerto,${ID_jugador}
            const indiceMuerto = estadoPartida.Jugadores.findIndex(jugador => jugador.email === msg[1]);
            estadoPartida.Jugadores[indiceMuerto].muerto = true
            console.log("Jugador muerto: " + estadoPartida.Jugadores[indiceMuerto].email)
            break

        case 'FIN_RONDA':
            //FIN_RONDA, ${ronda}
            estadoPartida.ronda = parseInt(msg[1])
            console.log("Ronda número: " + estadoPartida.ronda)
            break

        case 'EVENTO':
            //EVENTO,${efecto}
            estadoPartida.evento = msg[1]
            console.log("Evento: " + estadoPartida.evento)
            break

        case 'ECONOMIA':
            //ECONOMIA,${economia}
            estadoPartida.economia = parseFloat(msg[1])
            console.log("Economia: " + estadoPartida.economia)
            break

        case 'ACTUALIZAR_BANCO':
            //ACTUALIZAR_BANCO,${dinero}
            estadoPartida.dineroEnBanco = parseFloat(msg[1])
            console.log("Actualiza dinero en banco: " + estadoPartida.dineroEnBanco)
            break

        case 'ACTUALIZAR_DINERO_BANCO':
            //ACTUALIZAR_DINERO_BANCO,${dinero}
            estadoPartida.dineroEnBanco = parseFloat(msg[1])
            console.log("Actualiza dinero en banco: " + estadoPartida.dineroEnBanco)
            break


        default:
            console.log("!!!!!!! NUEVO MSG !!!!!!! " + data)
    }
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
            sesion.email = msg[1]           // Guarda email
            sesion.gemas = parseInt(msg[2]) // Guarda gemas
            return true
        } else {
            console.log("No iniciarSesion")
            return false
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
            estadoPartida.id_partida = parseInt(msg[1])   // Guarda id_partida
            return true
        } else {
            console.log("No crearPartida")
            return false
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
            estadoPartida.id_partida = parseInt(msg[1])   // Guarda id_partida
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
        
        estadoPartida.reiniciarVariablesNuevaPartida()

        let msg = response.toString().split(",")
        if (msg[0] === 'EMPEZAR_OK') {
            // Guarda los Jugadores
            estadoPartida.indiceYO = parseInt(msg[2])
            estadoPartida.Jugadores[0].email = msg[3]
            estadoPartida.Jugadores[1].email = msg[4]
            estadoPartida.Jugadores[2].email = msg[5]
            estadoPartida.Jugadores[3].email = msg[6]
            estadoPartida.Jugadores[0].skin = msg[7]
            estadoPartida.Jugadores[1].skin = msg[8]
            estadoPartida.Jugadores[2].skin = msg[9]
            estadoPartida.Jugadores[3].skin = msg[10]

            console.log("Sí empezarPartida, id_partida: " + msg[1] + ", Jugadores: " + estadoPartida.Jugadores[0].email + " skin: " + estadoPartida.Jugadores[0].skin + ", " + estadoPartida.Jugadores[1].email + " skin: " + estadoPartida.Jugadores[1].skin + ", " + estadoPartida.Jugadores[2].email + " skin: " + estadoPartida.Jugadores[2].skin + ", " + estadoPartida.Jugadores[3].email + " skin: " + estadoPartida.Jugadores[3].skin + ", YOsoy [" + estadoPartida.indiceYO + "]")
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

        estadoPartida.reiniciarVariablesNuevaPartida()

        let msg = response.toString().split(",")
        if (msg[0] === 'EMPEZAR_OK') {
            // Guarda los Jugadores
            estadoPartida.indiceYO = parseInt(msg[2])
            estadoPartida.Jugadores[0].email = msg[3]
            estadoPartida.Jugadores[1].email = msg[4]
            estadoPartida.Jugadores[2].email = msg[5]
            estadoPartida.Jugadores[3].email = msg[6]
            estadoPartida.Jugadores[0].skin = msg[7]
            estadoPartida.Jugadores[1].skin = msg[8]
            estadoPartida.Jugadores[2].skin = msg[9]
            estadoPartida.Jugadores[3].skin = msg[10]

            console.log("Sí empezarPartida, id_partida: " + msg[1] + ", Jugadores: " + estadoPartida.Jugadores[0].email + " skin: " + estadoPartida.Jugadores[0].skin + ", " + estadoPartida.Jugadores[1].email + " skin: " + estadoPartida.Jugadores[1].skin + ", " + estadoPartida.Jugadores[2].email + " skin: " + estadoPartida.Jugadores[2].skin + ", " + estadoPartida.Jugadores[3].email + " skin: " + estadoPartida.Jugadores[3].skin + ", YOsoy [" + estadoPartida.indiceYO + "]")
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
            estadoPartida.enCarcel = Boolean(parseInt(msg[4]))
            console.log("Sí lanzarDados, dado1: " + estadoPartida.dado1 + " dado2: " + estadoPartida.dado2 + " posicion: " + estadoPartida.Jugadores[estadoPartida.indiceYO].posicion + " enCarcel: " + estadoPartida.enCarcel)
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
            estadoPartida.Jugadores[estadoPartida.indiceYO].dinero = parseInt(msg[2])
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
            estadoPartida.dineroEnBanco = parseFloat(msg[3])
            estadoPartida.Jugadores[estadoPartida.indiceYO].dinero = parseFloat(msg[4])
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
            estadoPartida.dineroEnBanco = parseFloat(msg[3])
            estadoPartida.Jugadores[estadoPartida.indiceYO].dinero = parseFloat(msg[4])
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
            //msg[2]  propiedad
            //msg[3]  dineroJugador
            estadoPartida.Jugadores[estadoPartida.indiceYO].dinero = parseFloat(msg[3])
            estadoPartida.Jugadores[estadoPartida.indiceYO].propiedades.push(parseInt(msg[2]));
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
        console.log("No quiero comprar propiedad")
        return true
    }
}


export async function quieroVenderPropiedad(socket, email, id_partida, propiedad) {
    if (socket) {
        socket.send(`QUIERO_VENDER_PROPIEDAD,${email},${propiedad},${id_partida}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'PRECIO_VENTA') {
            //msg[1]  precioPropiedad
            estadoPartida.precioVenta = parseFloat(msg[1])
            console.log("Sí quieroVenderPropiedad, precio de la propiedad " + propiedad + ": " + estadoPartida.precioVenta);
            return true;
        } else {
            console.log("No quieroVenderPropiedad");
            return false;
        }
    }
}


export async function venderPropiedad(socket, email, propiedad, id_partida) {
    if (socket) {
        socket.send(`venderPropiedad,${email},${propiedad},${id_partida}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'VENDER_OK') {
            //msg[1]  propiedad
            //msg[2]  dineroJugador
            
            // Actualizar el dinero del jugador
            estadoPartida.Jugadores[estadoPartida.indiceYO].dinero = parseFloat(msg[2]);

            // Eliminar la propiedad del array de propiedades
            const index = estadoPartida.Jugadores[estadoPartida.indiceYO].propiedades.indexOf(parseInt(msg[1]));
            if (index !== -1) {
                estadoPartida.Jugadores[estadoPartida.indiceYO].propiedades.splice(index, 1);
            }

            console.log("Sí venderPropiedad");
            return true;
        } else {
            console.log("No venderPropiedad");
            return false;
        }
    }
}


// Falta
export async function quieroEdificar(socket, email, id_partida) {
    if (socket) {
        socket.send(`QUIERO_EDIFICAR,${email},${id_partida}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'EDIFICAR') {
            //msg[2]  resultadoFinal (propiedades que puede edificar)
            // puede ser que no haya msg[2], simplemente [0] y [1]
            console.log(msg)
            console.log("Sí quieroEdificar")
            return true
        } else {
            console.log("No quieroEdificar")
            return false
        }
    }
}

// Falta
export async function edificarPropiedad(socket, email, id_partida, propiedad, precio) {
    if (socket) {
        socket.send(`EDIFICAR,${email},${id_partida},${propiedad}-${precio}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'EDIFICAR_OK') {
            //msg[2]  dineroJugador
            console.log(msg)
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

        estadoPartida.reiniciarVariablesTurno();
        
        console.log("Turno finalizado")
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
            estadoPartida.Jugadores[estadoPartida.indiceYO].posicion = parseInt(msg[1])
            console.log("Sí desplazarJugador, desplazar posicion: " + estadoPartida.Jugadores[estadoPartida.indiceYO].posicion)
            return true
        } else {
            console.log("No desplazarJugador")
            return false
        }
    }
}

// Falta
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

// Falta
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

// Falta
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


export async function comprarSkin(socket, email, skin) {
    if (socket) {
        socket.send(`comprarSkin,${email},${skin}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'SKIN_COMPRADA_OK') {
            //msg[2]    gemas
            sesion.gemas = parseInt(msg[2])
            console.log("Sí comprarSkin")
            return true
        } else {
            console.log("No comprarSkin")
            return false
        }
    }
}

// Falta
export async function verSkins(socket, email) {
    if (socket) {
        socket.send(`MOSTRAR_SKINS,${email}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'LISTA_SKIN') {
            //msg[2]    lista skins
            console.log(msg)
            console.log("Sí verSkins")
            return true
        } else {
            console.log("No verSkins")
            return false
        }
    }
}


export async function equiparSkin(socket, email, skin) {
    if (socket) {
        socket.send(`EQUIPAR_SKIN,${email},${skin}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'SKIN_EQUIPADA_OK') {
            //msg[2]    skin
            sesion.skinEquipada = msg[2]
            console.log("Sí equiparSkin")
            return true
        } else {
            console.log("No equiparSkin")
            return false
        }
    }
}


export async function chat(socket, email, id_partida, mensaje) {
    if (socket) {
        socket.send(`chat,${email},${id_partida},${mensaje}`)
        estadoPartida.chat.push(estadoPartida.Jugadores[estadoPartida.indiceYO].email + ": " + mensaje)
        console.log("Chat envio: " + estadoPartida.Jugadores[estadoPartida.indiceYO] + ": " + mensaje)
        return true
    }
}


export async function venderEdificacion(socket, email, id_partida, propiedad) {
    if (socket) {
        socket.send(`venderEdificio,${email},${id_partida},${propiedad}`)
        waitingForResponse = true
        const response = await waitForResponse(socket)

        let msg = response.toString().split(",")
        if (msg[0] === 'VENDER_EDIFICACION_OK') {
            //msg[2]    dineroJugador
            estadoPartida.Jugadores[estadoPartida.indiceYO].dinero = parseFloat(msg[2])
            console.log("Sí venderEdificacion")
            return true
        } else {
            console.log("No venderEdificacion")
            return false
        }
    }
}