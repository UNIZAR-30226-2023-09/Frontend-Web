/******************************************************************************\
* Asignatura: Proyecto Software (2022/2023)                                    *
* Fichero: estadoGeneral.js                                                    *
* Autor: David Rivera Seves (NIP: 815124)                                      *
\******************************************************************************/

// Clase Sesion, información de sesión
class Sesion {
    constructor() {
        this.email = null;
        this.gemas = null;
    }
}

// Clase Jugador, incialmente con estos valores
class Jugador {
    constructor() {
        this.email = null;
        this.dinero = 1000;
        this.posicion = 1;
    }
}

// Clase para mantener el estado de una partida
class EstadoPartida {

    constructor() {
        // Información de mi usuario
        this.miTurno = false;
        this.enCarcel = false;

        // Información de la partida
        this.id_partida = null;

        // Jugadores[indiceYO] es mi usuario
        this.indiceYO = null;

        // Vector de Jugadores
        this.Jugadores = [
            new Jugador(), // Jugador0  [0]
            new Jugador(), // Jugador1  [1]
            new Jugador(), // Jugador2  [2]
            new Jugador()  // Jugador3  [3]
        ];

        this.dado1 = null;
        this.dado2 = null;
    }
}

// Instanciar las clases
const sesion = new Sesion();
const estadoPartida = new EstadoPartida();

// Exportar las instancias
export { sesion, estadoPartida };