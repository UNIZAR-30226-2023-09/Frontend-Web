import React, { useState, useRef } from "react";
import './CSS/Tablero.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import tablero from './Imagenes/TABLERO2.jpg'
import iconoChat from './Imagenes/iconoChat.png';
import Chat from './Chat';

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


import * as socketActions from './socketActions';
import { useSocket } from './socketContext';

export const Tablero = (props) => {

    const [abrirChat, setAbrirChat] = useState(false);

    const [mostrarPropiedades, setMostrarPropiedades] = useState(true);
    const [veces, setVeces] = useState(0); // Para abrir/cerrar el chat

    // Controlar los dados
    /*const [numeroDado, setNumeroDado] = useState(1);
    const [moviendoDado, setMoviendoDado] = useState(false);

    const handleLanzarDado = () => {
        setMoviendoDado(true);
        const numeroAleatorio = Math.floor(Math.random() * 6) + 1;
        setTimeout(() => {
          setNumeroDado(numeroAleatorio);
          setMoviendoDado(false);
        }, 1000);
    }
    
                    <img
                    src={numeroDado === 1 ? dice1 : numeroDado === 2 ? dice2 : numeroDado === 3 ? dice3 : numeroDado === 4 ? dice4 : numeroDado === 5 ? dice5 : dice6}
                    className={`dado ${moviendoDado ? 'moviendo' : ''}`}
                    alt="Dado"
                    onClick={handleLanzarDado}
                    />
    */

    const [diceFace, setDiceFace] = useState(dice1);
    const [diceFace2, setDiceFace2] = useState(dice1);

    const rollDice = () => {
        let numRolls = 10; // número de veces que se cambiará la cara del dado
        let rollDelay = 100; // tiempo en milisegundos entre cada cambio de cara
    
        // función que se ejecutará cada vez que cambie la cara del dado
        const rollStep = () => {
        // elige una cara aleatoria del dado
        const faces = [dice1, dice2, dice3, dice4, dice5, dice6];
        const randomFace = faces[Math.floor(Math.random() * faces.length)];
        const randomFace2 = faces[Math.floor(Math.random() * faces.length)];

        // cambia la cara del dado
        setDiceFace(randomFace);
        setDiceFace2(randomFace2);

        // si aún quedan cambios por hacer, programa el siguiente cambio
        if (numRolls > 0) {
            numRolls--;
            setTimeout(rollStep, rollDelay);
        }
        };
    
        // empieza a cambiar la cara del dado
        rollStep();
    };

    const rollDice2 = () => {
        let numRolls = 10; // número de veces que se cambiará la cara del dado
        let rollDelay = 500; // tiempo en milisegundos entre cada cambio de cara
    
        // función que se ejecutará cada vez que cambie la cara del dado
        const rollStep = () => {
        // elige una cara aleatoria del dado
        const faces = [dice1, dice2, dice3, dice4, dice5, dice6];
        const randomFace = faces[Math.floor(Math.random() * faces.length)];
    
        // cambia la cara del dado
        setDiceFace2(randomFace);
    
        // si aún quedan cambios por hacer, programa el siguiente cambio
        if (numRolls > 0) {
            numRolls--;
            setTimeout(rollStep, rollDelay);
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

    const handleClose = (e) => {
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
    casillas.set("Casilla1", { top: "700px", left: "60px" });

    casillas.set("Casilla2", { top: "615px", left: "50px" });
    // TODO: Para meter mas -> +25 en left empezando en 15
    //casillas.set("Casilla2", { top: "615px", left: "15px" });
    //casillas.set("Casilla2.1", { top: "615px", left: "40px" });
    //casillas.set("Casilla2.2", { top: "615px", left: "65px" });
    //casillas.set("Casilla2.3", { top: "615px", left: "90px" });


    casillas.set("Casilla3", { top: "555px", left: "50px" });
    casillas.set("Casilla4", { top: "495px", left: "50px" });
    casillas.set("Casilla5", { top: "435px", left: "50px" });
    casillas.set("Casilla6", { top: "375px", left: "50px" });
    casillas.set("Casilla7", { top: "308px", left: "50px" });
    casillas.set("Casilla8", { top: "248px", left: "50px" });
    casillas.set("Casilla9", { top: "187px", left: "50px" });
    casillas.set("Casilla10", { top: "125px", left: "50px" });

    // Estas son la fila de arriba de izquierda a derecha
    casillas.set("Casilla11-carcel", { top: "65px", left: "80px" });
    casillas.set("Casilla11-noCarcel", { top: "20px", left: "20px" });

    casillas.set("Casilla12", { top: "40px", left: "155px" });
    casillas.set("Casilla13", { top: "40px", left: "225px" });
    casillas.set("Casilla14", { top: "40px", left: "295px" });
    casillas.set("Casilla15", { top: "40px", left: "365px" });
    casillas.set("Casilla16", { top: "40px", left: "435px" });
    casillas.set("Casilla17", { top: "40px", left: "505px" });
    casillas.set("Casilla18", { top: "40px", left: "575px" });
    casillas.set("Casilla19", { top: "40px", left: "645px" });
    casillas.set("Casilla20", { top: "40px", left: "715px" });

    // Estas son la columna de la derecha de arriba a abajo
    casillas.set("Casilla21", { top: "50px", left: "825px" });
    
    casillas.set("Casilla22", { top: "125px", left: "835px" });
    casillas.set("Casilla23", { top: "188px", left: "835px" });
    casillas.set("Casilla24", { top: "248px", left: "835px" });
    casillas.set("Casilla25", { top: "308px", left: "835px" });
    casillas.set("Casilla26", { top: "368px", left: "835px" });
    casillas.set("Casilla27", { top: "435px", left: "835px" });
    casillas.set("Casilla28", { top: "495px", left: "835px" });
    casillas.set("Casilla29", { top: "555px", left: "835px" });
    casillas.set("Casilla30", { top: "615px", left: "835px" });
    
    // Esta es la fila de abajo de derecha a izquierda
    casillas.set("Casilla31", { top: "700px", left: "815px" });

    casillas.set("Casilla32", { top: "695px", left: "725px" });
    casillas.set("Casilla33", { top: "695px", left: "655px" });
    casillas.set("Casilla34", { top: "695px", left: "585px" });
    casillas.set("Casilla35", { top: "695px", left: "515px" });
    casillas.set("Casilla36", { top: "695px", left: "435px" });
    casillas.set("Casilla37", { top: "695px", left: "365px" });
    casillas.set("Casilla38", { top: "695px", left: "295px" });
    casillas.set("Casilla39", { top: "695px", left: "225px" });
    casillas.set("Casilla40", { top: "695px", left: "155px" });

    /* ---------------------------------------------------------*/
    // {isOpenChat && popUpChat}
    const popUpChat = (
        // De esta forma, en popup, a través del props, se podrá acceder
        // a handleClose y a content
        // Se le puede pasar cualquier cosa
        <Chat handleClose={handleClose} />


    );

      const jugadores1 = [
        { nombre: 'Jesus', imagen: tite, dinero: 100 },
        { nombre: 'Alejandro', imagen: lucas, dinero: 150 },
      ];
      const jugadores2 = [
        { nombre: 'Cesar', imagen: plex, dinero: 200 },
        { nombre: 'Marcos', imagen: jeancarlo, dinero: 250 },
      ];
      

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


                {Array.from(casillas).map(([casilla, posicion]) => (
                <div className="prueba-posicion" style={{ position: 'absolute', top: posicion.top, left: posicion.left }}>
                    <img src={tite} />
                </div>
                ))}



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
                            <div className="col-6">
                                <div className="btn-container">
                                    <input type="button" className="btn-propiedades" value="Propiedades" onClick={handleMostrarPropiedades}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="btn-container btn-cartas-container">
                                    <input type="button" className="btn-cartas" value="Cartas" onClick={handleMostrarCartas}/>
                                </div>
                            </div>
                        </div>
                        {mostrarPropiedades ? (
                        <div className="lista-propiedades">
                            <ul>
                                <li>Propiedad 1</li>
                                <li>Propiedad 2</li>
                                <li>Propiedad 3</li>
                                <li>Propiedad 4</li>
                                <li>Propiedad 5</li>
                                <li>Propiedad 6</li>
                                <li>Propiedad 7</li>
                                <li>Propiedad 8</li>

                            </ul>
                        </div>
                        ) : (
                        <div className="lista-cartas">
                                <ul>
                                    <li>Carta 1</li>
                                    <li>Carta 2</li>
                                    <li>Carta 3</li>
                                    <li>Carta 4</li>
                                    <li>Carta 5</li>
                                    <li>Carta 6</li>
                                    <li>Carta 7</li>
                                    <li>Carta 8</li>
                                </ul>
                        </div>
                         )}
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
                    // Obtener la referencia a la imagen que se quiere mover
                    const imagen = document.querySelector(".prueba-posicion img");

                    // Recorrer el mapa de casillas y actualizar la posición de la imagen en cada iteración
                    for (const [nombreCasilla, posicion] of casillas) {
                        // Obtener las coordenadas x e y de la casilla actual
                        const x = posicion.left;
                        const y = posicion.top;

                        // Actualizar la posición de la imagen
                        imagen.style.left = x;
                        imagen.style.top = y;

                        // Esperar un tiempo antes de mover la imagen a la siguiente casilla
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
*/