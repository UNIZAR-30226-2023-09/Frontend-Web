import React, { useState, useEffect  } from "react";
import './CSS/Tablero.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import tablero from './Imagenes/TABLERO.jpg'
import iconoChat from './Imagenes/iconoChat.png';
import Chat from './Chat';
import PopupEdificar from './PopupEdificar';
import PopupCasino from './PopupCasino';
import PopupPropiedad from "./PopupPropiedad";
import PopupPropiedadVender from "./PopupPropiedadVender";
import PopupBanco from "./PopupBanco";
import PopupIrCarcel from "./PopupIrCarcel";
import PopupMuerto from "./PopupMuerto";
import PopupEvento from "./PopupEvento";
import PopupSuperpoder from "./PopupSuperpoder";
import PopupSuperpoder1 from "./PopupSuperpoder1";
import PopupSubastar from "./PopupSubastar";
import PopupHaySubasta from "./PopupHaySubasta";

import dice1 from './Imagenes/Dice1.png';
import dice2 from './Imagenes/Dice2.png';
import dice3 from './Imagenes/Dice3.png';
import dice4 from './Imagenes/Dice4.png';
import dice5 from './Imagenes/Dice5.png';
import dice6 from './Imagenes/Dice6.png';

// Importar todas las imagenes de los jugadores de la carpeta Imagenes
import TITE from './Imagenes/TITE.png';
import PLEX from './Imagenes/PLEX.png';
import LUCAS from './Imagenes/LUCAS.png';
import JEANCARLO from './Imagenes/JEAN-CARLO.png';
import BAXTER from './Imagenes/BAXTER.png';
import BERTA from './Imagenes/BERTA.png';
import DIONIX from './Imagenes/DIONIX.png';
import JULS from './Imagenes/JULS.png';
// Importar los tableros
import TABLERO1 from './Imagenes/TABLEROS/WEB1.png';
import TABLERO2 from './Imagenes/TABLEROS/WEB2.png';
import TABLERO3 from './Imagenes/TABLEROS/WEB3.png';
import TABLERO4 from './Imagenes/TABLEROS/WEB4.png';
// Importar las tarjetas de los eventos
import EVENTO1 from './Imagenes/EVENTOS/EV1.png';
import EVENTO2 from './Imagenes/EVENTOS/EV2.png';
import EVENTO3 from './Imagenes/EVENTOS/EV3.png';
import EVENTO4 from './Imagenes/EVENTOS/EV4.png';
import EVENTO5 from './Imagenes/EVENTOS/EV5.png';
// Importar las tarjetas de las casas
import CASA1 from './Imagenes/CASAS_HOTEL/C1.png';
import CASA2 from './Imagenes/CASAS_HOTEL/C2.png';
import CASA3 from './Imagenes/CASAS_HOTEL/C3.png';
import CASA4 from './Imagenes/CASAS_HOTEL/C4.png';
import CASA5 from './Imagenes/CASAS_HOTEL/HOTEL.png';


// Importar todas las fichas de cada skin con sus colores y numeros 1-2-3-4
import fichaJEANCARLO1 from './Imagenes/FICHAS/AMARILLO1.png';
import fichaLUCAS1 from './Imagenes/FICHAS/ROJO1.png';
import fichaTITE1 from './Imagenes/FICHAS/MARRON1.png';
import fichaPLEX1 from './Imagenes/FICHAS/ROSA1.png';
import fichaBAXTER1 from './Imagenes/FICHAS/AZUL1.png';
import fichaBERTA1 from './Imagenes/FICHAS/NARANJA1.png';
import fichaDIONIX1 from './Imagenes/FICHAS/VERDE1.png';
import fichaJULS1 from './Imagenes/FICHAS/MORADO1.png';

import fichaJEANCARLO2 from './Imagenes/FICHAS/AMARILLO2.png';
import fichaLUCAS2 from './Imagenes/FICHAS/ROJO2.png';
import fichaTITE2 from './Imagenes/FICHAS/MARRON2.png';
import fichaPLEX2 from './Imagenes/FICHAS/ROSA2.png';
import fichaBAXTER2 from './Imagenes/FICHAS/AZUL2.png';
import fichaBERTA2 from './Imagenes/FICHAS/NARANJA2.png';
import fichaDIONIX2 from './Imagenes/FICHAS/VERDE2.png';
import fichaJULS2 from './Imagenes/FICHAS/MORADO2.png';

import fichaJEANCARLO3 from './Imagenes/FICHAS/AMARILLO3.png';
import fichaLUCAS3 from './Imagenes/FICHAS/ROJO3.png';
import fichaTITE3 from './Imagenes/FICHAS/MARRON3.png';
import fichaPLEX3 from './Imagenes/FICHAS/ROSA3.png';
import fichaBAXTER3 from './Imagenes/FICHAS/AZUL3.png';
import fichaBERTA3 from './Imagenes/FICHAS/NARANJA3.png';
import fichaDIONIX3 from './Imagenes/FICHAS/VERDE3.png';
import fichaJULS3 from './Imagenes/FICHAS/MORADO3.png';

import fichaJEANCARLO4 from './Imagenes/FICHAS/AMARILLO4.png';
import fichaLUCAS4 from './Imagenes/FICHAS/ROJO4.png';
import fichaTITE4 from './Imagenes/FICHAS/MARRON4.png';
import fichaPLEX4 from './Imagenes/FICHAS/ROSA4.png';
import fichaBAXTER4 from './Imagenes/FICHAS/AZUL4.png';
import fichaBERTA4 from './Imagenes/FICHAS/NARANJA4.png';
import fichaDIONIX4 from './Imagenes/FICHAS/VERDE4.png';
import fichaJULS4 from './Imagenes/FICHAS/MORADO4.png';


import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';
import PopupGanador from "./PopupGanador";


