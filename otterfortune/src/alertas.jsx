import React, { useState } from 'react';
import styles from './CSS/alertas.css'; // Importar el CSS como módulo

import imgErrD from './Imagenes/ANGRY_OTTER.jpg';
import imgErrI from './Imagenes/ANGRY_OTTER.jpg';

import banco from './Imagenes/otter.png';

import sadOtter from './Imagenes/sad.png';


/*  =====================================================================================
 *                                  ERRORES MSG-ALERTA VARIOS INTRODUCIR
 *  =====================================================================================
*/
export function mostrarAlerta(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta';

    // Imagen IZDA
    const imagen = document.createElement('img');
    imagen.className = 'imagenR';
    imagen.src = imgErrD;
    div.appendChild(imagen);

    if( mensaje === "errorContrasenha" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = 'Por favor, ingrese su contraseña';
        div.appendChild(mensajeDiv);

    } else if ( mensaje === "errorEmail" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = 'Por favor, ingrese su email';
        div.appendChild(mensajeDiv);

    } else if ( mensaje === "errorLogin" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = 'Login incorrecto';
        div.appendChild(mensajeDiv);

    }  else if ( mensaje === "errorIngresarNombre" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Por favor, ingrese su nombre";
        div.appendChild(mensajeDiv);

    }  else if ( mensaje === "errorIngresarEmail" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Por favor, ingrese su email";
        div.appendChild(mensajeDiv);

    } else if ( mensaje === "errorIngresarContrasenha" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Por favor, ingrese su contraseña";
        div.appendChild(mensajeDiv);

    } else if ( mensaje === "errorUsuario" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Registro incorrecto: El usuario ya existe";
        div.appendChild(mensajeDiv);
    }

    // Imagen DCHA
    const imagen2 = document.createElement('img');
    imagen2.className = 'imagenL';
    imagen2.src = imgErrI;
    div.appendChild(imagen2);
    
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}



/*  =====================================================================================
 *                                  ERRORES MSG-ALERTA EN EL MENU
 *  =====================================================================================
*/
export function mostrarAlertaMENU(causa, mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    // Imagen IZDA
    const imagen = document.createElement('img');
    imagen.className = 'imagenMR';
    imagen.src = sadOtter;
    div.appendChild(imagen);

    if ( causa === "errorIdPartida" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "No existe la partida con ese ID";
        div.appendChild(mensajeDiv);
    } else if ( causa === "errorGemasTienda" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    } else if ( causa === "errorSkinTienda" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    } 

    // Imagen DCHA
    const imagen2 = document.createElement('img');
    imagen2.className = 'imagenML';
    imagen2.src = sadOtter;
    div.appendChild(imagen2);
    
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}



/*  =====================================================================================
 *                                  ALERTAS PARA BANCO
 *  =====================================================================================
*/
export function mostrarAlertaBanco(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    if (mensaje === "bancoIngresarBien"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Dinero ingresado correctamente";
        div.appendChild(mensajeDiv);

    } else if (mensaje === "bancoIngresarMal"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "No se ha podido ingresar el dinero en el banco";
        div.appendChild(mensajeDiv);

    } else if (mensaje === "bancoRetirarBien"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Dinero retirado correctamente";
        div.appendChild(mensajeDiv);

    } else if (mensaje === "bancoRetirarMal"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "No hay suficiente dinero en el banco";
        div.appendChild(mensajeDiv);
    }

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 3;
    contadorDiv.textContent = ` ${segundosRestantes} `;
    div.appendChild(contadorDiv);

    document.body.appendChild(div);

    const intervalo = setInterval(() => {
        segundosRestantes--;
        contadorDiv.textContent = `${segundosRestantes}`;
        if (segundosRestantes === 0) {
            clearInterval(intervalo);
            div.classList.add('salir2'); 
            setTimeout(() => {
                div.remove();
            }, 500); 
        }
    }, 1000);
}


