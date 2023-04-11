import React, { useState, useRef } from "react";
import './CSS/Tablero.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import tablero from './Imagenes/TABLERO.png'
import iconoChat from './Imagenes/iconoChat.png';
import Chat from './Chat';
import PopupCarta from './PopupCarta';

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
import simboloMas from './Imagenes/simboloMas.png';


import * as socketActions from './socketActions';
import { useSocket } from './socketContext';

export const Tablero = (props) => {

    const [abrirChat, setAbrirChat] = useState(false);

    const [mostrarPropiedades, setMostrarPropiedades] = useState(true);
    const [veces, setVeces] = useState(0); // Para abrir/cerrar el chat

    // Mostrar info de las propiedades
    const [openCarta, setOpenCarta] = useState(false);

    // Para los dados
    const [diceFace, setDiceFace] = useState(dice1);
    const [diceFace2, setDiceFace2] = useState(dice1);

    // Saber la posicion de cada jugador
    const [posicion1,setPosicion1] = useState(1);
    const [posicion2,setPosicion2] = useState(1);
    const [posicion3,setPosicion3] = useState(1);
    const [posicion4,setPosicion4] = useState(1);

    const [num1, setNum1] = useState(1);
    const [num2, setNum2] = useState(1);

    const rollDice = () => {
        let numRolls = 10; // número de veces que se cambiará la cara del dado
        let rollDelay = 100; // tiempo en milisegundos entre cada cambio de cara
    
        // función que se ejecutará cada vez que cambie la cara del dado
        const rollStep = () => {
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
                setNum1(randomNumber);
                setNum2(randomNumber2);
                setTimeout(rollStep, rollDelay);
            }
            else {
                // guardamos la última cara del dado en posicion1 y posicion2
                // TODO: Aquí sería darle el valor de los dados del mensaje obtenido
                setPosicion1(posicion1 + randomNumber);
                setPosicion2(posicion2 + randomNumber2);
            }
        };
    
        // empieza a cambiar la cara del dado
        rollStep();

    };

    const handleMostrarPropiedades = () => {
        setMostrarPropiedades(true);
    };
  
    const handleMostrarCartas = () => {
      setMostrarPropiedades(false);
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
    casillas.set("Casilla1", { top: "700px", left: "60px", width: "50px", height: "50px" });

    casillas.set("Casilla2", { top: "615px", left: "50px", width: "50px", height: "50px" });
    // TODO: Para meter mas -> +25 en left empezando en 15
    //casillas.set("Casilla2", { top: "615px", left: "15px", width: "50px", height: "50px" });
    //casillas.set("Casilla2.1", { top: "615px", left: "40px", width: "50px", height: "50px" });
    //casillas.set("Casilla2.2", { top: "615px", left: "65px", width: "50px", height: "50px" });
    //casillas.set("Casilla2.3", { top: "615px", left: "90px", width: "50px", height: "50px" });

    casillas.set("Casilla3", { top: "555px", left: "50px", width: "50px", height: "50px" });
    casillas.set("Casilla4", { top: "495px", left: "50px", width: "50px", height: "50px" });
    casillas.set("Casilla5", { top: "435px", left: "50px", width: "50px", height: "50px" });
    casillas.set("Casilla6", { top: "375px", left: "50px", width: "50px", height: "50px" });
    casillas.set("Casilla7", { top: "308px", left: "50px", width: "50px", height: "50px" });
    casillas.set("Casilla8", { top: "248px", left: "50px", width: "50px", height: "50px" });
    casillas.set("Casilla9", { top: "187px", left: "50px", width: "50px", height: "50px" });
    casillas.set("Casilla10", { top: "125px", left: "50px", width: "50px", height: "50px" });

    // Estas son la fila de arriba de izquierda a derecha
    casillas.set("Casilla11-carcel", { top: "65px", left: "80px", width: "50px", height: "50px" });
    casillas.set("Casilla11-noCarcel", { top: "20px", left: "20px", width: "50px", height: "50px" });

    casillas.set("Casilla12", { top: "40px", left: "155px", width: "50px", height: "50px" });
    casillas.set("Casilla13", { top: "40px", left: "225px", width: "50px", height: "50px" });
    casillas.set("Casilla14", { top: "40px", left: "295px", width: "50px", height: "50px" });
    casillas.set("Casilla15", { top: "40px", left: "365px", width: "50px", height: "50px" });
    casillas.set("Casilla16", { top: "40px", left: "435px", width: "50px", height: "50px" });
    casillas.set("Casilla17", { top: "40px", left: "505px", width: "50px", height: "50px" });
    casillas.set("Casilla18", { top: "40px", left: "575px", width: "50px", height: "50px" });
    casillas.set("Casilla19", { top: "40px", left: "645px", width: "50px", height: "50px" });
    casillas.set("Casilla20", { top: "40px", left: "715px", width: "50px", height: "50px" });

    // Estas son la columna de la derecha de arriba a abajo
    casillas.set("Casilla21", { top: "50px", left: "825px", width: "50px", height: "50px" });
    
    casillas.set("Casilla22", { top: "125px", left: "835px", width: "50px", height: "50px" });
    casillas.set("Casilla23", { top: "188px", left: "835px", width: "50px", height: "50px" });
    casillas.set("Casilla24", { top: "248px", left: "835px", width: "50px", height: "50px" });
    casillas.set("Casilla25", { top: "308px", left: "835px", width: "50px", height: "50px" });
    casillas.set("Casilla26", { top: "368px", left: "835px", width: "50px", height: "50px" });
    casillas.set("Casilla27", { top: "435px", left: "835px", width: "50px", height: "50px"});
    casillas.set("Casilla28", { top: "495px", left: "835px", width: "50px", height: "50px" });
    casillas.set("Casilla29", { top: "555px", left: "835px", width: "50px", height: "50px" });
    casillas.set("Casilla30", { top: "615px", left: "835px", width: "50px", height: "50px" });
    
    // Esta es la fila de abajo de derecha a izquierda
    casillas.set("Casilla31", { top: "700px", left: "815px", width: "50px", height: "50px" });

    casillas.set("Casilla32", { top: "695px", left: "725px", width: "50px", height: "50px" });
    casillas.set("Casilla33", { top: "695px", left: "655px", width: "50px", height: "50px" });
    casillas.set("Casilla34", { top: "695px", left: "585px", width: "50px", height: "50px" });
    casillas.set("Casilla35", { top: "695px", left: "515px", width: "50px", height: "50px" });
    casillas.set("Casilla36", { top: "695px", left: "435px", width: "50px", height: "50px" });
    casillas.set("Casilla37", { top: "695px", left: "365px", width: "50px", height: "50px" });
    casillas.set("Casilla38", { top: "695px", left: "295px", width: "50px", height: "50px" });
    casillas.set("Casilla39", { top: "695px", left: "225px", width: "50px", height: "50px" });
    casillas.set("Casilla40", { top: "695px", left: "155px", width: "50px", height: "50px" });

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
        { nombre: 'Jesus', imagen: tite, dinero: 100 },
        { nombre: 'Alejandro', imagen: lucas, dinero: 150 },
    ];
    const jugadores2 = [
        { nombre: 'Cesar', imagen: plex, dinero: 200 },
        { nombre: 'Marcos', imagen: jeancarlo, dinero: 250 },
    ];

    const listaPropiedades = ['Propiedad 1', 'Propiedad 2', 'Propiedad 3', 'Propiedad 4', 'Propiedad 5', 'Propiedad 6', 'Propiedad 7', 'Propiedad 8'];


    function mostrarPopUp1() {
        setOpenCarta(true);
    }

    const handleCloseCarta = (e) => {
        setOpenCarta(false);
    }

    // Gestiona la ventana emergente 
    const popupCarta = (
        // De esta forma, en popup, a través del props, se podrá acceder
        // a handleClose y a content
        // Se le puede pasar cualquier cosa
        <PopupCarta handleClose={handleCloseCarta} />
    );
    
      

    return (

        <div className="row">
            <div className="col-7">
                <img src={tablero} className="imagen-tablero w-100" alt="Tablero" />
                <div onClick={rollDice}>
                    <div className="posicion-dadoIzq">
                        <img src={diceFace} />
                    </div>
                    <div className="posicion-dadoDcha">
                        <img src={diceFace2} />
                    </div>
                </div>


                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion1}`).top, left:  casillas.get(`Casilla${posicion1}`).left }}>
                    <img src={tite} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion2}`).top, left:  casillas.get(`Casilla${posicion2}`).left }}>
                    <img src={lucas} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion3}`).top, left:  casillas.get(`Casilla${posicion3}`).left }}>
                    <img src={plex} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>
                <div style={{ position: 'absolute', top: casillas.get(`Casilla${posicion4}`).top, left:  casillas.get(`Casilla${posicion4}`).left }}>
                    <img src={jeancarlo} style={{width:  casillas.get(`Casilla${posicion1}`).width, height: casillas.get(`Casilla${posicion1}`).height}} />
                </div>


            </div>
            <div className="col-5">
                <div className="">
                    <div className="col-12 caja-jugadores">
                        <div className="btn-container">
                            <input type="button" className="btn-jugadores" value="Lista de jugadores" />
                        </div>
                        <div className="lista-jugadores">
                            <ul style={{ display: 'flex', flexDirection: 'row' }}>
                                {jugadores1.map((jugador) => (
                                <li key={jugador.nombre} style={{ display: 'flex', alignItems: 'center', marginRight: '80px', fontSize: '22px' }}>
                                    <img src={jugador.imagen} alt={jugador.nombre} style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                                    <span style={{ marginRight: '10px' }}>{jugador.nombre}</span>
                                    <span>{jugador.dinero}$</span>
                                </li>
                                ))}
                            </ul>
                            <ul style={{ display: 'flex', flexDirection: 'row' }}>
                                {jugadores2.map((jugador) => (
                                <li key={jugador.nombre} style={{ display: 'flex', alignItems: 'center', marginRight: '80px', fontSize: '22px' }}>
                                    <img src={jugador.imagen} alt={jugador.nombre} style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                                    <span style={{ marginRight: '10px' }}>{jugador.nombre}</span>
                                    <span>{jugador.dinero}$</span>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="caja-propiedades">
                        <div className="row no-gutters">
                            <div className="col-12">
                                <div className="btn-container">
                                    <input type="button" className="btn-propiedades" value="Propiedades" onClick={handleMostrarPropiedades}/>
                                </div>
                            </div>
                        </div>
                        <div className="lista-propiedades">
                            <ul>
                                {listaPropiedades.map((propiedad, index) => (
                                    <li 
                                        key={index}>{propiedad}
                                        <img src={simboloMas} onClick={mostrarPopUp1}/>
                                    </li>
                                ))}
                                {openCarta && popupCarta}

                            </ul>
                        </div>
                       
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
*/