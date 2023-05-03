import React, { useState } from 'react';

import styles from './CSS/alertas.css'; // Importar el CSS como módulo

// este se cierra con tiempo

/*export function mostrarAlerta(mensaje) {
    const div = document.createElement('div');
    div.className = 'alerta';
    div.textContent = mensaje;
  
    document.body.appendChild(div);
  
    setTimeout(() => {
      div.remove();
    }, 3000);
  }
*/

// en este se pone un botton
export function mostrarAlerta(mensaje) {
  const div = document.createElement('div');
  div.className = 'alerta';

  const mensajeDiv = document.createElement('div');
  mensajeDiv.textContent = mensaje;
  div.appendChild(mensajeDiv);

  const botonCerrar = document.createElement('button');
  botonCerrar.textContent = 'Cerrar';
  botonCerrar.addEventListener('click', () => {
    div.remove();
  });
  div.appendChild(botonCerrar);

  document.body.appendChild(div);
}



  