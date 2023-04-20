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
    }
}

// Clase Jugador, incialmente con estos valores
class Jugador {
    constructor() {
        this.email = null           // string
        this.dinero = 1000          // float
        this.posicion = 1           // int
        this.propiedades = [];      // int [2, 3, 1, 39]
    }
}

// Clase para mantener el estado de una partida
class EstadoPartida {

    constructor() {
        // Información de la partida y de mi usuario
        this.id_partida = null      // int
        this.dado1 = null           // int
        this.dado2 = null           // int
        this.miTurno = false        // bool
        this.enCarcel = false       // bool
        this.enBanco = false        // bool
        this.dineroEnBanco = null   // float
        this.apostarDinero = null   // bool
        this.dineroBote = null      // float
        this.tengoSuerte = null     // bool
        this.puedesComprarPropiedad = false // bool
        this.comprarPropiedad = null        // int
        this.comprarPropiedadPrecio = null  // float

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