export const Tablero = (props) => {

    const socket = useSocket();

    const [abrirChat, setAbrirChat] = useState(false);

    const [veces, setVeces] = useState(0); // Para abrir/cerrar el chat

    // Mostrar info de las propiedades en el mas de cada propiedad
    const [openCarta, setOpenCarta] = useState(false);
    // Mostrar la casilla del casino
    const [openCasino, setOpenCasino] = useState(false);
    // Mostrar la carta de cada propiedad cuando cae en cada casilla
    const [openPropiedad, setOpenPropiedad] = useState(false);
    // Mostrar la pantalla de vender propiedad
    const [openVenderProp, setOpenVenderProp] = useState(false);
    // Mostrar la pantalla del banco
    const [openBanco, setOpenBanco] = useState(false);
    // Mostrar la pantalla de ir a la carcel
    const [openIrCarcel, setOpenIrCarcel] = useState(false);
    // Para controlar que solo se tiren una vez los dados
    const [tirarDados, setTirarDados] = useState(true);

    // Para los dados
    const [diceFace, setDiceFace] = useState(dice1);
    const [diceFace2, setDiceFace2] = useState(dice1);

    // Saber la posicion de cada jugador
    const [posicion1,setPosicion1] = useState(1);
    const [posicion2,setPosicion2] = useState(1);
    const [posicion3,setPosicion3] = useState(1);
    const [posicion4,setPosicion4] = useState(1);

    const [jugadoresVisible, setJugadoresVisible] = useState(false);
    const [propiedadesVisible, setPropiedadesVisible] = useState(false);

    // Para saber en que propiedad he caido
    const [propiedadCaida, setPropiedadCaida] = useState(0);
    // Para saber que propiedad vender
    const [propiedadVender, setPropiedadVender] = useState(0);

    // Para saber cuando mostrar el evento
    const [eventoVisible, setEventoVisible] = useState(false);

    // Para saber cuando mostrar el superpoder
    const [superpoderVisible, setSuperpoderVisible] = useState(false);

    // Para saber cuando mostrar la de edificar
    const [edificarVisible, setEdificarVisible] = useState(false);
    const [propiedadEdificar, setPropiedadEdificar] = useState(0);

    // Para el superpoder 1
    const [superpoder1Visible, setSuperpoder1Visible] = useState(false);

    // Para mostrar las subastas
    const [subastaVisible, setSubastaVisible] = useState(false);
    const [subastaPropiedad, setSubastaPropiedad] = useState(0);

    const [num1, setNum1] = useState(1);
    const [num2, setNum2] = useState(1);

    /* ----------------------------------TABLERO-------------------------------*/
    let tableroPropiedades = ["nada","Salida", "Monterrey", "Guadalajara", "Treasure", "Tax", "AeropuertoNarita", // 6
    "Tokio", "Kioto", "Superpoder", "Osaka", "Carcel", "Roma", "Milan", "Casino", "Napoles", // 15
    "Aeropuerto Heathrow", "Londres", "Superpoder", "Manchester", "Edimburgo", "Bote", "Madrid", // 22
    "Barcelona", "Treasure", "Zaragoza", "AeropuertoOrly", "Paris", "Banco", "Marsella", // 29
    "Lyon", "IrCarcel", "Toronto", "Vancouver", "Treasure", "Ottawa", "AeropuertoDeLosAngeles", // 36
    "NuevaYork", "LosAngeles", "LuxuryTax", "Chicago"];

    // Funcion que dado el nombre de una propiedad, devuelve su posicion en el tablero
    function posicionTablero(nombrePropiedad){
        let posicion = 0;
        for(let i = 0; i < tableroPropiedades.length; i++){
            if(tableroPropiedades[i] === nombrePropiedad){
                posicion = i;
            }
        }
        return posicion;
    }

    /* ----------------- COORDENADAS CASILLAS DEL TABLERO JUGADOR 1 ------------------------*/
    const casillas1 = new Map();

    // Estas son la columna izquierda de abajo arriba
    // --> 1px = 0.06%
    // 38 de ancho 33 de largo
    casillas1.set("Casilla1", { top: "680px", left: "2.5%", width: "38px", height: "33px" });

    casillas1.set("Casilla2", { top: "606px", left: "2.5%", width: "38px", height: "33px" });
    // TODO: Para meter mas -> +25 en left empezando en 15
    //casillas1.set("Casilla2", { top: "615px", left: "15px", width: "5.8%", height: "5.8%" });
    //casillas1.set("Casilla2.1", { top: "615px", left: "40px", width: "5.8%", height: "5.8%" });
    //casillas1.set("Casilla2.2", { top: "615px", left: "65px", width: "50px", height: "50px" });
    //casillas1.set("Casilla2.3", { top: "615px", left: "90px", width: "50px", height: "50px" });
    casillas1.set("Casilla3", { top: "548px", left: "2.5%", width: "38px", height: "33px" });

   // casillas1.set("Casilla3", { top: "555px", left: "50px", width: "50px", height: "50px" });
    casillas1.set("Casilla4", { top: "485px", left: "2.5%", width: "38px", height: "33px" });
    casillas1.set("Casilla5", { top: "425px", left: "2.5%", width: "38px", height: "33px" });
    casillas1.set("Casilla6", { top: "365px", left: "2.5%", width: "38px", height: "33px" });
    casillas1.set("Casilla7", { top: "304px", left: "2.5%", width: "38px", height: "33px" });
    casillas1.set("Casilla8", { top: "244px", left: "2.5%", width: "38px", height: "33px" });
    casillas1.set("Casilla9", { top: "180px", left: "2.5%", width: "38px", height: "33px" });
    casillas1.set("Casilla10", { top: "120px", left: "2.5%", width: "38px", height: "33px" });

    // Estas son la fila de arriba de izquierda a derecha
    //casillas1.set("Casilla11-carcel", { top: "65px", left: "80px", width: "50px", height: "50px" });
    //casillas1.set("Casilla11-noCarcel", { top: "20px", left: "20px", width: "50px", height: "50px" });
    casillas1.set("Casilla11", { top: "1.4%", left: "6.5%", width: "38px", height: "33px" });

    casillas1.set("Casilla12", { top: "4.1%", left: "8.8%", width: "38px", height: "33px" });
    casillas1.set("Casilla13", { top: "4.1%", left: "13.2%", width: "38px", height: "33px" });
    casillas1.set("Casilla14", { top: "4.1%", left: "17.5%", width: "38px", height: "33px" });
    casillas1.set("Casilla15", { top: "4.1%", left: "22.1%", width: "38px", height: "33px" });
    casillas1.set("Casilla16", { top: "4.1%", left: "26.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla17", { top: "4.1%", left: "31.1%", width: "38px", height: "33px" });
    casillas1.set("Casilla18", { top: "4.1%", left: "35.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla19", { top: "4.1%", left: "40.1%", width: "38px", height: "33px" });
    casillas1.set("Casilla20", { top: "4.1%", left: "44.7%", width: "38px", height: "33px" });

    // Estas son la columna de la derecha de arriba a abajo
    casillas1.set("Casilla21", { top: "38px", left: "50%", width: "38px", height: "33px" });
    
    casillas1.set("Casilla22", { top: "120px", left: "50.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla23", { top: "180px", left: "50.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla24", { top: "244px", left: "50.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla25", { top: "304px", left: "50.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla26", { top: "365px", left: "50.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla27", { top: "425px", left: "50.7%", width: "38px", height: "33px"});
    casillas1.set("Casilla28", { top: "485px", left: "50.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla29", { top: "548px", left: "50.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla30", { top: "606px", left: "50.7%", width: "38px", height: "33px" });
    
    // Esta es la fila de abajo de derecha a izquierda
    casillas1.set("Casilla31", { top: "690px", left: "51%", width: "38px", height: "33px" });

    casillas1.set("Casilla40", { top: "695px", left: "8.8%", width: "38px", height: "33px" });
    casillas1.set("Casilla39", { top: "695px", left: "13.2%", width: "38px", height: "33px" });
    casillas1.set("Casilla38", { top: "695px", left: "17.5%", width: "38px", height: "33px" });
    casillas1.set("Casilla37", { top: "695px", left: "22.1%", width: "38px", height: "33px" });
    casillas1.set("Casilla36", { top: "695px", left: "26.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla35", { top: "695px", left: "31.1%", width: "38px", height: "33px" });
    casillas1.set("Casilla34", { top: "695px", left: "35.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla33", { top: "695px", left: "40.1%", width: "38px", height: "33px" });
    casillas1.set("Casilla32", { top: "695px", left: "44.7%", width: "38px", height: "33px" });

    /* -------------------------------------------------------------------------------------*/
    /* ----------------- COORDENADAS CASILLAS DEL TABLERO JUGADOR 2 ------------------------*/
    const casillas2 = new Map();

    // Estas son la columna izquierda de abajo arriba
    // --> 1px = 0.06%
    // 38 de ancho 33 de largo
    casillas2.set("Casilla1", { top: "680px", left: "4.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla2", { top: "606px", left: "4.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla3", { top: "548px", left: "4.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla4", { top: "485px", left: "4.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla5", { top: "425px", left: "4.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla6", { top: "365px", left: "4.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla7", { top: "304px", left: "4.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla8", { top: "244px", left: "4.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla9", { top: "180px", left: "4.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla10", { top: "120px", left: "4.8%", width: "38px", height: "33px" });

    // Estas son la fila de arriba de izquierda a derecha
    casillas2.set("Casilla11", { top: "3.7%", left: "6.5%", width: "38px", height: "33px" });

    casillas2.set("Casilla12", { top: "4.1%", left: "10.6%", width: "38px", height: "33px" });
    casillas2.set("Casilla13", { top: "4.1%", left: "15.1%", width: "38px", height: "33px" });
    casillas2.set("Casilla14", { top: "4.1%", left: "19.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla15", { top: "4.1%", left: "24.3%", width: "38px", height: "33px" });
    casillas2.set("Casilla16", { top: "4.1%", left: "28.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla17", { top: "4.1%", left: "33.2%", width: "38px", height: "33px" });
    casillas2.set("Casilla18", { top: "4.1%", left: "37.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla19", { top: "4.1%", left: "42.1%", width: "38px", height: "33px" });
    casillas2.set("Casilla20", { top: "4.1%", left: "46.7%", width: "38px", height: "33px" });

    // Estas son la columna de la derecha de arriba a abajo
    casillas2.set("Casilla21", { top: "38px", left: "52.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla22", { top: "120px", left: "52.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla23", { top: "180px", left: "52.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla24", { top: "244px", left: "52.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla25", { top: "304px", left: "52.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla26", { top: "365px", left: "52.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla27", { top: "425px", left: "52.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla28", { top: "485px", left: "52.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla29", { top: "548px", left: "52.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla30", { top: "606px", left: "52.7%", width: "38px", height: "33px" });
    
    // Esta es la fila de abajo de derecha a izquierda
    casillas2.set("Casilla31", { top: "690px", left: "53%", width: "38px", height: "33px" });

    casillas2.set("Casilla40", { top: "695px", left: "10.6%", width: "38px", height: "33px" });
    casillas2.set("Casilla39", { top: "695px", left: "15.1%", width: "38px", height: "33px" });
    casillas2.set("Casilla38", { top: "695px", left: "19.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla37", { top: "695px", left: "24.3%", width: "38px", height: "33px" });
    casillas2.set("Casilla36", { top: "695px", left: "28.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla35", { top: "695px", left: "33.2%", width: "38px", height: "33px" });
    casillas2.set("Casilla34", { top: "695px", left: "37.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla33", { top: "695px", left: "42.1%", width: "38px", height: "33px" });
    casillas2.set("Casilla32", { top: "695px", left: "46.7%", width: "38px", height: "33px" });

    /* -------------------------------------------------------------------------------------*/
    /* ----------------- COORDENADAS CASILLAS DEL TABLERO JUGADOR 3 ------------------------*/
    const casillas3 = new Map();

    // Estas son la columna izquierda de abajo arriba
    // --> 1px = 0.06%
    // 38 de ancho 33 de largo
    casillas3.set("Casilla1", { top: "730px", left: "2.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla2", { top: "635px", left: "2.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla3", { top: "574px", left: "2.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla4", { top: "515px", left: "2.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla5", { top: "453px", left: "2.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla6", { top: "393px", left: "2.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla7", { top: "332px", left: "2.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla8", { top: "270px", left: "2.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla9", { top: "210px", left: "2.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla10", { top: "147px", left: "2.5%", width: "38px", height: "33px" });

    // Estas son la fila de arriba de izquierda a derecha
    casillas3.set("Casilla11", { top: "6.2%", left: "6.5%", width: "38px", height: "33px" });

    casillas3.set("Casilla12", { top: "7.6%", left: "8.8%", width: "38px", height: "33px" });
    casillas3.set("Casilla13", { top: "7.6%", left: "13.2%", width: "38px", height: "33px" });
    casillas3.set("Casilla14", { top: "7.6%", left: "17.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla15", { top: "7.6%", left: "22.1%", width: "38px", height: "33px" });
    casillas3.set("Casilla16", { top: "7.6%", left: "26.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla17", { top: "7.6%", left: "31.1%", width: "38px", height: "33px" });
    casillas3.set("Casilla18", { top: "7.6%", left: "35.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla19", { top: "7.6%", left: "40.1%", width: "38px", height: "33px" });
    casillas3.set("Casilla20", { top: "7.6%", left: "44.7%", width: "38px", height: "33px" });

    // Estas son la columna de la derecha de arriba a abajo
    casillas3.set("Casilla21", { top: "7.6%", left: "50%", width: "38px", height: "33px" });

    casillas3.set("Casilla22", { top: "147px", left: "50.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla23", { top: "210px", left: "50.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla24", { top: "270px", left: "50.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla25", { top: "333px", left: "50.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla26", { top: "393px", left: "50.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla27", { top: "450px", left: "50.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla28", { top: "515px", left: "50.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla29", { top: "574px", left: "50.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla30", { top: "635px", left: "50.7%", width: "38px", height: "33px" });
    
    // Esta es la fila de abajo de derecha a izquierda
    casillas3.set("Casilla31", { top: "720px", left: "51%", width: "38px", height: "33px" });

    casillas3.set("Casilla32", { top: "730px", left: "44.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla33", { top: "730px", left: "40.1%", width: "38px", height: "33px" });
    casillas3.set("Casilla34", { top: "730px", left: "35.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla35", { top: "730px", left: "31.1%", width: "38px", height: "33px" });
    casillas3.set("Casilla36", { top: "730px", left: "26.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla37", { top: "730px", left: "22.1%", width: "38px", height: "33px" });
    casillas3.set("Casilla38", { top: "730px", left: "17.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla39", { top: "730px", left: "13.2%", width: "38px", height: "33px" });
    casillas3.set("Casilla40", { top: "730px", left: "8.8%", width: "38px", height: "33px" });

    /* -------------------------------------------------------------------------------------*/
    /* ----------------- COORDENADAS CASILLAS DEL TABLERO JUGADOR 4 ------------------------*/
    const casillas4 = new Map();

    // Estas son la columna izquierda de abajo arriba
    // --> 1px = 0.06%
    // 38 de ancho 33 de largo
    casillas4.set("Casilla1", { top: "730px", left: "4.8%", width: "38px", height: "33px" });
    casillas4.set("Casilla2", { top: "635px", left: "4.8%", width: "38px", height: "33px" });
    // TODO: Para meter mas -> +25 en left empezando en 15
    //casillas4.set("Casilla2", { top: "615px", left: "15px", width: "5.8%", height: "5.8%" });
    //casillas4.set("Casilla2.1", { top: "615px", left: "40px", width: "5.8%", height: "5.8%" });
    //casillas4.set("Casilla2.2", { top: "615px", left: "65px", width: "50px", height: "50px" });
    //casillas4.set("Casilla2.3", { top: "615px", left: "90px", width: "50px", height: "50px" });
    casillas4.set("Casilla3", { top: "574px", left: "4.8%", width: "38px", height: "33px" });
   // casillas4.set("Casilla3", { top: "555px", left: "50px", width: "50px", height: "50px" });
    casillas4.set("Casilla4", { top: "515px", left: "4.8%", width: "38px", height: "33px" });
    casillas4.set("Casilla5", { top: "453px", left: "4.8%", width: "38px", height: "33px" });
    casillas4.set("Casilla6", { top: "393px", left: "4.8%", width: "38px", height: "33px" });
    casillas4.set("Casilla7", { top: "332px", left: "4.8%", width: "38px", height: "33px" });
    casillas4.set("Casilla8", { top: "270px", left: "4.8%", width: "38px", height: "33px" });
    casillas4.set("Casilla9", { top: "210px", left: "4.8%", width: "38px", height: "33px" });
    casillas4.set("Casilla10", { top: "147px", left: "4.8%", width: "38px", height: "33px" });

    // Estas son la fila de arriba de izquierda a derecha
    //casillas4.set("Casilla11-carcel", { top: "65px", left: "80px", width: "50px", height: "50px" });
    //casillas4.set("Casilla11-noCarcel", { top: "20px", left: "20px", width: "50px", height: "50px" });
    casillas4.set("Casilla11", { top: "8.6%", left: "6.5%", width: "38px", height: "33px" });

    casillas4.set("Casilla12", { top: "7.6%", left: "10.6%", width: "38px", height: "33px" });
    casillas4.set("Casilla13", { top: "7.6%", left: "15.1%", width: "38px", height: "33px" });
    casillas4.set("Casilla14", { top: "7.6%", left: "19.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla15", { top: "7.6%", left: "24.3%", width: "38px", height: "33px" });
    casillas4.set("Casilla16", { top: "7.6%", left: "28.8%", width: "38px", height: "33px" });
    casillas4.set("Casilla17", { top: "7.6%", left: "33.2%", width: "38px", height: "33px" });
    casillas4.set("Casilla18", { top: "7.6%", left: "37.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla19", { top: "7.6%", left: "42.1%", width: "38px", height: "33px" });
    casillas4.set("Casilla20", { top: "7.6%", left: "46.7%", width: "38px", height: "33px" });

    // Estas son la columna de la derecha de arriba a abajo
    casillas4.set("Casilla21", { top: "7.6%", left: "52.7%", width: "38px", height: "33px" });
    
    casillas4.set("Casilla22", { top: "147px", left: "52.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla23", { top: "210px", left: "52.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla24", { top: "270px", left: "52.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla25", { top: "333px", left: "52.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla26", { top: "393px", left: "52.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla27", { top: "450px", left: "52.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla28", { top: "515px", left: "52.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla29", { top: "574px", left: "52.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla30", { top: "635px", left: "52.7%", width: "38px", height: "33px" });
    
    // Esta es la fila de abajo de derecha a izquierda
    casillas4.set("Casilla31", { top: "720px", left: "53%", width: "38px", height: "33px" });

    casillas4.set("Casilla32", { top: "730px", left: "46.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla33", { top: "730px", left: "42.1%", width: "38px", height: "33px" });
    casillas4.set("Casilla34", { top: "730px", left: "37.1%", width: "38px", height: "33px" });
    casillas4.set("Casilla35", { top: "730px", left: "33.2%", width: "38px", height: "33px" });
    casillas4.set("Casilla36", { top: "730px", left: "28.8%", width: "38px", height: "33px" });
    casillas4.set("Casilla37", { top: "730px", left: "24.3%", width: "38px", height: "33px" });
    casillas4.set("Casilla38", { top: "730px", left: "19.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla39", { top: "730px", left: "15.1%", width: "38px", height: "33px" });
    casillas4.set("Casilla40", { top: "730px", left: "10.6%", width: "38px", height: "33px" });
    /* -------------------------------------------------------------------------------------*/

    /* ----------------- COORDENADAS CASILLAS DEL TABLERO JUGADOR 1 ------------------------*/
    const casitas = new Map();

    casitas.set("Casilla1", { top: "620px", left: "7.2%", width: "26px", height: "26px" });
    casitas.set("Casilla2", { top: "620px", left: "7.2%", width: "26px", height: "26px" });
    casitas.set("Casilla3", { top: "560px", left: "7.2%", width: "26px", height: "26px" });
    casitas.set("Casilla4", { top: "620px", left: "7.2%", width: "26px", height: "26px" });
    casitas.set("Casilla5", { top: "620px", left: "7.2%", width: "26px", height: "26px" });
    casitas.set("Casilla6", { top: "620px", left: "7.2%", width: "26px", height: "26px" });

    casitas.set("Casilla7", { top: "318px", left: "7.2%", width: "26px", height: "26px" });
    casitas.set("Casilla8", { top: "258px", left: "7.2%", width: "26px", height: "26px" });
    casitas.set("Casilla9", { top: "620px", left: "7.2%", width: "26px", height: "26px" });
    casitas.set("Casilla10", { top: "135px", left: "7.2%", width: "26px", height: "26px" });

    

    casitas.set("Casilla12", { top: "11.8%", left: "10.3%", width: "26px", height: "26px" });
    casitas.set("Casilla13", { top: "11.8%", left: "14.7%", width: "26px", height: "26px" });
    casitas.set("Casilla14", { top: "11.8%", left: "10.3%", width: "26px", height: "26px" });
    casitas.set("Casilla15", { top: "11.8%", left: "23.6%", width: "26px", height: "26px" });
    casitas.set("Casilla16", { top: "11.8%", left: "10.3%", width: "26px", height: "26px" });
    casitas.set("Casilla17", { top: "11.8%", left: "32.6%", width: "26px", height: "26px" });
    casitas.set("Casilla18", { top: "11.8%", left: "10.3%", width: "26px", height: "26px" });
    casitas.set("Casilla19", { top: "11.8%", left: "41.4%", width: "26px", height: "26px" });
    casitas.set("Casilla20", { top: "11.8%", left: "46%", width: "26px", height: "26px" });

    // Estas son la columna de la derecha de arriba a abajo
    
    casitas.set("Casilla22", { top: "140px", left: "49%", width: "26px", height: "26px" });
    casitas.set("Casilla23", { top: "197px", left: "49%", width: "26px", height: "26px" });
    casitas.set("Casilla24", { top: "11.8%", left: "10.3%", width: "26px", height: "26px" });
    casitas.set("Casilla25", { top: "320px", left: "49%", width: "26px", height: "26px" });
    casitas.set("Casilla26", { top: "11.8%", left: "10.3%", width: "26px", height: "26px" });
    casitas.set("Casilla27", { top: "440px", left: "49%", width: "26px", height: "26px" });
    casitas.set("Casilla28", { top: "11.8%", left: "10.3%", width: "26px", height: "26px" });
    casitas.set("Casilla29", { top: "565px", left: "49%", width: "26px", height: "26px" });
    casitas.set("Casilla30", { top: "625px", left: "49%", width: "26px", height: "26px" });
    
    // Esta es la fila de abajo de derecha a izquierda
    casitas.set("Casilla31", { top: "11.8%", left: "10.3%", width: "26px", height: "26px" });
    casitas.set("Casilla32", { top: "665px", left: "46%", width: "26px", height: "26px" });
    casitas.set("Casilla33", { top: "665px", left: "41.4%", width: "26px", height: "26px" });
    casitas.set("Casilla34", { top: "11.8%", left: "10.3%", width: "26px", height: "26px" });
    casitas.set("Casilla35", { top: "665px", left: "32.4%", width: "26px", height: "26px" });
    casitas.set("Casilla36", { top: "11.8%", left: "10.3%", width: "26px", height: "26px" });
    casitas.set("Casilla37", { top: "665px", left: "23.5%", width: "26px", height: "26px" });
    casitas.set("Casilla38", { top: "665px", left: "18.8%", width: "26px", height: "26px" });
    casitas.set("Casilla39", { top: "620px", left: "7.2%", width: "26px", height: "26px" });
    casitas.set("Casilla40", { top: "665px", left: "10.1%", width: "25px", height: "25px" });
    /* -------------------------------------------------------------------------------------*/


    const [vecesAbierto, setVecesAbierto] = useState(1);
    // Funcion que compruebe cuando sea mi turno si hay algun evento y mostrar la tarjeta correspondiente
    useEffect(() => {
        // Aquí comprobamos si la variable es true o false
        if (vecesAbierto === 0 && estadoPartida.evento !== "Ninguno") {
            setEventoVisible(true);
            setVecesAbierto(1);
        } 
        if (estadoPartida.evento === "Ninguno") {
            setEventoVisible(false);
            setVecesAbierto(0);
        }
    }, [estadoPartida.evento]);    


    // Funcion que dada una posicion devuelva el nombre de la posicion del tablero
    const nombrePosicion = (posicion) => {
        return tableroPropiedades[posicion];
    };

    // Funcion que cada segundo actualiza la posicion de los jugadores de la partida
    const actualizarPosicion = () => {
        setPosicion1(estadoPartida.Jugadores[0].posicion);
        setPosicion2(estadoPartida.Jugadores[1].posicion);
        setPosicion3(estadoPartida.Jugadores[2].posicion);
        setPosicion4(estadoPartida.Jugadores[3].posicion);
    };
    
    useEffect(() => {
        const intervalId = setInterval(actualizarPosicion, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const rollDice = async () => {
        setTirarDados(false);
        let numRolls = 10; // número de veces que se cambiará la cara del dado
        let rollDelay = 100; // tiempo en milisegundos entre cada cambio de cara
    
        // función que se ejecutará cada vez que cambie la cara del dado
        const rollStep = async () => {
            // elige una cara aleatoria del dado
            const faces = [{numero: 1, imagen: dice1}, {numero: 2, imagen: dice2}, {numero: 3, imagen: dice3}, {numero: 4, imagen: dice4}, {numero: 5, imagen: dice5}, {numero: 6, imagen: dice6}];

            //const randomFace = faces[Math.floor(Math.random() * faces.length)].imagen;
            //const randomFace2 = faces[Math.floor(Math.random() * faces.length)].imagen;
            const randomIndex = Math.floor(Math.random() * faces.length);
            const randomFace = faces[randomIndex];
            const randomNumber = randomFace.numero;
            const randomImage = randomFace.imagen;

            const randomIndex2 = Math.floor(Math.random() * faces.length);
            const randomFace2 = faces[randomIndex2];
            const randomNumber2 = randomFace2.numero;
            const randomImage2 = randomFace2.imagen;

            // cambia la cara del dado
            setDiceFace(randomImage);
            setDiceFace2(randomImage2);

            // si aún quedan cambios por hacer, programa el siguiente cambio
            if (numRolls > 0) {
                numRolls--;
                setTimeout(rollStep, rollDelay);
            }
            else {
                // guardamos la última cara del dado en posicion1 y posicion2
                // TODO: Aquí sería darle el valor de los dados del mensaje obtenido

                const seguir = await socketActions.lanzarDados(socket, sesion.email, estadoPartida.id_partida);
                // quedarme dormido 1 segundo antes de continuar
                await new Promise(resolve => setTimeout(resolve, 100));
                if (seguir === true) {
                    //setPosicion1(estadoPartida.Jugadores[estadoPartida.indiceYO].posicion);
                    // Actualizar las posiciones de los jugadores
                    actualizarPosicion();
                    if (estadoPartida.indiceYO === 0) {
                        setPosicion1(estadoPartida.Jugadores[0].posicion);
                    }
                    else if (estadoPartida.indiceYO === 1) {
                        setPosicion2(estadoPartida.Jugadores[1].posicion);
                    }
                    else if (estadoPartida.indiceYO === 2) {
                        setPosicion3(estadoPartida.Jugadores[2].posicion);
                    }
                    else if (estadoPartida.indiceYO === 3) {
                        setPosicion4(estadoPartida.Jugadores[3].posicion);
                    }

                    setNum1(estadoPartida.dado1);
                    setNum2(estadoPartida.dado2);
                    setDiceFace(faces[estadoPartida.dado1 - 1].imagen);
                    setDiceFace2(faces[estadoPartida.dado2 - 1].imagen);
                    console.log("dado1: " + estadoPartida.dado1)
                    console.log("dado2: " + estadoPartida.dado2)
                    // Si son los dados iguales que deje volver a tirarlos
                    if (estadoPartida.dado1 === estadoPartida.dado2) {
                        setTirarDados(true);
                    }
                    // TODO: Aquí sería mirar lo que hacer según cada casilla
                    // Hacer un if else con los valores booleanos de EstadoPartida y mostrar
                    // una pantalla u otra dependiendo de lo que sea true
                    // Mostrar en un consolo logsi es true o false la variable estadoPartida.puedesComprarPropiedad
                    console.log("puedes comprar propiedad: " + estadoPartida.puedesComprarPropiedad);
                    
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                    // Cuando caes en la de superpoder
                    if (estadoPartida.superPoder !== null) {
                        setSuperpoderVisible(true);
                        // Si es el superpoder 1
                        if (estadoPartida.superPoder == 1) {
                            setSuperpoder1Visible(true);
                        }
                    }

                    if (estadoPartida.puedesComprarPropiedad) {
                        setPropiedadCaida(tableroPropiedades[estadoPartida.Jugadores[estadoPartida.indiceYO].posicion]);
                        setOpenPropiedad(true);
                    }

                    // Casilla del banco
                    if (estadoPartida.enBanco) {
                        setOpenBanco(true);
                    }

                    // Casilla del casino
                    if (estadoPartida.enCasino) {
                        setOpenCasino(true);
                    }

                    // TODO: MIRAR LA DE IR CARCEL
                    if (estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 31) {
                        setOpenIrCarcel(true);
                    }

                    // Tengo que pagar alquiler a otro jugador
                    if (estadoPartida.pagoAlquiler) {
                        window.alert("Tienes que pagar el alquiler de: " + nombrePosicion(estadoPartida.Jugadores[estadoPartida.indiceYO].posicion));
                        estadoPartida.pagoAlquiler = false;  // bool
                    }

                    // Cuando caes en la casilla de tax
                    if (estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 5) {
                        window.alert("Tienes que pagar un tax por tus propiedades");
                    }

                    // Cuando caes en la casilla de luxury tax
                    if (estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 39) {
                        window.alert("Tienes que pagar un luxury tax por tus propiedades");
                    }

                    // Cuando caes en la casilla de treasure
                    if (estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 4 || estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 24 || estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 34) {
                        window.alert("Casilla de suerte!");
                    }
                }

            }
        };
    
        // empieza a cambiar la cara del dado
        rollStep();

    };

    const handleCloseChat = (e) => {
        setAbrirChat(false);
    }

    const handleChat = () => {
        if (veces === 0) {
            setAbrirChat(true);
            setVeces(1);
        }
        else {
            setAbrirChat(false);
            setVeces(0);   
        }
    }
    
    const popUpChat = (
        // De esta forma, en popup, a través del props, se podrá acceder
        // a handleClose y a content
        // Se le puede pasar cualquier cosa
        <Chat handleClose={handleCloseChat} />
    );

    // TODO: Obtener lista de jugadores
    //       Obtener dinero de cada uno
    //       Obtener el nombre dado el email
    //       Obtener la posición

    // Funcion que dado un nombre y un numero, compruebe el nombre de la ficha y, para cada nombre
    // compruebe el numero que es y devuelva la imagen de la ficha en mayusculas
    function obtenerFicha(nombre, numero) {
        switch (nombre) {
            case "TITE":
                switch (numero) {
                    case 1:
                        return fichaTITE1;
                    case 2:
                        return fichaTITE2;
                    case 3:
                        return fichaTITE3;
                    case 4:
                        return fichaTITE4;
                }
            case "LUCAS":
                switch (numero) {
                    case 1:
                        return fichaLUCAS1;
                    case 2:
                        return fichaLUCAS2;
                    case 3:
                        return fichaLUCAS3;
                    case 4:
                        return fichaLUCAS4;
                }
            case "PLEX":
                switch (numero) {
                    case 1:
                        return fichaPLEX1;
                    case 2:
                        return fichaPLEX2;
                    case 3:
                        return fichaPLEX3;
                    case 4:
                        return fichaPLEX4;
                }
            case "JEANCARLO":
                switch (numero) {
                    case 1:
                        return fichaJEANCARLO1;
                    case 2:
                        return fichaJEANCARLO2;
                    case 3:
                        return fichaJEANCARLO3;
                    case 4:
                        return fichaJEANCARLO4;
                }
            case "BERTA":
                switch (numero) {
                    case 1:
                        return fichaBERTA1;
                    case 2:
                        return fichaBERTA2;
                    case 3:
                        return fichaBERTA3;
                    case 4:
                        return fichaBERTA4;
                }
            case "BAXTER":
                switch (numero) {
                    case 1:
                        return fichaBAXTER1;
                    case 2:
                        return fichaBAXTER2;
                    case 3:
                        return fichaBAXTER3;
                    case 4:
                        return fichaBAXTER4;
                }
            case "DIONIX":
                switch (numero) {
                    case 1:
                        return fichaDIONIX1;
                    case 2:
                        return fichaDIONIX2;
                    case 3:
                        return fichaDIONIX3;
                    case 4:
                        return fichaDIONIX4;
                }
            case "JULS":
                switch (numero) {
                    case 1:
                        return fichaJULS1;
                    case 2:
                        return fichaJULS2;
                    case 3:
                        return fichaJULS3;
                    case 4:
                        return fichaJULS4;
                }
            }
    }

    // Funcion que dado el nombre de una SKIN, devuelva la imagen de la ficha con el nombre importado
    function obtenerSkin(nombre) {
        switch (nombre) {
            case "TITE":
                return TITE;
            case "LUCAS":
                return LUCAS;
            case "PLEX":
                return PLEX;
            case "JEANCARLO":
                return JEANCARLO;
            case "BERTA":
                return BERTA;
            case "BAXTER":
                return BAXTER;
            case "DIONIX":
                return DIONIX;
            case "JULS":
                return JULS;
            case "TABLERO1":
                return TABLERO1;
            case "TABLERO2":
                return TABLERO2;
            case "TABLERO3":
                return TABLERO3;
            case "TABLERO4":
                return TABLERO4;
            // TODO: BOT
        }
    }

    // Funcion que dado el nombre de un tablero, devuelva la imagen del tablero con el nombre importado
    function obtenerTablero(nombre) {
        switch (nombre) {
            case "TABLERO1":
                return TABLERO1;
            case "TABLERO2":
                return TABLERO2;
            case "TABLERO3":
                return TABLERO3;
            case "TABLERO4":
                return TABLERO4;
        }
    }


    const jugadores1 = [
        { nombre: estadoPartida.Jugadores[0].email, imagen: obtenerSkin(estadoPartida.Jugadores[0].skin), dinero: estadoPartida.Jugadores[0].dinero, ficha: obtenerFicha(estadoPartida.Jugadores[0].skin,1), muerto: estadoPartida.Jugadores[0].muerto },
        { nombre: estadoPartida.Jugadores[1].email, imagen: obtenerSkin(estadoPartida.Jugadores[1].skin), dinero: estadoPartida.Jugadores[1].dinero, ficha: obtenerFicha(estadoPartida.Jugadores[1].skin,2), muerto: estadoPartida.Jugadores[1].muerto },
        { nombre: estadoPartida.Jugadores[2].email, imagen: obtenerSkin(estadoPartida.Jugadores[2].skin), dinero: estadoPartida.Jugadores[2].dinero, ficha: obtenerFicha(estadoPartida.Jugadores[2].skin,3), muerto: estadoPartida.Jugadores[2].muerto },
        { nombre: estadoPartida.Jugadores[3].email, imagen: obtenerSkin(estadoPartida.Jugadores[3].skin), dinero: estadoPartida.Jugadores[3].dinero, ficha: obtenerFicha(estadoPartida.Jugadores[3].skin,4), muerto: estadoPartida.Jugadores[3].muerto },
    ];


    // Comprobar que posicion de la partida soy yo, comparando sesion.email con estadoPartida.Jugadores[i].email
    // y guardar el indice en indiceYO
    let indiceYO = 0;
    for (let i = 0; i < estadoPartida.Jugadores.length; i++) {
        if (sesion.email === estadoPartida.Jugadores[i].email) {
            indiceYO = i;
        }
    }

    // Funcion que dado una lista de propiedades (con el numero de la propiedad) de un jugador
    // devuelve una lista, buscando en el vector del tablero esa posicion y devolviendo el nombre de la propiedad
    const obtenerNombrePropiedades = (listaPropiedades) => {
        let listaNombres = [];
        for (let i = 0; i < listaPropiedades.length; i++) {
            listaNombres.push(tableroPropiedades[listaPropiedades[i]]);
        }
        return listaNombres;
    }

    let listaPropiedades = obtenerNombrePropiedades(estadoPartida.Jugadores[indiceYO].propiedades);

    // Gestiona la ventana emergente de comprar propiedades
    const mostrarPopUpPropiedad = (e) => {
        setOpenCarta(true);
    }

    // Gestiona el cierre de la ventana emergente
    const handleCloseCarta = (e) => {
        setOpenCarta(false);
        setOpenPropiedad(false);
        setOpenIrCarcel(false);
    }

    // Gestiona la ventana emergente de comprar propiedades
    const handleCloseComprarPropiedad = (comprada) => {
        setOpenPropiedad(false);
        estadoPartida.puedesComprarPropiedad = false;
        if (comprada === 1) {
            window.alert("Has comprado la propiedad correctamente");
        }
        else if (comprada === 0) {
            window.alert("No tienes suficiente dinero para comprar la propiedad");
        }
    }

    // Gestiona la ventana emergente de vender propiedades
    const mostrarVender = (propiedad) => {
        console.log("Propiedad a vender: " + propiedad);
        setPropiedadVender(propiedad);
        setOpenVenderProp(true);
    }
    
    const handleCloseVender = (vendida) => {
        setOpenVenderProp(false);
        if (vendida === 1) {
            window.alert("Has vendido la propiedad correctamente");
        }
    }

    // Gestiona la ventana emergente del banco
    const mostrarBanco = (e) => {
        setOpenBanco(true);
    }

    const handleCloseBanco = (e) => {
        estadoPartida.enBanco = false;
        setOpenBanco(false);
    }

    // Gestiona la ventana emergente de cerrar el casino
    const handleCloseCasino = (ganado) => {
        estadoPartida.enCasino = false;
        if (ganado === 1) {
            window.alert("Has duplicado tu apuesta");
        }
        else if (ganado === 0) {
            window.alert("Has perdido tu apuesta");
        }
        setOpenCasino(false);
    }

    // Gestiona el fin del turno
    const handleFinTurno = async (e) => {
        // TODO: Aqui seria mandar al servidor que se ha acabado el turno
        await socketActions.finTurno(socket, sesion.email, estadoPartida.id_partida);
        estadoPartida.miTurno = false;
        // Mandar el mensaje de quiero edificar
        await socketActions.quieroEdificar(socket, sesion.email, estadoPartida.id_partida);
        setTirarDados(true);
    }

    // Gestiona cerrar el evento
    const handleCloseEvento = (e) => {
        setVecesAbierto(100);
        setEventoVisible(false);
    }

    // Gestiona cerrar el superpoder
    const handleCloseSuperpoder = (e) => {
        setSuperpoderVisible(false);
        // Si no es el 1
        if (estadoPartida.superPoder !== 1) {
            estadoPartida.superPoder = null;
        }
    }

    // Gestiona cerrar el superpoder 1
    const handleCloseSuperpoder1 = async (posicion) => {
        setSuperpoder1Visible(false);
        estadoPartida.superPoder = null;
        if (posicion !== null) {
            let resultado = await socketActions.desplazarJugador(socket, sesion.email, estadoPartida.id_partida, posicion);
            if (resultado) {
                window.alert("Te has desplazado correctamente");
            }
            else {
                window.alert("No te puedes desplazar a esa posicion");
            }
        }
    }

    // Gestionar pagar salir carcel
    const handlePagarCarcel = async (e) => {
        // await socketActions.pagarSalirCarcel(socket, sesion.email, estadoPartida.id_partida);
        // estadoPartida.enCarcel = false;
        // estadoPartida.miTurno = false;
        if (estadoPartida.Jugadores[estadoPartida.indiceYO].dinero < 50) {
            window.alert("No tienes suficiente dinero para salir de la carcel");
        }
        else {
            let resultado = await socketActions.pagarLiberarseCarcel(socket, sesion.email, estadoPartida.id_partida);
            if (resultado) {
                window.alert("Has pagado para salir de la carcel");
            }
            else {
                window.alert("No has podido pagar para salir de la carcel");
            }
        }

    }

    // Gestiona abrir edificar
    const handleEdificar = (propiedad) => {
        setEdificarVisible(true);
        setPropiedadEdificar(propiedad)
    }

    // Gestiona cerrar edificar
    const handleCloseEdificar = (edificada, propiedadPosicion) => {
        if (edificada === 1) {
            window.alert("Has edificado la propiedad correctamente");
        }
    
        else if (estadoPartida.Jugadores[estadoPartida.indiceYO].numCasas.get(propiedadPosicion) >= 5)  {
            window.alert("No puedes edificar más casas en esta propiedad");
        }         
        else if (edificada === 0) {
            window.alert("No tienes suficiente dinero para edificar la propiedad");
        }
        setEdificarVisible(false);
    }

    // Para gestionar la subasta
    const mostrarSubasta = (propiedad) => {
        setSubastaVisible(true);
        setSubastaPropiedad(propiedad);
    }

    // Para cerrar la subasta
    const handleCloseSubasta = (resultado) => {
        if (resultado === 1) {
            window.alert("Se ha iniciado la subasta correctamente");
        }
        else if (resultado === 0) {
            window.alert("Ya hay una subasta en curso");
        }
        setSubastaVisible(false);
    }

    // Para gestionar cuando alguien hace subasta
    const handleCloseHaySubasta = (resultado) => {
        if (resultado === 1) {
            window.alert("Has ganado la subasta");
        }
        else if (resultado === 0) {
            window.alert("Se te han adelantado y te han ganado la subasta");
        }
        estadoPartida.subastaIniciada = false;
        setHaySubastaDisponible(false);
    }

    // Para gestionar cuando alguien hace subasta
    const [vecesAbiertoSubasta, setVecesAbiertoSubasta] = useState(1);
    const [haySubastaDisponible, setHaySubastaDisponible] = useState(false);
    //             : estadoPartida.subastaIniciada ? <PopupHaySubasta handleClose={handleCloseHaySubasta}/>

    // Funcion que compruebe cuando sea mi turno si hay algun evento y mostrar la tarjeta correspondiente
    useEffect(() => {
        // Aquí comprobamos si la variable es true o false
        // vecesAbiertoSubasta === 0 && 
        if (estadoPartida.subastaIniciada) {
            setHaySubastaDisponible(true);
            setVecesAbiertoSubasta(1);
        } 
        else {
            setHaySubastaDisponible(false);
            setVecesAbiertoSubasta(0);
        }
    }, [estadoPartida.subastaIniciada]);  

    

    // Gestiona la ventana emergente (lo que lo lanza)
    const popupCarta = (
        <PopupEdificar handleClose={handleCloseEdificar} />
    );
    
    const popUpCasino = (
        <PopupCasino handleClose={handleCloseCasino} />
    );

    const popUpPropiedad = (
        <PopupPropiedad handleClose={handleCloseComprarPropiedad} propiedad={propiedadCaida} />
    );

    const popUpVender = (
        <PopupPropiedadVender handleClose={handleCloseVender} propiedad={propiedadVender} />
    );

    const popUpBanco = (
        <PopupBanco handleClose={handleCloseBanco} />
    );

    const popUpIrCarcel = (
        <PopupIrCarcel handleClose={handleCloseCarta} />
    );

    const popUpEvento = (
        <PopupEvento handleClose={handleCloseEvento} evento={estadoPartida.evento} />
    );

    const popUpSuperpoder = (
        <PopupSuperpoder handleClose={handleCloseSuperpoder} superPoder={estadoPartida.superPoder}/>
    );

    const popUpSuperpoder1 = (
        <PopupSuperpoder1 handleClose={handleCloseSuperpoder1} superPoder={estadoPartida.superPoder}/>
    );

    const popUpEdificar = (
        <PopupEdificar handleClose={handleCloseEdificar} propiedad={propiedadEdificar}/>
    );

    const popUpSubasta = (
        <PopupSubastar handleClose={handleCloseSubasta} propiedad={subastaPropiedad}/>
    );

    const popUpHaySubasta = (
        <PopupHaySubasta handleClose={handleCloseHaySubasta} />
    );

      

    // Funcion que dado el numero de casas de una propiedad devuelve la imagen correspondiente
    const obtenerImagenCasas = (numCasas) => {
        switch (numCasas) {
            case 1:
                return CASA1;
            case 2:
                return CASA2;
            case 3:
                return CASA3;
            case 4:
                return CASA4;
            case 5:
                return CASA5;
        }
    }


      
    const [showDice, setShowDice] = useState(false);
    // Para mostrar bien los dados cuando yo sea el primero en tirar
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setShowDice(true);
        //comprobarMuerte();
    }, 300);
  
    return () => {
        clearTimeout(timeoutId);
    };
    }, []);


    // TODO: Mirar cuantas gemas has ganado en la partida y pasarlas al popupMuerto
    return (
        <>
            {estadoPartida.Jugadores[indiceYO].muerto ? (
                <PopupMuerto email={sesion.email} gemas={sesion.gemas} gemasGanadas={2}/>
            ) 
            : estadoPartida.hasGanado ? <PopupGanador email={sesion.email} gemas={sesion.gemas} gemasGanadas={5}/>    
            : (

                
                <div className="row">
                    <div className="col-7">
                        <img src={obtenerTablero(sesion.tableroEquipada)} className="imagen-tablero w-100" alt="Tablero" />
                        
                        {showDice && estadoPartida.miTurno && (
                                    
                            <div onClick={() => tirarDados  && rollDice()}>
                                <div className="posicion-dadoIzq">
                                    <img src={diceFace} />
                                </div>
                                <div className="posicion-dadoDcha">
                                    <img src={diceFace2} />
                                </div>
                            </div>
                        )}



                        {!jugadores1[0].muerto &&
                            <div style={{ 
                                    position: 'absolute', 
                                    top: estadoPartida.Jugadores[0].enCarcel ? '2.4%' : casillas1.get(`Casilla${posicion1}`).top, 
                                    left: estadoPartida.Jugadores[0].enCarcel ? '4.5%' : casillas1.get(`Casilla${posicion1}`).left}}>
                                <img src={jugadores1[0].ficha} style={{width:  casillas1.get(`Casilla${posicion1}`).width, height: casillas1.get(`Casilla${posicion1}`).height}} />
                            </div>
                        }
                        {listaPropiedades.map((propiedad, index) => {
                            let posicion = posicionTablero(propiedad);
                            {/* Hacer un bucle que dado el numero de una posicion, busque en el vector estadoPartida.propiedadesEdificar[i].nombre === posicion*/}
                            let propiedadAE;

                            for (let i = 0; i < estadoPartida.propiedadesEdificar.length; i++) {
                                if (estadoPartida.propiedadesEdificar[i].nombre == posicion) {
                                    propiedadAE = estadoPartida.propiedadesEdificar[i];
                                    break;
                                }
                            }
                        

                            const numCasas = estadoPartida.Jugadores[0].numCasas.get(posicion);

                            return (
                                <>
                                {propiedadAE && numCasas > 0 && (
                                    <div style={{ position: 'absolute', top: casitas.get(`Casilla${posicion}`).top, left: casitas.get(`Casilla${posicion}`).left }}>
                                        <img src={obtenerImagenCasas(estadoPartida.Jugadores[0].numCasas.get(posicion))} style={{width: casitas.get(`Casilla${posicion}`).width, height: casitas.get(`Casilla${posicion}`).height }} />
                                    </div>    
                                )}
                                </>
                                
                            );

                        })}

                        {!jugadores1[1].muerto &&
                            <div style={{ 
                                    position: 'absolute', 
                                    top: estadoPartida.Jugadores[1].enCarcel ? '4.7%' : casillas2.get(`Casilla${posicion2}`).top, 
                                    left: estadoPartida.Jugadores[1].enCarcel ? '4.5%' : casillas2.get(`Casilla${posicion2}`).left }}>
                                <img src={jugadores1[1].ficha} style={{width:  casillas2.get(`Casilla${posicion2}`).width, height: casillas2.get(`Casilla${posicion2}`).height}} />
                            </div>
                        }

                        {listaPropiedades.map((propiedad, index) => {
                            let posicion = posicionTablero(propiedad);
                            {/* Hacer un bucle que dado el numero de una posicion, busque en el vector estadoPartida.propiedadesEdificar[i].nombre === posicion*/}
                            let propiedadAE;

                            for (let i = 0; i < estadoPartida.propiedadesEdificar.length; i++) {
                                if (estadoPartida.propiedadesEdificar[i].nombre == posicion) {
                                    propiedadAE = estadoPartida.propiedadesEdificar[i];
                                    break;
                                }
                            }
                        

                            const numCasas = estadoPartida.Jugadores[1].numCasas.get(posicion);

                            return (
                                <>
                                {propiedadAE && numCasas > 0 && (
                                    <div style={{ position: 'absolute', top: casitas.get(`Casilla${posicion}`).top, left: casitas.get(`Casilla${posicion}`).left }}>
                                        <img src={obtenerImagenCasas(estadoPartida.Jugadores[1].numCasas.get(posicion))} style={{width: casitas.get(`Casilla${posicion}`).width, height: casitas.get(`Casilla${posicion}`).height }} />
                                    </div>    
                                )}
                                </>
                                
                            );

                        })}

                        {!jugadores1[2].muerto &&
                            <div style={{ 
                                    position: 'absolute', 
                                    top: estadoPartida.Jugadores[2].enCarcel ? '7%' : casillas3.get(`Casilla${posicion3}`).top, 
                                    left: estadoPartida.Jugadores[2].enCarcel ? '4.5%' : casillas3.get(`Casilla${posicion3}`).left }}>
                                <img src={jugadores1[2].ficha} style={{width:  casillas3.get(`Casilla${posicion3}`).width, height: casillas3.get(`Casilla${posicion3}`).height}} />
                            </div>
                        }
                        {listaPropiedades.map((propiedad, index) => {
                            let posicion = posicionTablero(propiedad);
                            {/* Hacer un bucle que dado el numero de una posicion, busque en el vector estadoPartida.propiedadesEdificar[i].nombre === posicion*/}
                            let propiedadAE;

                            for (let i = 0; i < estadoPartida.propiedadesEdificar.length; i++) {
                                if (estadoPartida.propiedadesEdificar[i].nombre == posicion) {
                                    propiedadAE = estadoPartida.propiedadesEdificar[i];
                                    break;
                                }
                            }
                        

                            const numCasas = estadoPartida.Jugadores[2].numCasas.get(posicion);

                            return (
                                <>
                                {propiedadAE && numCasas > 0 && (
                                    <div style={{ position: 'absolute', top: casitas.get(`Casilla${posicion}`).top, left: casitas.get(`Casilla${posicion}`).left }}>
                                        <img src={obtenerImagenCasas(estadoPartida.Jugadores[2].numCasas.get(posicion))} style={{width: casitas.get(`Casilla${posicion}`).width, height: casitas.get(`Casilla${posicion}`).height }} />
                                    </div>    
                                )}
                                </>
                                
                            );

                        })}


                        {!jugadores1[3].muerto &&
                            <div style={{ 
                                    position: 'absolute', 
                                    top: estadoPartida.Jugadores[3].enCarcel ? '9.2%' : casillas4.get(`Casilla${posicion4}`).top, 
                                    left: estadoPartida.Jugadores[3].enCarcel ? '4.5%' : casillas4.get(`Casilla${posicion4}`).left }}>
                                <img src={jugadores1[3].ficha} style={{width:  casillas4.get(`Casilla${posicion4}`).width, height: casillas4.get(`Casilla${posicion4}`).height}} />
                            </div>
                        }

                        {listaPropiedades.map((propiedad, index) => {
                            let posicion = posicionTablero(propiedad);
                            {/* Hacer un bucle que dado el numero de una posicion, busque en el vector estadoPartida.propiedadesEdificar[i].nombre === posicion*/}
                            let propiedadAE;

                            for (let i = 0; i < estadoPartida.propiedadesEdificar.length; i++) {
                                if (estadoPartida.propiedadesEdificar[i].nombre == posicion) {
                                    propiedadAE = estadoPartida.propiedadesEdificar[i];
                                    break;
                                }
                            }
                        

                            const numCasas = estadoPartida.Jugadores[3].numCasas.get(posicion);

                            return (
                                <>
                                {propiedadAE && numCasas > 0 && (
                                    <div style={{ position: 'absolute', top: casitas.get(`Casilla${posicion}`).top, left: casitas.get(`Casilla${posicion}`).left }}>
                                        <img src={obtenerImagenCasas(estadoPartida.Jugadores[3].numCasas.get(posicion))} style={{width: casitas.get(`Casilla${posicion}`).width, height: casitas.get(`Casilla${posicion}`).height }} />
                                    </div>    
                                )}
                                </>
                                
                            );

                        })}

                    </div>
                    <div className="col-5">
                        <div className="">
                            
                            <div className="col-12 caja-jugadores">
                                <div className="btn-container">
                                    <input type="button" className="btn-jugadores" value="Información partida" />
                                </div>

                                <div className="lista-informacion">
                                    <ul>
                                        <li>Dinero en el banco: {estadoPartida.dineroEnBanco}$ </li>
                                        <li>Dinero en el bote: {estadoPartida.dineroBote}$</li>
                                        <li>Ronda actual: {estadoPartida.ronda}</li>
                                        <li>Evento: {estadoPartida.evento}</li>
                                        <li>Economía: {estadoPartida.economia} </li>
                                        
                                        {estadoPartida.Jugadores[estadoPartida.indiceYO].enCarcel && estadoPartida.miTurno && (
                                            <li>
                                                <button onClick={handlePagarCarcel}>Pagar 50$</button>
                                            </li>
                                        )}

                                        {estadoPartida.miTurno && !tirarDados && (
                                            <li>
                                                <button onClick={handleFinTurno}>Fin de turno</button>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                            </div>

                            <div className="col-12 caja-jugadores">
                                <div className="btn-container">
                                    <input type="button" className="btn-jugadores" value="Lista de jugadores" onClick={() => setJugadoresVisible(!jugadoresVisible)} />
                                </div>

                                {jugadoresVisible &&
                                    <div className="lista-jugadores">

                                        <ul style={{ display: 'flex', flexDirection: 'column' }}>
                                            {jugadores1.map((jugador) => (
                                                jugador.muerto ? null :
                                                <li key={jugador.nombre} style={{ display: 'flex', alignItems: 'center', marginRight: '80px', fontSize: '20px' }}>
                                                    <img src={jugador.ficha} alt={jugador.ficha} style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                                                    <img src={jugador.imagen} alt={jugador.nombre} style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                                                    <span style={{ marginRight: '10px' }}>{jugador.nombre}</span>
                                                    <span>{jugador.dinero}$</span>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                }

                            </div>

                            <div className="caja-propiedades">
                                <div className="row">
                                    <div className="col-12">

                                        <div className="btn-container">
                                            <input type="button" className="btn-propiedades" value="Propiedades" onClick={() => setPropiedadesVisible(!propiedadesVisible)} />
                                        </div>

                                    </div>
                                </div>

                                {propiedadesVisible &&
                                    <div className="lista-propiedades">
                                        <ul>
                                        {listaPropiedades.map((propiedad, index) => {
                                            let posicion = posicionTablero(propiedad);
                                            {/* Hacer un bucle que dado el numero de una posicion, busque en el vector estadoPartida.propiedadesEdificar[i].nombre === posicion*/}
                                            let propiedadAE;

                                            for (let i = 0; i < estadoPartida.propiedadesEdificar.length; i++) {
                                                if (estadoPartida.propiedadesEdificar[i].nombre == posicion) {
                                                    propiedadAE = estadoPartida.propiedadesEdificar[i];
                                                    break;
                                                }
                                            }
                                        
                                            return (
                                                <li key={index}>
                                                {propiedad}
                                                <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
                                                    <button className="subastar" onClick={() => mostrarSubasta(propiedad)}>
                                                        Subastar
                                                    </button>
                                                    <button className="vender" onClick={() => mostrarVender(propiedad)}>
                                                        Vender
                                                    </button>
                                                <div/>
                                    
                                                {propiedadAE && (
                                                    <button className="edificar" onClick={() =>handleEdificar(propiedad)}>
                                                        Edificar ({propiedadAE.precio}) - {estadoPartida.Jugadores[estadoPartida.indiceYO].numCasas.get(posicion)}
                                                    </button>
                                                )}
                                                </li>
                                                
                                            );

                                        })}
                                        </ul>
                                    </div>
                                }

                                {openVenderProp && popUpVender}
                                {edificarVisible && popUpEdificar}
                                {openCasino && popUpCasino}
                                {openPropiedad && popUpPropiedad}
                                {openBanco && popUpBanco}
                                {openIrCarcel && popUpIrCarcel}
                                {eventoVisible && popUpEvento}
                                {superpoderVisible && popUpSuperpoder}
                                {superpoder1Visible && popUpSuperpoder1}
                                {subastaVisible && popUpSubasta}
                                {haySubastaDisponible && popUpHaySubasta}

                            </div>

                        </div>

                        <div className="imagen-extra">
                            <img src={iconoChat} className="imagen-extra-tablero" onClick={handleChat}/>
                        </div>
                        {abrirChat && popUpChat}
                    </div>
                </div>
            )}
        </>
    );
}

export default Tablero;


/*

                {Array.from(casillas1).map(([casilla, posicion11]) => (
                    <div style={{ position: 'absolute', top: posicion11.top, left: posicion11.left }}>
                        <img src={fichaBAXTER1} style={{width: posicion11.width, height: posicion11.height}} />
                    </div>
                ))}
                
                {Array.from(casillas2).map(([casilla, posicion22]) => (
                    <div style={{ position: 'absolute', top: posicion22.top, left: posicion22.left }}>
                        <img src={fichaDIONIX2} style={{width: posicion22.width, height: posicion22.height}} />
                    </div>
                ))}

                {Array.from(casillas3).map(([casilla, posicion33]) => (
                    <div style={{ position: 'absolute', top: posicion33.top, left: posicion33.left }}>
                        <img src={fichaLUCAS3} style={{width: posicion33.width, height: posicion33.height}} />
                    </div>
                ))}

                {Array.from(casillas4).map(([casilla, posicion44]) => (
                    <div style={{ position: 'absolute', top: posicion44.top, left: posicion44.left }}>
                        <img src={fichaJEANCARLO4} style={{width: posicion44.width, height: posicion44.height}} />
                    </div>
                ))}



                        /* {!jugadores1[0].muerto &&
                            <div style={{ 
                                    position: 'absolute', 
                                    top: estadoPartida.jugadores1[0].enCarcel ? '2.4%' : casillas1.get(`Casilla${posicion1}`).top, 
                                    left: estadoPartida.jugadores1[0].enCarcel ? '4.5%' : casillas1.get(`Casilla${posicion1}`).left}}>
                                <img src={jugadores1[0].ficha} style={{width:  casillas1.get(`Casilla${posicion1}`).width, height: casillas1.get(`Casilla${posicion1}`).height}} />
                            </div>
                        }
                        {!jugadores1[1].muerto &&
                            <div style={{ 
                                    position: 'absolute', 
                                    top: estadoPartida.jugadores1[1].enCarcel ? '4.7%' : casillas2.get(`Casilla${posicion2}`).top, 
                                    left: estadoPartida.Jugadores1[1].enCarcel ? '4.5%' : casillas2.get(`Casilla${posicion2}`).left }}>
                                <img src={jugadores1[1].ficha} style={{width:  casillas2.get(`Casilla${posicion2}`).width, height: casillas2.get(`Casilla${posicion2}`).height}} />
                            </div>
                        }
                        {!jugadores1[2].muerto &&
                            <div style={{ 
                                    position: 'absolute', 
                                    top: estadoPartida.Jugadores1[2].enCarcel ? '7%' : casillas3.get(`Casilla${posicion3}`).top, 
                                    left: estadoPartida.Jugadores1[2].enCarcel ? '4.5%' : casillas3.get(`Casilla${posicion3}`).left }}>
                                <img src={jugadores1[2].ficha} style={{width:  casillas3.get(`Casilla${posicion3}`).width, height: casillas3.get(`Casilla${posicion3}`).height}} />
                            </div>
                        }
                        {!jugadores1[3].muerto &&
                            <div style={{ 
                                    position: 'absolute', 
                                    top: estadoPartida.Jugadores1[3].enCarcel ? '9.2%' : casillas4.get(`Casilla${posicion4}`).top, 
                                    left: estadoPartida.Jugadores1[3].enCarcel ? '4.5%' : casillas4.get(`Casilla${posicion4}`).left }}>
                                <img src={jugadores1[3].ficha} style={{width:  casillas4.get(`Casilla${posicion4}`).width, height: casillas4.get(`Casilla${posicion4}`).height}} />
                            </div>
                        }
                         



// EL BUENOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                {!jugadores1[0].muerto &&
                    <div style={{ position: 'absolute', top: casillas1.get(`Casilla${posicion1}`).top, left:  casillas1.get(`Casilla${posicion1}`).left }}>
                        <img src={jugadores1[0].ficha} style={{width:  casillas1.get(`Casilla${posicion1}`).width, height: casillas1.get(`Casilla${posicion1}`).height}} />
                    </div>
                }
                {!jugadores1[1].muerto &&
                    <div style={{ position: 'absolute', top: casillas2.get(`Casilla${posicion2}`).top, left:  casillas2.get(`Casilla${posicion2}`).left }}>
                        <img src={jugadores1[1].ficha} style={{width:  casillas2.get(`Casilla${posicion2}`).width, height: casillas2.get(`Casilla${posicion2}`).height}} />
                    </div>
                }
                {!jugadores1[2].muerto &&
                    <div style={{ position: 'absolute', top: casillas3.get(`Casilla${posicion3}`).top, left:  casillas3.get(`Casilla${posicion3}`).left }}>
                        <img src={jugadores1[2].ficha} style={{width:  casillas3.get(`Casilla${posicion3}`).width, height: casillas3.get(`Casilla${posicion3}`).height}} />
                    </div>
                }
                {!jugadores1[3].muerto &&
                    <div style={{ position: 'absolute', top: casillas4.get(`Casilla${posicion4}`).top, left:  casillas4.get(`Casilla${posicion4}`).left }}>
                        <img src={jugadores1[3].ficha} style={{width:  casillas4.get(`Casilla${posicion4}`).width, height: casillas4.get(`Casilla${posicion4}`).height}} />
                    </div>
                }
*/
