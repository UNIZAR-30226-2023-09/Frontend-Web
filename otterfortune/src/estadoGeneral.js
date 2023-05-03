/******************************************************************************
* Asignatura: Proyecto Software (2022/2023)                                    *
* Fichero: estadoGeneral.js                                                    *
* Autor: David Rivera Seves (NIP: 815124)                                      *
******************************************************************************/

// Clase Sesion, información de sesión
class Sesion {
    constructor() {
        this.email = null;           // string
        this.gemas = null;           // int
        this.skinEquipada = null;    // string
        this.tableroEquipada = null  // string
        this.todasSkins = [];        // [nombre: string, precio: string], sesion.todasSkins[i].nombre, sesion.todasSkins[i].precio
    }
}

// Clase Jugador, incialmente con estos valores
class Jugador {
    constructor() {
        this.email = null           // string
        this.skin = null            // string
        this.dinero = 1000          // float
        this.posicion = 1           // int
        this.propiedades = []       // int [2, 3, 1, 39]
        this.numCasas = new Map()   // estadoPartida.Jugadores[i].numCasas.set(key, value), estadoPartida.Jugadores[i].numCasas.get(key)
        this.muerto = false         // bool
        this.enCarcel = false       // bool
    }
}

// Clase para mantener el estado de una partida
class EstadoPartida {

    constructor() {
        // Información de la partida y de mi usuario
        this.id_partida = null      // int
        this.ronda = 1              // int
        this.dado1 = null           // int
        this.dado2 = null           // int
        this.dineroEnBanco = 0      // float
        this.dineroBote = 0         // float
        this.tengoSuerte = null     // string '0' o '1'
        this.comprarPropiedad = null        // int
        this.comprarPropiedadPrecio = null  // float
        this.evento = "Ninguno"     // string
        this.economia = 1           // float
        this.chat = [];             // string ["pablo: hola", "alex: adios"]
        this.resultCasino = false   // bool
        this.elegirCasilla = false  // bool
        this.superPoder = null      // string
        this.precioVenta = null     // float

        this.propiedadesEdificar = []   // [nombre: string, precio: string], estadoPartida.propiedadesEdificar[i].nombre, estadoPartida.propiedadesEdificar[i].precio

        this.subastaJugador = null      // string
        this.subastaPropiedad = null    // int
        this.subastaPrecio = null       // float

        this.hasGanado = false          // bool
        this.hasQuedadoPosicion = null  // int

        // Variables de turno
        this.puedesComprarPropiedad = false // bool
        this.enBanco = false        // bool
        this.enCasino = false       // bool
        this.miTurno = false        // bool
        this.pagoAlquiler = false;  // bool
        this.subastaIniciada = false // bool


        // Jugadores[indiceYO] es mi usuario
        // Se actualiza al indice real cuando inicia partida
        this.indiceYO = 0           // int [0, 3]

        // Vector de Jugadores
        this.Jugadores = [
            new Jugador(),          // Jugador0  [0]
            new Jugador(),          // Jugador1  [1]
            new Jugador(),          // Jugador2  [2]
            new Jugador()           // Jugador3  [3]
        ]
    }

    // Reiniciar variables de turno
    reiniciarVariablesTurno() {
        // Variables de turno
        this.puedesComprarPropiedad = false // bool
        this.enBanco = false        // bool
        this.enCasino = false       // bool
        this.miTurno = false        // bool
        this.pagoAlquiler = false;  // bool
        this.subastaIniciada = false // bool
    }

    // Reiniciar variables para empezar nueva partida
    reiniciarVariablesNuevaPartida() {
        // Información de la partida y de mi usuario
        // this.id_partida = null      // int NOOOOOO BORRAR
        this.ronda = 1              // int
        this.dado1 = null           // int
        this.dado2 = null           // int
        this.dineroEnBanco = 0      // float
        this.dineroBote = 0         // float
        this.tengoSuerte = null     // string '0' o '1'
        this.comprarPropiedad = null        // int
        this.comprarPropiedadPrecio = null  // float
        this.evento = "Ninguno"     // string
        this.economia = 1           // float
        this.chat = [];             // string ["pablo: hola", "alex: adios"]
        this.resultCasino = false   // bool
        this.elegirCasilla = false  // bool
        this.superPoder = null      // string
        this.precioVenta = null     // float
        this.propiedadesEdificar = []   // [nombre: string, precio: string], estadoPartida.propiedadesEdificar[i].nombre, estadoPartida.propiedadesEdificar[i].precio
        this.subastaJugador = null      // string
        this.subastaPropiedad = null    // int
        this.subastaPrecio = null       // float
        this.hasGanado = false          // bool
        this.hasQuedadoPosicion = null  // int
        // Variables de turno
        this.puedesComprarPropiedad = false // bool
        this.enBanco = false        // bool
        this.enCasino = false       // bool
        this.miTurno = false        // bool
        this.pagoAlquiler = false;  // bool
        this.subastaIniciada = false // bool
        // Jugadores[indiceYO] es mi usuario
        // Se actualiza al indice real cuando inicia partida
        this.indiceYO = 0           // int [0, 3]
        // Vector de Jugadores
        this.Jugadores = [
            new Jugador(),          // Jugador0  [0]
            new Jugador(),          // Jugador1  [1]
            new Jugador(),          // Jugador2  [2]
            new Jugador()           // Jugador3  [3]
        ]
    }
}

// Instanciar clases, una instancia que se mantiene en todas las partes
const sesion = new Sesion()
const estadoPartida = new EstadoPartida()

// Exportar las instancias
export { sesion, estadoPartida }
