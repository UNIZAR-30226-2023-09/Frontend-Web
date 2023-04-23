import React, { useState, useRef } from "react";
import './CSS/Tablero.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import tablero from './Imagenes/TABLERO.png'
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

import fichaJeanCarlo from './Imagenes/FICHAS/AMARILLO1.png';
import fichaLucas from './Imagenes/FICHAS/ROJO1.png';
import fichaTite from './Imagenes/FICHAS/MARRON1.png';
import fichaPlex from './Imagenes/FICHAS/ROSA1.png';

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

    // Para la información de partida
    const [dineroBanco, setDineroBanco] = useState(0);
    const [dineroBote, setDineroBote] = useState(0);
    const [ronda, setRonda] = useState(0);

    const [num1, setNum1] = useState(1);
    const [num2, setNum2] = useState(1);

    const rollDice = async () => {
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
                if (seguir === true) {
                    setPosicion1(estadoPartida.Jugadores[estadoPartida.indiceYO].posicion);
                    setNum1(estadoPartida.dado1);
                    setNum2(estadoPartida.dado2);
                    setDiceFace(faces[estadoPartida.dado1 - 1].imagen);
                    setDiceFace2(faces[estadoPartida.dado2 - 1].imagen);
                    console.log("Posicion1: " + posicion1)
                    console.log("dado1: " + estadoPartida.dado1)
                    console.log("dado2: " + estadoPartida.dado2)
                    
                }

                // TODO: Aquí sería mirar lo que hacer según cada casilla
                // Hacer un if else con los valores booleanos de EstadoPartida y mostrar
                // una pantalla u otra dependiendo de lo que sea true
                if (estadoPartida.enBanco) {
                    setOpenBanco(true);
                }
                else if (estadoPartida.puedesComprarPropiedad) {
                    // TODO: Mirar que propiedad
                    setOpenPropiedad(true);
                }
                else if (estadoPartida.apostarDinero) {
                    setOpenCasino(true);
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

    /* ----------- COORDENADAS CASILLAS DEL TABLERO ------------*/
    const casillas = new Map();

    // Estas son la columna izquierda de abajo arriba
    // --> 1px = 0.06%
    casillas.set("Casilla1", { top: "700px", left: "3%", width: "5.8%", height: "5.8%" });

    casillas.set("Casilla2", { top: "612px", left: "3%", width: "5.8%", height: "5.8%" });
    // TODO: Para meter mas -> +25 en left empezando en 15
    //casillas.set("Casilla2", { top: "615px", left: "15px", width: "5.8%", height: "5.8%" });
    //casillas.set("Casilla2.1", { top: "615px", left: "40px", width: "5.8%", height: "5.8%" });
    //casillas.set("Casilla2.2", { top: "615px", left: "65px", width: "50px", height: "50px" });
    //casillas.set("Casilla2.3", { top: "615px", left: "90px", width: "50px", height: "50px" });
    casillas.set("Casilla3", { top: "553px", left: "3%", width: "5.8%", height: "5.8%" });

   // casillas.set("Casilla3", { top: "555px", left: "50px", width: "50px", height: "50px" });
    casillas.set("Casilla4", { top: "495px", left: "3%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla5", { top: "435px", left: "3%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla6", { top: "373px", left: "3%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla7", { top: "312px", left: "3%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla8", { top: "250px", left: "3%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla9", { top: "190px", left: "3%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla10", { top: "130px", left: "3%", width: "5.8%", height: "5.8%" });

    // Estas son la fila de arriba de izquierda a derecha
    //casillas.set("Casilla11-carcel", { top: "65px", left: "80px", width: "50px", height: "50px" });
    //casillas.set("Casilla11-noCarcel", { top: "20px", left: "20px", width: "50px", height: "50px" });
    casillas.set("Casilla11", { top: "4.4%", left: "3%", width: "5.8%", height: "5.8%" });

    casillas.set("Casilla12", { top: "4.4%", left: "9.3%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla13", { top: "4.4%", left: "13.7%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla14", { top: "4.4%", left: "18%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla15", { top: "4.4%", left: "22.6%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla16", { top: "4.4%", left: "27.2%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla17", { top: "4.4%", left: "31.6%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla18", { top: "4.4%", left: "36.2%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla19", { top: "4.4%", left: "40.6%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla20", { top: "4.4%", left: "45.2%", width: "5.8%", height: "5.8%" });

    // Estas son la columna de la derecha de arriba a abajo
    casillas.set("Casilla21", { top: "38px", left: "51%", width: "6.6%", height: "6.6%" });
    
    casillas.set("Casilla22", { top: "122px", left: "51.2%", width: "6.6%", height: "6.6%" });
    casillas.set("Casilla23", { top: "184px", left: "51.2%", width: "6.6%", height: "6.6%" });
    casillas.set("Casilla24", { top: "245px", left: "51.2%", width: "6.6%", height: "6.6%" });
    casillas.set("Casilla25", { top: "304px", left: "51.2%", width: "6.6%", height: "6.6%" });
    casillas.set("Casilla26", { top: "364px", left: "51.2%", width: "6.6%", height: "6.6%" });
    casillas.set("Casilla27", { top: "431px", left: "51.2%", width: "6.6%", height: "6.6%"});
    casillas.set("Casilla28", { top: "491px", left: "51.2%", width: "6.6%", height: "6.6%" });
    casillas.set("Casilla29", { top: "551px", left: "51.2%", width: "6.6%", height: "6.6%" });
    casillas.set("Casilla30", { top: "611px", left: "51.2%", width: "6.6%", height: "6.6%" });
    
    // Esta es la fila de abajo de derecha a izquierda
    casillas.set("Casilla31", { top: "700px", left: "51%", width: "6.6%", height: "6.6%" });

    casillas.set("Casilla32", { top: "695px", left: "45.2%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla33", { top: "695px", left: "40.6%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla34", { top: "695px", left: "36.2%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla35", { top: "695px", left: "31.6%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla36", { top: "695px", left: "27.2%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla37", { top: "695px", left: "22.8%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla38", { top: "695px", left: "18.2%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla39", { top: "695px", left: "13.7%", width: "5.8%", height: "5.8%" });
    casillas.set("Casilla40", { top: "695px", left: "9.3%", width: "5.8%", height: "5.8%" });

    /* ---------------------------------------------------------*/
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

    const jugadores1 = [
        { nombre: 'Jesus', imagen: tite, dinero: 100, ficha: fichaTite },
        { nombre: 'Alejandro', imagen: lucas, dinero: 150, ficha: fichaLucas },
        { nombre: 'Cesar', imagen: plex, dinero: 200, ficha: fichaPlex },
        { nombre: 'Marcos', imagen: jeancarlo, dinero: 250, ficha: fichaJeanCarlo },
    ];

    const listaPropiedades = ['Propiedad 1', 'Propiedad 2', 'Propiedad 3', 'Propiedad 4', 'Propiedad 5', 'Propiedad 6', 'Propiedad 7', 'Propiedad 8'];

    // Gestiona la ventana emergente de comprar propiedades
    const mostrarPopUpPropiedad = (e) => {
        setOpenCarta(true);
    }

    // Gestiona el cierre de la ventana emergente
    const handleCloseCarta = (e) => {
        setOpenCarta(false);
        setOpenPropiedad(false);
        setOpenCasino(false);
        setOpenIrCarcel(false);
    }

    // Gestiona la ventana emergente de vender propiedades
    const mostrarVender = (e) => {
        setOpenVenderProp(true);
    }
    
    const handleCloseVender = (e) => {
        setOpenVenderProp(false);
    }

    // Gestiona la ventana emergente del banco
    const mostrarBanco = (e) => {
        setOpenBanco(true);
    }

    const handleCloseBanco = (e) => {
        setOpenBanco(false);
    }

    const handleFinTurno = (e) => {
        // TODO: Aqui seria mandar al servidor que se ha acabado el turno
        socketActions.finTurno(socket, sesion.email, estadoPartida.id_partida);
        estadoPartida.miTurno = false;
    }


    // Gestiona la ventana emergente (lo que lo lanza)
    const popupCarta = (
        <PopupCarta handleClose={handleCloseCarta} />
    );
    
    const popUpCasino = (
        <PopupCasino handleClose={handleCloseCarta} />
    );

    const popUpPropiedad = (
        <PopupPropiedad handleClose={handleCloseCarta} propiedad={"NombreCarta"} />
    );

    const popUpVender = (
        <PopupPropiedadVender handleClose={handleCloseVender} propiedad={"NombreCarta"} />
    );

    const popUpBanco = (
        <PopupBanco handleClose={handleCloseBanco} />
    );

    const popUpIrCarcel = (
        <PopupIrCarcel handleClose={handleCloseCarta} />
    );

    return (

        <div className="row">
            <div className="col-7">
                <img src={tablero} className="imagen-tablero w-100" alt="Tablero" />
                <div onClick={() => estadoPartida.miTurno && rollDice()}>
                    <div className="posicion-dadoIzq">
                        <img src={diceFace} />
                    </div>
                    <div className="posicion-dadoDcha">
                        <img src={diceFace2} />
                    </div>
                </div>

                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion1}`).top, left:  casillas.get(`Casilla${posicion1}`).left }}>
                    <img src={fichaJeanCarlo} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion2}`).top, left:  casillas.get(`Casilla${posicion2}`).left }}>
                    <img src={fichaJeanCarlo} style={{width:  casillas.get(`Casilla${posicion2}`).width, height: casillas.get(`Casilla${posicion2}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion3}`).top, left:  casillas.get(`Casilla${posicion3}`).left }}>
                    <img src={fichaJeanCarlo} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion4}`).top, left:  casillas.get(`Casilla${posicion4}`).left }}>
                    <img src={fichaJeanCarlo} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
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
                                <li>Dinero en el banco: {dineroBanco}$ </li>
                                <li>Dinero en el bote: {dineroBote}$ </li>
                                <li>Ronda actual: {ronda} </li>
                                <li> <button onClick={handleFinTurno}>Fin de turno</button> </li>
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
                                            <button className="vender" onClick={mostrarVender}>Vender</button>
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
                {Array.from(casillas).map(([casilla, posicion]) => (
                <div style={{ position: 'absolute', top: posicion.top, left: posicion.left }}>
                    <img src={tite} style={{width: posicion.width, height: posicion.height}} />
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


                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion1}`).top, left:  casillas.get(`Casilla${posicion1}`).left }}>
                    <img src={ficha} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion2}`).top, left:  casillas.get(`Casilla${posicion2}`).left }}>
                    <img src={ficha} style={{width:  casillas.get(`Casilla${posicion2}`).width, height: casillas.get(`Casilla${posicion2}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion3}`).top, left:  casillas.get(`Casilla${posicion3}`).left }}>
                    <img src={ficha} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion4}`).top, left:  casillas.get(`Casilla${posicion4}`).left }}>
                    <img src={ficha} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>
*/
