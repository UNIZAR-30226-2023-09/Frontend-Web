/******************************************************************************
* Asignatura: Proyecto Software (2022/2023)                                    *
* Fichero: estadoGeneral.js                                                    *
* Autor: David Rivera Seves (NIP: 815124)                                      *
******************************************************************************/

// Clase Sesion, información de sesión
class Sesion {
    constructor() {
        this.email = null           // string
        this.gemas = null           // int
        this.skinEquipada = null    // string
    }
}

// Clase Jugador, incialmente con estos valores
class Jugador {
    constructor() {
        this.email = null           // string
        this.skin = null            // string
        this.dinero = 1000          // float
        this.posicion = 1           // int
        this.propiedades = [];      // int [2, 3, 1, 39]
        this.muerto = false         // bool
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
        this.enCarcel = false       // bool
        this.dineroEnBanco = 0      // float
        this.dineroBote = 0         // float
        this.tengoSuerte = null     // string '0' o '1'
        this.comprarPropiedad = null        // int
        this.comprarPropiedadPrecio = null  // float
        this.evento = null          // string
        this.economia = null        // float
        this.chat = [];             // string ["pablo: hola", "alex: adios"]
        this.resultCasino = false   // bool
        this.elegirCasilla = false  // bool
        this.superPoder = null      // string
        this.precioVenta = null     // float

        // Variables de turno
        this.puedesComprarPropiedad = false // bool
        this.enBanco = false        // bool
        this.enCasino = false       // bool
        this.miTurno = false        // bool
        this.pagoAlquiler = false;  // bool



        // Jugadores[indiceYO] es mi usuario
        this.indiceYO = null        // int [0, 3]

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
        this.puedesComprarPropiedad = false;
        this.enBanco = false;
        this.enCasino = false;
        this.miTurno = false;
    }

    // Reiniciar variables para empezar nueva partida
    reiniciarVariablesNuevaPartida() {
        // Información de la partida y de mi usuario
        // this.id_partida = null      // int NOOOOOO BORRAR
        this.ronda = 1              // int
        this.dado1 = null           // int
        this.dado2 = null           // int
        this.enCarcel = false       // bool
        this.dineroEnBanco = 0      // float
        this.dineroBote = 0         // float
        this.tengoSuerte = null     // string '0' o '1'
        this.comprarPropiedad = null        // int
        this.comprarPropiedadPrecio = null  // float
        this.evento = null          // string
        this.economia = null        // float
        this.chat = [];             // string ["pablo: hola", "alex: adios"]
        this.elegirCasilla = false  // bool
        this.superPoder = null      // string
        this.precioVenta = null     // float
        // Variables de turno
        this.puedesComprarPropiedad = false // bool
        this.enBanco = false        // bool
        this.enCasino = false       // bool
        this.miTurno = false        // bool
        // Jugadores[indiceYO] es mi usuario
        this.indiceYO = null        // int [0, 3]
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