/*  =====================================================================================
 *                                  ALERTAS PARA CASINO
 *  =====================================================================================
*/
export function mostrarAlertaCasino(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    // Añadimos imagen
    const imagen = document.createElement('img');
    imagen.className = 'imagen2';
    imagen.src = banco;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "No tienes suficiente dinero para apostar esa cantidad";
    div.appendChild(mensajeDiv);

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 3;
    contadorDiv.textContent = ` ${segundosRestantes} `;
    div.appendChild(contadorDiv);

    document.body.appendChild(div);

    const intervalo = setInterval(() => {
        segundosRestantes--;
        contadorDiv.textContent = `${segundosRestantes}`;
        if (segundosRestantes === 0) {
            clearInterval(intervalo);
            div.classList.add('salir2'); 
            setTimeout(() => {
                div.remove();
            }, 500); 
        }
    }, 1000);
}


/*  =====================================================================================
 *                                  ALERTAS PARA INGRESAR
 *  =====================================================================================
*/
export function mostrarAlertaIngresar(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    if (mensaje === "ingresarNada"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Por favor, ingrese la cantidad";
        div.appendChild(mensajeDiv);

    } else if (mensaje === "ingresarMal"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "No puede ingresar más dinero del que tiene";
        div.appendChild(mensajeDiv);

    }

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 3;
    contadorDiv.textContent = ` ${segundosRestantes} `;
    div.appendChild(contadorDiv);

    document.body.appendChild(div);

    const intervalo = setInterval(() => {
        segundosRestantes--;
        contadorDiv.textContent = `${segundosRestantes}`;
        if (segundosRestantes === 0) {
            clearInterval(intervalo);
            div.classList.add('salir2'); /* Agregar clase para desaparecer */
            setTimeout(() => {
                div.remove();
            }, 500); /* Esperar a que termine la animación para borrar la alerta */
        }
    }, 1000);
}


/*  =====================================================================================
 *                                  ALERTAS PARA PARTIDA
 *  =====================================================================================
*/
export function mostrarAlertaPartida(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    // Añadimos imagen
    const imagen = document.createElement('img');
    imagen.className = 'imagen2';
    imagen.src = banco;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "Por favor, ingrese el id";
    div.appendChild(mensajeDiv);

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 3;
    contadorDiv.textContent = ` ${segundosRestantes} `;
    div.appendChild(contadorDiv);

    document.body.appendChild(div);

    const intervalo = setInterval(() => {
        segundosRestantes--;
        contadorDiv.textContent = `${segundosRestantes}`;
        if (segundosRestantes === 0) {
            clearInterval(intervalo);
            div.classList.add('salir2'); 
            setTimeout(() => {
                div.remove();
            }, 500); 
        }
    }, 1000);
}



/*  =====================================================================================
 *                                  ALERTAS PARA RETIRAR
 *  =====================================================================================
*/
export function mostrarAlertaRetirar(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    if (mensaje === "ingresarCantidad"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Por favor, ingrese la cantidad";
        div.appendChild(mensajeDiv);

    } else if (mensaje === "cantidadMal"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "No puede retirar más dinero del que tiene";
        div.appendChild(mensajeDiv);

    }

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 3;
    contadorDiv.textContent = ` ${segundosRestantes} `;
    div.appendChild(contadorDiv);

    document.body.appendChild(div);

    const intervalo = setInterval(() => {
        segundosRestantes--;
        contadorDiv.textContent = `${segundosRestantes}`;
        if (segundosRestantes === 0) {
            clearInterval(intervalo);
            div.classList.add('salir2'); /* Agregar clase para desaparecer */
            setTimeout(() => {
                div.remove();
            }, 500); /* Esperar a que termine la animación para borrar la alerta */
        }
    }, 1000);
}


/*  =====================================================================================
 *                                  ALERTAS PARA SUBASTAR
 *  =====================================================================================
*/
export function mostrarAlertaSubastar(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    // Añadimos imagen
    const imagen = document.createElement('img');
    imagen.className = 'imagen2';
    imagen.src = banco;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "Por favor, ingrese la cantidad";
    div.appendChild(mensajeDiv);

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 3;
    contadorDiv.textContent = ` ${segundosRestantes} `;
    div.appendChild(contadorDiv);

    document.body.appendChild(div);

    const intervalo = setInterval(() => {
        segundosRestantes--;
        contadorDiv.textContent = `${segundosRestantes}`;
        if (segundosRestantes === 0) {
            clearInterval(intervalo);
            div.classList.add('salir2'); 
            setTimeout(() => {
                div.remove();
            }, 500); 
        }
    }, 1000);
}



