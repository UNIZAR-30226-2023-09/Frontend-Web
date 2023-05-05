import React, { useState } from 'react';
import styles from './CSS/alertas.css'; // Importar el CSS como módulo

import imgErrD from './Imagenes/ANGRY_OTTER.jpg';
import imgErrI from './Imagenes/ANGRY_OTTER.jpg';

import banco from './Imagenes/otter.png';
import banco2 from './Imagenes/banco.png';

import sadOtter from './Imagenes/sad.png';

import otterVacio from './Imagenes/OTTER_LUPA.png';

import otterLaugh from './Imagenes/OTTER_LAUGH.png';

import imgAlquiler from './Imagenes/ALQUILER.png';
import imgTax from './Imagenes/ANDORRA.png';
import imgLuxTax from './Imagenes/ANDORRA.png';
import imgSuerte from './Imagenes/SUERTE.png';

import imgComprar from './Imagenes/COMPRAR.png';
import imgVender from './Imagenes/VENDER.png';

import imgRuleta from './Imagenes/ruleta.png';

import imgEdificar from './Imagenes/CASAS_HOTEL/C1.png';
import imgSubasta from './Imagenes/SUBASTA.png';

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
    } else if ( causa === "errorIdTorneo" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
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
 *                                  ERRORES MSG-ALERTA CAMPOS VACIOS
 *  =====================================================================================
*/
export function mostrarAlertaVACIOS(causa, mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    // Imagen IZDA
    const imagen = document.createElement('img');
    imagen.className = 'imagenMR';
    imagen.src = otterVacio;
    div.appendChild(imagen);

    if ( causa === "errorIdVacioPartida" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    } else if ( causa === "errorIdVacioTorneo" ){
        // Texto de ERROR
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    } 

    // Imagen DCHA
    const imagen2 = document.createElement('img');
    imagen2.className = 'imagenML';
    imagen2.src = otterVacio;
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
        imagen.src = banco2;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Dinero ingresado correctamente";
        div.appendChild(mensajeDiv);

    } else if (mensaje === "bancoRetirarBien"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco2;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Dinero retirado correctamente";
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

// *********** FUNCIONES DE ERRORES ***********//

export function errorBanco(causa, mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    if ( causa === "bancoIngresarMal" ){
        // Imagen IZDA
        const imagen = document.createElement('img');
        imagen.className = 'imagenMR';
        imagen.src = sadOtter;
        div.appendChild(imagen);
        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "No se ha podido ingresar el dinero en el banco";
        div.appendChild(mensajeDiv);
        // Imagen DCHA
        const imagen2 = document.createElement('img');
        imagen2.className = 'imagenML';
        imagen2.src = sadOtter;
        div.appendChild(imagen2);

    } else if ( causa === "bancoRetirarMal" ){
        // Imagen IZDA
        const imagen = document.createElement('img');
        imagen.className = 'imagenMR';
        imagen.src = otterLaugh;
        div.appendChild(imagen);
        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "No tienes tanta pasta en el banco CRACK :) ";
        div.appendChild(mensajeDiv);
        // Imagen DCHA
        const imagen2 = document.createElement('img');
        imagen2.className = 'imagenML';
        imagen2.src = otterLaugh;
        div.appendChild(imagen2);
    } 

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}



/*  =====================================================================================
 *                                  ALERTAS PARA CASINO
 *  =====================================================================================
*/

// *********** FUNCIONES DE ERRORES ***********//

export function mostrarAlertaCasino(mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    // Imagen IZDA
    const imagen = document.createElement('img');
    imagen.className = 'imagenMR';
    imagen.src = otterLaugh;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "No tienes tanta pasta WANNABE jajajaja, vete a la tragaperras";
    div.appendChild(mensajeDiv);

    // Imagen DCHA
    const imagen2 = document.createElement('img');
    imagen2.className = 'imagenML';
    imagen2.src = otterLaugh;
    div.appendChild(imagen2);
    
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}


/*  =====================================================================================
 *                                  ALERTAS PARA INGRESAR
 *  =====================================================================================
*/

export function mostrarAlertaIngresar(mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    // Imagen IZDA
    const imagen = document.createElement('img');
    imagen.className = 'imagenMR';
    imagen.src = otterVacio;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "Vaya! parece que se te ha olvidado introducir la cantidad";
    div.appendChild(mensajeDiv);

    // Imagen DCHA
    const imagen2 = document.createElement('img');
    imagen2.className = 'imagenML';
    imagen2.src = otterVacio;
    div.appendChild(imagen2);
    
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}


// *********** FUNCIONES DE ERRORES ***********//

export function errorIngresar(mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    // Imagen IZDA
    const imagen = document.createElement('img');
    imagen.className = 'imagenMR';
    imagen.src = otterLaugh;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "No tienes tanta pasta CRACK";
    div.appendChild(mensajeDiv);

    // Imagen DCHA
    const imagen2 = document.createElement('img');
    imagen2.className = 'imagenML';
    imagen2.src = otterLaugh;
    div.appendChild(imagen2);
    
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}



/*  =====================================================================================
 *                                  ALERTAS PARA INGRESAR
 *  =====================================================================================
*/

export function mostrarAlertaRetirar(mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    // Imagen IZDA
    const imagen = document.createElement('img');
    imagen.className = 'imagenMR';
    imagen.src = otterVacio;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "Vaya! parece que se te ha olvidado introducir la cantidad";
    div.appendChild(mensajeDiv);

    // Imagen DCHA
    const imagen2 = document.createElement('img');
    imagen2.className = 'imagenML';
    imagen2.src = otterVacio;
    div.appendChild(imagen2);
    
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}


// *********** FUNCIONES DE ERRORES ***********//

export function errorRetirar(mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    // Imagen IZDA
    const imagen = document.createElement('img');
    imagen.className = 'imagenMR';
    imagen.src = otterLaugh;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "No tienes tanta pasta CRACK";
    div.appendChild(mensajeDiv);

    // Imagen DCHA
    const imagen2 = document.createElement('img');
    imagen2.className = 'imagenML';
    imagen2.src = otterLaugh;
    div.appendChild(imagen2);
    
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}


/*  =====================================================================================
 *                                  ALERTAS PARA SUBASTAR
 *  =====================================================================================
*/

export function mostrarAlertaSubastar(mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    // Imagen IZDA
    const imagen = document.createElement('img');
    imagen.className = 'imagenMR';
    imagen.src = otterVacio;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "Vaya! parece que se te ha olvidado introducir la cantidad";
    div.appendChild(mensajeDiv);

    // Imagen DCHA
    const imagen2 = document.createElement('img');
    imagen2.className = 'imagenML';
    imagen2.src = otterVacio;
    div.appendChild(imagen2);
    
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}


/*  =====================================================================================
 *                                  ALERTAS PARA SUPERPODER
 *  =====================================================================================
*/

export function mostrarAlertaSuperpoder(mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    // Imagen IZDA
    const imagen = document.createElement('img');
    imagen.className = 'imagenMR';
    imagen.src = otterVacio;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "Vaya! parece que la posicion elegida no es correcta";
    div.appendChild(mensajeDiv);

    // Imagen DCHA
    const imagen2 = document.createElement('img');
    imagen2.className = 'imagenML';
    imagen2.src = otterVacio;
    div.appendChild(imagen2);
    
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
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
 *                                  ALERTAS PARA SKINS
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
 *                                  ALERTAS PARA PAGAR
 *  =====================================================================================
*/
export function mostrarAlertaPagar(causa, mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    if (causa === "alquiler"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = imgAlquiler;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    } else if (causa === "tax"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = imgTax;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    } else if (causa === "luxuryTax"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = imgLuxTax;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    } else if (causa === "suerte"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = imgSuerte;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    }

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 2;
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
 *                                  ALERTAS PARA PROPIEDAD
 *  =====================================================================================
*/
export function mostrarAlertaPropiedad(causa, mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    if (causa === "comprar"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = imgComprar;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    } else if (causa === "vender"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = imgVender;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);
    } 

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 2;
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

// *********** FUNCIONES DE ERRORES ***********//

export function errorPropiedad(causa, mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    // Imagen IZDA
    const imagen = document.createElement('img');
    imagen.className = 'imagenMR';
    imagen.src = otterLaugh;
    div.appendChild(imagen);
    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "No tienes suficiente pasta para comprar la propiedad CRACK";
    div.appendChild(mensajeDiv);
    // Imagen DCHA
    const imagen2 = document.createElement('img');
    imagen2.className = 'imagenML';
    imagen2.src = otterLaugh;
    div.appendChild(imagen2);


    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}


/*  =====================================================================================
 *                                  ALERTAS PARA RULETA
 *  =====================================================================================
*/
export function mostrarAlertaRULETA(causa, mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    if (causa === "ganar"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = imgRuleta;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

    } else if (causa === "perder"){
        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = otterLaugh;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Has perdido JAJAJAJAJAiuytfcvbhgrexdd --> RETIRATE LUDÓPATA";
        div.appendChild(mensajeDiv);

    }

    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 2;
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
 *                                  ALERTAS PARA BANCO
 *  =====================================================================================
*/
export function mostrarAlertaDesplazar(causa, mensaje) {
    
    if( causa === "bien"){

        const div = document.createElement('div');
        div.className = 'alerta2';

        // Añadimos imagen
        const imagen = document.createElement('img');
        imagen.className = 'imagen2';
        imagen.src = banco;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);

        // Añadimos el contador
        const contadorDiv = document.createElement('div');
        contadorDiv.className = 'contadorDiv2';
        let segundosRestantes = 2;
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

    } else if ( causa === "mal"){

        const div = document.createElement('div');
        div.className = 'alertaM';

        // Imagen IZDA
        const imagen = document.createElement('img');
        imagen.className = 'imagenMR';
        imagen.src = otterVacio;
        div.appendChild(imagen);

        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Vaya! parece que puedes desplazarte a esa posicion";
        div.appendChild(mensajeDiv);

        // Imagen DCHA
        const imagen2 = document.createElement('img');
        imagen2.className = 'imagenML';
        imagen2.src = otterVacio;
        div.appendChild(imagen2);
        
        document.body.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}




/*  =====================================================================================
 *                                  ALERTAS PARA CARCEL
 *  =====================================================================================
*/
export function mostrarAlertaCarcel(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    // Añadimos imagen
    const imagen = document.createElement('img');
    imagen.className = 'imagen2';
    imagen.src = imgErrD;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "ENHORABUENA, el dinero de PAPA te ha sacado de la Carcel :^V ";
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

// *********** FUNCIONES DE ERRORES ***********//

export function errorCarcel(causa, mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    if ( causa === "noPuedes" ){
        // Imagen IZDA
        const imagen = document.createElement('img');
        imagen.className = 'imagenMR';
        imagen.src = sadOtter;
        div.appendChild(imagen);
        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = mensaje;
        div.appendChild(mensajeDiv);
        // Imagen DCHA
        const imagen2 = document.createElement('img');
        imagen2.className = 'imagenML';
        imagen2.src = sadOtter;
        div.appendChild(imagen2);

    } else if ( causa === "noDinero" ){
        // Imagen IZDA
        const imagen = document.createElement('img');
        imagen.className = 'imagenMR';
        imagen.src = otterLaugh;
        div.appendChild(imagen);
        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "No tienes pasta CRACK parece que te quedas en el ZULO JAJAJAJA";
        div.appendChild(mensajeDiv);
        // Imagen DCHA
        const imagen2 = document.createElement('img');
        imagen2.className = 'imagenML';
        imagen2.src = otterLaugh;
        div.appendChild(imagen2);
    } 

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}


/*  =====================================================================================
 *                                  ALERTAS PARA EDIFICAR
 *  =====================================================================================
*/
export function mostrarAlertaEdificar(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    // Añadimos imagen
    const imagen = document.createElement('img');
    imagen.className = 'imagen2';
    imagen.src = imgEdificar;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = mensaje;
    div.appendChild(mensajeDiv);
     
    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 2;
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

// *********** FUNCIONES DE ERRORES ***********//

export function errorEdificar(causa, mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    if ( causa === "noPuedes" ){
        // Imagen IZDA
        const imagen = document.createElement('img');
        imagen.className = 'imagenMR';
        imagen.src = otterVacio;
        div.appendChild(imagen);
        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Vaya! parece que no puedes edificar mas en esta propiedad";
        div.appendChild(mensajeDiv);
        // Imagen DCHA
        const imagen2 = document.createElement('img');
        imagen2.className = 'imagenML';
        imagen2.src = otterVacio;
        div.appendChild(imagen2);

    } else if ( causa === "noDinero" ){
        // Imagen IZDA
        const imagen = document.createElement('img');
        imagen.className = 'imagenMR';
        imagen.src = otterLaugh;
        div.appendChild(imagen);
        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "No tienes pasta para edificar CRACK, que te crees que eres el AYUNTAMIENTO??";
        div.appendChild(mensajeDiv);
        // Imagen DCHA
        const imagen2 = document.createElement('img');
        imagen2.className = 'imagenML';
        imagen2.src = otterLaugh;
        div.appendChild(imagen2);
    } 

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}



/*  =====================================================================================
 *                                  ALERTAS PARA SUBASTARPROP
 *  =====================================================================================
*/
export function mostrarAlertaSubastarProp(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta2';

    // Añadimos imagen
    const imagen = document.createElement('img');
    imagen.className = 'imagen2';
    imagen.src = imgSubasta;
    div.appendChild(imagen);

    // Añadimos mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = mensaje;
    div.appendChild(mensajeDiv);
     
    // Añadimos el contador
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contadorDiv2';
    let segundosRestantes = 2;
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

// *********** FUNCIONES DE ERRORES ***********//

export function errorSubastarProp(causa, mensaje) {
    const div = document.createElement('div');
    div.className = 'alertaM';

    if ( causa === "subastaYa" ){
        // Imagen IZDA
        const imagen = document.createElement('img');
        imagen.className = 'imagenMR';
        imagen.src = otterVacio;
        div.appendChild(imagen);
        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Vaya! parece que ya hay una subasta en curso";
        div.appendChild(mensajeDiv);
        // Imagen DCHA
        const imagen2 = document.createElement('img');
        imagen2.className = 'imagenML';
        imagen2.src = otterVacio;
        div.appendChild(imagen2);

    } else if ( causa === "noDinero" ){
        // Imagen IZDA
        const imagen = document.createElement('img');
        imagen.className = 'imagenMR';
        imagen.src = otterLaugh;
        div.appendChild(imagen);
        // Añadimos mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.textContent = "Se te han adelantado y te han ganado la subasta JAJAJAJA";
        div.appendChild(mensajeDiv);
        // Imagen DCHA
        const imagen2 = document.createElement('img');
        imagen2.className = 'imagenML';
        imagen2.src = otterLaugh;
        div.appendChild(imagen2);
    } 

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3000);
}
