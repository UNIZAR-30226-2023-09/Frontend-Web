import React, { useState, useEffect  } from "react";
import './CSS/Tablero.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import tablero from './Imagenes/TABLERO.jpg'
import iconoChat from './Imagenes/iconoChat.png';
import Chat from './Chat';
import PopupCarta from './PopupCarta';
import PopupCasino from './PopupCasino';
import PopupPropiedad from "./PopupPropiedad";
import PopupPropiedadVender from "./PopupPropiedadVender";
import PopupBanco from "./PopupBanco";
import PopupIrCarcel from "./PopupIrCarcel";

import dice1 from './Imagenes/Dice1.png';
import dice2 from './Imagenes/Dice2.png';
import dice3 from './Imagenes/Dice3.png';
import dice4 from './Imagenes/Dice4.png';
import dice5 from './Imagenes/Dice5.png';
import dice6 from './Imagenes/Dice6.png';
import tite from './Imagenes/TITE.png';
import plex from './Imagenes/PLEX.png';
import lucas from './Imagenes/LUCAS.png';
import jeancarlo from './Imagenes/JEAN-CARLO.png';

import fichajeanCarlo from './Imagenes/FICHAS/AMARILLO1.png';
import fichalucas from './Imagenes/FICHAS/ROJO1.png';
import fichatite from './Imagenes/FICHAS/MARRON1.png';
import fichaplex from './Imagenes/FICHAS/ROSA1.png';

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';


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
    // TODO: MIRAR DADOS DOBLES

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

    const [num1, setNum1] = useState(1);
    const [num2, setNum2] = useState(1);

    /* --------------TABLERO------------*/
    let tableroPropiedades = ["nada","Salida", "Monterrey", "Guadalajara", "Treasure", "Tax", "AeropuertoNarita", // 6
    "Tokio", "Kioto", "Superpoder", "Osaka", "Carcel", "Roma", "Milan", "Casino", "Napoles", // 15
    "Aeropuerto Heathrow", "Londres", "Superpoder", "Manchester", "Edimburgo", "Bote", "Madrid", // 22
    "Barcelona", "Treasure", "Zaragoza", "AeropuertoOrly", "Paris", "Banco", "Marsella", // 29
    "Lyon", "IrCarcel", "Toronto", "Vancouver", "Treasure", "Ottawa", "AeropuertoDeLosAngeles", // 36
    "NuevaYork", "LosAngeles", "LuxuryTax", "Chicago"];

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
                    
                    if (estadoPartida.puedesComprarPropiedad) {
                        setPropiedadCaida(tableroPropiedades[estadoPartida.Jugadores[estadoPartida.indiceYO].posicion]);
                        setOpenPropiedad(true);
                    }
                    // Casilla del banco
                    else if (estadoPartida.enBanco) {
                        setOpenBanco(true);
                    }
                    // TODO: ESTO ES CASINO?
                    else if (estadoPartida.enCasino) {
                        setOpenCasino(true);
                    }
                    // TODO: MIRAR LA DE IR CARCEL
                    else if (estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 31) {
                        setOpenIrCarcel(true);
                    }
                    // Tengo que pagar alquiler a otro jugador
                    else if (estadoPartida.pagoAlquiler) {
                        window.alert("Tienes que pagar el alquiler de: " + nombrePosicion(estadoPartida.Jugadores[estadoPartida.indiceYO].posicion));
                    }
                    // Cuando caes en la casilla de tax
                    else if (estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 5) {
                        window.alert("Tienes que pagar un tax por tus propiedades");
                    }
                    // Cuando caes en la casilla de luxury tax
                    else if (estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 39) {
                        window.alert("Tienes que pagar un luxury tax por tus propiedades");
                    }
                    // Cuando caes en la casilla de treasure
                    else if (estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 4 || estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 24 || estadoPartida.Jugadores[estadoPartida.indiceYO].posicion == 34) {
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
    casillas1.set("Casilla11", { top: "10%", left: "6%", width: "38px", height: "33px" });

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

    casillas1.set("Casilla32", { top: "695px", left: "8.8%", width: "38px", height: "33px" });
    casillas1.set("Casilla33", { top: "695px", left: "13.2%", width: "38px", height: "33px" });
    casillas1.set("Casilla34", { top: "695px", left: "17.5%", width: "38px", height: "33px" });
    casillas1.set("Casilla35", { top: "695px", left: "22.1%", width: "38px", height: "33px" });
    casillas1.set("Casilla36", { top: "695px", left: "26.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla37", { top: "695px", left: "31.1%", width: "38px", height: "33px" });
    casillas1.set("Casilla38", { top: "695px", left: "35.7%", width: "38px", height: "33px" });
    casillas1.set("Casilla39", { top: "695px", left: "40.1%", width: "38px", height: "33px" });
    casillas1.set("Casilla40", { top: "695px", left: "44.7%", width: "38px", height: "33px" });

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
    casillas2.set("Casilla11", { top: "10%", left: "6%", width: "38px", height: "33px" });


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


    casillas2.set("Casilla32", { top: "695px", left: "10.6%", width: "38px", height: "33px" });
    casillas2.set("Casilla33", { top: "695px", left: "15.1%", width: "38px", height: "33px" });
    casillas2.set("Casilla34", { top: "695px", left: "19.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla35", { top: "695px", left: "24.3%", width: "38px", height: "33px" });
    casillas2.set("Casilla36", { top: "695px", left: "28.8%", width: "38px", height: "33px" });
    casillas2.set("Casilla37", { top: "695px", left: "33.2%", width: "38px", height: "33px" });
    casillas2.set("Casilla38", { top: "695px", left: "37.7%", width: "38px", height: "33px" });
    casillas2.set("Casilla39", { top: "695px", left: "42.1%", width: "38px", height: "33px" });
    casillas2.set("Casilla40", { top: "695px", left: "46.7%", width: "38px", height: "33px" });

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
    casillas3.set("Casilla11", { top: "10%", left: "6%", width: "38px", height: "33px" });


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



    casillas3.set("Casilla32", { top: "730px", left: "8.8%", width: "38px", height: "33px" });
    casillas3.set("Casilla33", { top: "730px", left: "13.2%", width: "38px", height: "33px" });
    casillas3.set("Casilla34", { top: "730px", left: "17.5%", width: "38px", height: "33px" });
    casillas3.set("Casilla35", { top: "730px", left: "22.1%", width: "38px", height: "33px" });
    casillas3.set("Casilla36", { top: "730px", left: "26.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla37", { top: "730px", left: "31.1%", width: "38px", height: "33px" });
    casillas3.set("Casilla38", { top: "730px", left: "35.7%", width: "38px", height: "33px" });
    casillas3.set("Casilla39", { top: "730px", left: "40.1%", width: "38px", height: "33px" });
    casillas3.set("Casilla40", { top: "730px", left: "44.7%", width: "38px", height: "33px" });

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
    casillas4.set("Casilla11", { top: "10%", left: "6%", width: "38px", height: "33px" });


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


    casillas4.set("Casilla32", { top: "730px", left: "10.6%", width: "38px", height: "33px" });
    casillas4.set("Casilla33", { top: "730px", left: "15.1%", width: "38px", height: "33px" });
    casillas4.set("Casilla34", { top: "730px", left: "19.7%", width: "38px", height: "33px" });
    casillas4.set("Casilla35", { top: "730px", left: "24.3%", width: "38px", height: "33px" });
    casillas4.set("Casilla36", { top: "730px", left: "28.8%", width: "38px", height: "33px" });
    casillas4.set("Casilla37", { top: "730px", left: "33.2%", width: "38px", height: "33px" });
    casillas4.set("Casilla38", { top: "730px", left: "37.1%", width: "38px", height: "33px" });
    casillas4.set("Casilla39", { top: "730px", left: "42.1%", width: "38px", height: "33px" });
    casillas4.set("Casilla40", { top: "730px", left: "46.7%", width: "38px", height: "33px" });

    /* -------------------------------------------------------------------------------------*/

    // {isOpenChat && popUpChat}
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

    //setPosicion1(casillas.get("Casilla2"));

    // const jugadores1 = [
    //     { nombre: 'Jesus', imagen: tite, dinero: 100, ficha: fichaTite },
    //     { nombre: 'Alejandro', imagen: lucas, dinero: 150, ficha: fichaLucas },
    //     { nombre: 'Cesar', imagen: plex, dinero: 200, ficha: fichaPlex },
    //     { nombre: 'Marcos', imagen: jeancarlo, dinero: 250, ficha: fichaJeanCarlo },
    // ];

    // Funcion que dado un nombre y un numero, concatene "ficha" + nombre + numero
    function obtenerFicha(nombre, numero) {
        return "ficha" + nombre + numero;
    }

    const jugadores1 = [
        { nombre: estadoPartida.Jugadores[0].email, imagen: tite, dinero: estadoPartida.Jugadores[0].dinero, ficha: fichatite },
        { nombre: estadoPartida.Jugadores[1].email, imagen: lucas, dinero: estadoPartida.Jugadores[1].dinero, ficha: fichalucas },
        { nombre: estadoPartida.Jugadores[2].email, imagen: plex, dinero: estadoPartida.Jugadores[2].dinero, ficha: fichaplex },
        { nombre: estadoPartida.Jugadores[3].email, imagen: jeancarlo, dinero: estadoPartida.Jugadores[3].dinero, ficha: fichajeanCarlo },
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

    const handleFinTurno = async (e) => {
        // TODO: Aqui seria mandar al servidor que se ha acabado el turno
        await socketActions.finTurno(socket, sesion.email, estadoPartida.id_partida);
        estadoPartida.miTurno = false;
        setTirarDados(true);
    }


    // Gestiona la ventana emergente (lo que lo lanza)
    const popupCarta = (
        <PopupCarta handleClose={handleCloseCarta} />
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

    const [showDice, setShowDice] = useState(false);

    // Para mostrar bien los dados cuando yo sea el primero en tirar
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setShowDice(true);
      }, 100);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);

    //TODO: MIRAR PORQUE NO SE ACTUALIZA EL MI TURNO DE PRIMERAS
    return (

        <div className="row">
            <div className="col-7">
                <img src={tablero} className="imagen-tablero w-100" alt="Tablero" />
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

                {/* AÑADIR LO DE MUERTO EN JUGADORES
                    AQUI EN LA POSICION COMPARAR SI ESTA EN LA CARCEL Y MOVERLO A LA DERECH
                    MIRAR PRECIO EN COMPRAR PROPIEDAD    
                */}

                <div style={{ position: 'absolute', top: casillas1.get(`Casilla${posicion1}`).top, left:  casillas1.get(`Casilla${posicion1}`).left }}>
                    <img src={fichatite} style={{width:  casillas1.get(`Casilla${posicion1}`).width, height: casillas1.get(`Casilla${posicion1}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas2.get(`Casilla${posicion2}`).top, left:  casillas2.get(`Casilla${posicion2}`).left }}>
                    <img src={fichalucas} style={{width:  casillas2.get(`Casilla${posicion2}`).width, height: casillas2.get(`Casilla${posicion2}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas3.get(`Casilla${posicion3}`).top, left:  casillas3.get(`Casilla${posicion3}`).left }}>
                    <img src={fichaplex} style={{width:  casillas3.get(`Casilla${posicion3}`).width, height: casillas3.get(`Casilla${posicion3}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas4.get(`Casilla${posicion4}`).top, left:  casillas4.get(`Casilla${posicion4}`).left }}>
                    <img src={fichajeanCarlo} style={{width:  casillas4.get(`Casilla${posicion4}`).width, height: casillas4.get(`Casilla${posicion4}`).height}} />
                </div>



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
                                <li>Dinero en el bote: {estadoPartida.dineroBote}$ </li>
                                <li>Ronda actual: {estadoPartida.ronda} </li>

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

                                    {listaPropiedades.map((propiedad, index) => (
                                        <li 
                                            key={index}>{propiedad}
                                            <button className="vender" onClick={() => mostrarVender(propiedad)}>Vender</button>
                                            <button className="edificar" onClick={mostrarPopUpPropiedad}>Edificar</button>
                                        </li>
                                    ))}
                                    {openVenderProp && popUpVender}
                                    {openCarta && popupCarta}
                                </ul>
                            </div>
                        }

                        {openCasino && popUpCasino}
                        {openPropiedad && popUpPropiedad}
                        {openBanco && popUpBanco}
                        {openIrCarcel && popUpIrCarcel}
                       
                    </div>

                </div>

                <div className="imagen-extra">
                    <img src={iconoChat} className="imagen-extra-tablero" onClick={handleChat}/>
                </div>
                {abrirChat && popUpChat}
            </div>
        </div>

    )
}

export default Tablero;


/*

                {Array.from(casillas1).map(([casilla, posicion11]) => (
                    <div style={{ position: 'absolute', top: posicion11.top, left: posicion11.left }}>
                        <img src={fichaTite} style={{width: posicion11.width, height: posicion11.height}} />
                    </div>
                ))}
                
                {Array.from(casillas2).map(([casilla, posicion22]) => (
                    <div style={{ position: 'absolute', top: posicion22.top, left: posicion22.left }}>
                        <img src={fichaPlex} style={{width: posicion22.width, height: posicion22.height}} />
                    </div>
                ))}

                {Array.from(casillas3).map(([casilla, posicion33]) => (
                    <div style={{ position: 'absolute', top: posicion33.top, left: posicion33.left }}>
                        <img src={fichaLucas} style={{width: posicion33.width, height: posicion33.height}} />
                    </div>
                ))}

                {Array.from(casillas4).map(([casilla, posicion44]) => (
                    <div style={{ position: 'absolute', top: posicion44.top, left: posicion44.left }}>
                        <img src={fichaJeanCarlo} style={{width: posicion44.width, height: posicion44.height}} />
                    </div>
                ))}



                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion1}`).top, left:  casillas.get(`Casilla${posicion1}`).left }}>
                    <img src={tite} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion2}`).top, left:  casillas.get(`Casilla${posicion2}`).left }}>
                    <img src={lucas} style={{width:  casillas.get(`Casilla${posicion2}`).width, height: casillas.get(`Casilla${posicion2}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion3}`).top, left:  casillas.get(`Casilla${posicion3}`).left }}>
                    <img src={plex} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion4}`).top, left:  casillas.get(`Casilla${posicion4}`).left }}>
                    <img src={jeancarlo} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>

// EL BUENOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
                <div style={{ position: 'absolute', top: casillas1.get(`Casilla${posicion1}`).top, left:  casillas1.get(`Casilla${posicion1}`).left }}>
                    <img src={fichaTite} style={{width:  casillas1.get(`Casilla${posicion1}`).width, height: casillas1.get(`Casilla${posicion1}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas1.get(`Casilla${posicion2}`).top, left:  casillas1.get(`Casilla${posicion2}`).left }}>
                    <img src={fichaLucas} style={{width:  casillas1.get(`Casilla${posicion2}`).width, height: casillas1.get(`Casilla${posicion2}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas1.get(`Casilla${posicion3}`).top, left:  casillas1.get(`Casilla${posicion3}`).left }}>
                    <img src={fichaPlex} style={{width:  casillas1.get(`Casilla${posicion3}`).width, height: casillas1.get(`Casilla${posicion3}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas1.get(`Casilla${posicion4}`).top, left:  casillas1.get(`Casilla${posicion4}`).left }}>
                    <img src={fichaJeanCarlo} style={{width:  casillas1.get(`Casilla${posicion4}`).width, height: casillas1.get(`Casilla${posicion4}`).height}} />
                </div>
*/