/*  =====================================================================================
 *                                  ALERTAS PARA SUPERPODER
 *  =====================================================================================
*/
export function mostrarAlertaSuperpoder(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    // Añadimos imagen
    const imagen = document.createElement('img');
    imagen.className = 'imagen2';
    imagen.src = banco;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "Por favor, ingresa una posición correcta";
    div.appendChild(mensajeDiv);

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 3;
    contadorDiv.textContent = ` ${segundosRestantes} `;
    div.appendChild(contadorDiv);

    document.body.appendChild(div);

    const intervalo = setInterval(() => {
        segundosRestantes--;
        contadorDiv.textContent = `${segundosRestantes}`;
        if (segundosRestantes === 0) {
            clearInterval(intervalo);
            div.classList.add('salir2'); 
            setTimeout(() => {
                div.remove();
            }, 500); 
        }
    }, 1000);
}



/*  =====================================================================================
 *                                  ALERTAS PARA TORNEO
 *  =====================================================================================
*/
export function mostrarAlertaTorneo(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    // Añadimos imagen
    const imagen = document.createElement('img');
    imagen.className = 'imagen2';
    imagen.src = banco;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "Por favor, ingrese el id";
    div.appendChild(mensajeDiv);

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 3;
    contadorDiv.textContent = ` ${segundosRestantes} `;
    div.appendChild(contadorDiv);

    document.body.appendChild(div);

    const intervalo = setInterval(() => {
        segundosRestantes--;
        contadorDiv.textContent = `${segundosRestantes}`;
        if (segundosRestantes === 0) {
            clearInterval(intervalo);
            div.classList.add('salir2'); 
            setTimeout(() => {
                div.remove();
            }, 500); 
        }
    }, 1000);
}


/*  =====================================================================================
 *                                  ALERTAS PARA REGISTER
 *  =====================================================================================
*/
export function mostrarAlertaRegister(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    // Añadimos imagen
    const imagen = document.createElement('img');
    imagen.className = 'imagen2';
    imagen.src = banco;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "Te has registrado correctamente. Inicie sesión aquí";
    div.appendChild(mensajeDiv);

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 3;
    contadorDiv.textContent = ` ${segundosRestantes} `;
    div.appendChild(contadorDiv);

    document.body.appendChild(div);

    const intervalo = setInterval(() => {
        segundosRestantes--;
        contadorDiv.textContent = `${segundosRestantes}`;
        if (segundosRestantes === 0) {
            clearInterval(intervalo);
            div.classList.add('salir2'); 
            setTimeout(() => {
                div.remove();
            }, 500); 
        }
    }, 1000);
}



/*  =====================================================================================
 *                                  ALERTAS PARA RETIRAR
 *  =====================================================================================
*/
export function mostrarAlertaSkins(causa, mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    if (causa === "comprar"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    } else if (causa === "equipar"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    }

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 3;
    contadorDiv.textContent = ` ${segundosRestantes} `;
    div.appendChild(contadorDiv);

    document.body.appendChild(div);

    const intervalo = setInterval(() => {
        segundosRestantes--;
        contadorDiv.textContent = `${segundosRestantes}`;
        if (segundosRestantes === 0) {
            clearInterval(intervalo);
            div.classList.add('salir2'); /* Agregar clase para desaparecer */
            setTimeout(() => {
                div.remove();
            }, 500); /* Esperar a que termine la animación para borrar la alerta */
        }
    }, 1000);
}




/*  =====================================================================================
 *                                  ALERTAS PARA BANCO
 *  =====================================================================================
*/
export function mostrarAlertaBanco2(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    if (mensaje === "alerta1"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "mensaje";
        div.appendChild(mensajeDiv);

    } else if (mensaje === "alerta1"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "mensaje";
        div.appendChild(mensajeDiv);

    }

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 3;
    contadorDiv.textContent = ` ${segundosRestantes} `;
    div.appendChild(contadorDiv);

    document.body.appendChild(div);

    const intervalo = setInterval(() => {
        segundosRestantes--;
        contadorDiv.textContent = `${segundosRestantes}`;
        if (segundosRestantes === 0) {
            clearInterval(intervalo);
            div.classList.add('salir2'); /* Agregar clase para desaparecer */
            setTimeout(() => {
                div.remove();
            }, 500); /* Esperar a que termine la animación para borrar la alerta */
        }
    }, 1000);
}



  