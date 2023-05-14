import React, { useState } from 'react';
import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import './styles.css';
import { sesion, estadoPartida } from './estadoGeneral.js';


export default function App() {

  const socket = useSocket();

  return (
    <div className="App">
      
      <div className="header">
        <h1>Entorno de pruebas</h1>
        <div className="botonera">
          <button onClick={() => socketActions.printEstado()}>Print estado</button>
          <button onClick={() => window.location.reload()}>Conectar</button>
        </div>
      </div>

      <br/><hr/><hr/>
      <h2>Menú</h2>

      <hr/><div className="registrarse">
        <a>registrarse</a>
        <input type="text" id="registrarse_Email" placeholder="email" />
        <input type="text" id="registrarse_Pass" placeholder="pass" />
        <input type="text" id="registrarse_Nombre" placeholder="name" />
        <button onClick={() => {
          socketActions.registrarse(socket, 
                                    document.getElementById('registrarse_Email').value,
                                    document.getElementById('registrarse_Pass').value,
                                    document.getElementById('registrarse_Nombre').value);
        }}>Submit</button>
      </div>

      <hr/><div className="iniciarSesion">
        <a>iniciarSesion </a>
        <input type="text" placeholder="email" onChange={(event) => sesion.email = event.target.value} />
        <input type="text" id="iniciarSesion_Pass" placeholder="pass" />
        <button onClick={() => {
          socketActions.iniciarSesion(socket,
                                    sesion.email,
                                    document.getElementById('iniciarSesion_Pass').value);
        }}>Submit</button>
      </div>

      <hr/><div className="crearPartida">
        <a>crearPartida </a>
        <button onClick={() => {
          socketActions.crearPartida(socket, sesion.email);
        }}>Submit</button>
      </div>

      <hr/><div className="unirsePartida">
        <a>unirsePartida </a>
        <input type="text" id="unirsePartida_ID_Partida" placeholder="id_partida" />
        <button onClick={() => {
          socketActions.unirsePartida(socket,
                                    sesion.email,
                                    document.getElementById('unirsePartida_ID_Partida').value);
        }}>Submit</button>
      </div>

      <hr/><div className="esperarEmpezarPartida">
        <a>esperarEmpezarPartida (no líder) </a>
        <button onClick={() => {
          socketActions.esperarEmpezarPartida(socket);
        }}>Submit</button>
      </div>
      
      <hr/><div className="empezarPartida">
        <a>empezarPartida (líder) </a>
        <input type="text" id="empezarPartida_ID_Partida" placeholder="id_partida" />
        <button onClick={() => {
          socketActions.empezarPartida(socket,
                                    document.getElementById('empezarPartida_ID_Partida').value,
                                    sesion.email);
        }}>Submit</button>
      </div>

      <hr/><div className="crearTorneo">
        <a>crearTorneo</a>
        <button onClick={() => {
          socketActions.crearTorneo(socket,
                                sesion.email);
        }}>Submit</button>
      </div>

      <hr/><div className="unirseTorneo">
        <a>unirseTorneo</a>
        <input type="text" id="unirseTorneo_ID_Torneo" placeholder="id_torneo" />
        <button onClick={() => {
          socketActions.unirseTorneo(socket,
                                    sesion.email,
                                    document.getElementById('unirseTorneo_ID_Torneo').value);
        }}>Submit</button>
      </div>

      <hr/><div className="esperarEmpezarTorneo">
        <a>esperarEmpezarTorneo (no lider)</a>
        <button onClick={() => {
          socketActions.esperarEmpezarTorneo(socket);
        }}>Submit</button>
      </div>

      <hr/><div className="empezarTorneo">
        <a>empezarTorneo (lider)</a>
        <input type="text" id="empezarTorneo_ID_Torneo" placeholder="id_torneo" />
        <button onClick={() => {
          socketActions.empezarTorneo(socket,
                                    document.getElementById('empezarTorneo_ID_Torneo').value,
                                    sesion.email);
        }}>Submit</button>
      </div>

      <br/><hr/><hr/>
      <h2>Tienda</h2>

      <hr/><div className="verSkins">
        <a>verSkins</a>
        <button onClick={() => {
          socketActions.verSkins(socket, 
                                sesion.email);
        }}>Submit</button>
      </div>

      <hr/><div className="comprarSkin">
        <a>comprarSkin</a>
        <input type="text" id="comprarSkin_skin" placeholder="skin" />
        <button onClick={() => {
          socketActions.comprarSkin(socket, 
                                sesion.email,
                                document.getElementById('comprarSkin_skin').value);
        }}>Submit</button>
      </div>

      <hr/><div className="equiparSkin">
        <a>equiparSkin</a>
        <input type="text" id="equiparSkin_skin" placeholder="skin" />
        <button onClick={() => {
          socketActions.equiparSkin(socket, 
                                sesion.email,
                                document.getElementById('equiparSkin_skin').value);
        }}>Submit</button>
      </div>

      <br/><hr/><hr/>
      <h2>Partida</h2>

      <hr/><div className="lanzarDados">
        <a>lanzarDados</a>
        <button onClick={() => {
          socketActions.lanzarDados(socket, 
                                    sesion.email,
                                    estadoPartida.id_partida);
        }}>Submit</button>
      </div>

      <hr/><div className="apostar">
        <a>apostar</a>
        <input type="text" id="apostar_cantidad" placeholder="cantidad" />
        suerte <input type="checkbox" name="apostar_suerte" value="1" />
        <button onClick={() => {
          const checkbox = document.querySelector('input[name="apostar_suerte"]:checked');
          const suerte = checkbox ? '1' : '0';
          socketActions.apostar(socket, 
                                sesion.email,
                                estadoPartida.id_partida,
                                document.getElementById('apostar_cantidad').value,
                                suerte);
          }}>Submit</button>
      </div>

      <hr/><div className="meterBanco">
        <a>meterBanco</a>
        <input type="text" id="meterBanco_cantidad" placeholder="cantidad" />
        <button onClick={() => {
          socketActions.meterBanco(socket, 
                                sesion.email,
                                estadoPartida.id_partida,
                                document.getElementById('meterBanco_cantidad').value);
        }}>Submit</button>
      </div>

      <hr/><div className="sacarBanco">
        <a>sacarBanco</a>
        <input type="text" id="sacarBanco_cantidad" placeholder="cantidad" />
        <button onClick={() => {
          socketActions.sacarBanco(socket, 
                                sesion.email,
                                estadoPartida.id_partida,
                                document.getElementById('sacarBanco_cantidad').value);
        }}>Submit</button>
      </div>

      <hr/><div className="comprarPropiedad">
        <a>comprarPropiedad</a>
        <button onClick={() => {
          socketActions.comprarPropiedad(socket, 
                                    sesion.email,
                                    estadoPartida.comprarPropiedad,
                                    estadoPartida.id_partida);
        }}>Submit</button>
      </div>

      <hr/><div className="noComprarPropiedad">
        <a>noComprarPropiedad</a>
        <button onClick={() => {
          socketActions.noComprarPropiedad(socket);
        }}>Submit</button>
      </div>

      <hr/><div className="quieroVenderPropiedad">
        <a>quieroVenderPropiedad</a>
        <input type="text" id="quieroVenderPropiedad_propiedad" placeholder="propiedad" />
        <button onClick={() => {
          socketActions.quieroVenderPropiedad(socket, 
                                sesion.email,
                                document.getElementById('quieroVenderPropiedad_propiedad').value,
                                estadoPartida.id_partida);
        }}>Submit</button>
      </div>

      <hr/><div className="venderPropiedad">
        <a>venderPropiedad</a>
        <input type="text" id="venderPropiedad_propiedad" placeholder="propiedad" />
        <button onClick={() => {
          socketActions.venderPropiedad(socket, 
                                sesion.email,
                                document.getElementById('venderPropiedad_propiedad').value,
                                estadoPartida.id_partida);
        }}>Submit</button>
      </div>

      <hr/><div className="quieroEdificar">
        <a>quieroEdificar</a>
        <button onClick={() => {
          socketActions.quieroEdificar(socket, 
                                sesion.email,
                                estadoPartida.id_partida);
        }}>Submit</button>
      </div>

      <hr/><div className="edificarPropiedad">
        <a>edificarPropiedad</a>
        <input type="text" id="edificarPropiedad_propiedad" placeholder="propiedad" />
        <input type="text" id="edificarPropiedad_precio" placeholder="precio" />
        <button onClick={() => {
          socketActions.edificarPropiedad(socket, 
                                sesion.email,
                                estadoPartida.id_partida,
                                document.getElementById('edificarPropiedad_propiedad').value,
                                document.getElementById('edificarPropiedad_precio').value);
        }}>Submit</button>
      </div>

      <hr/><div className="finTurno">
        <a>finTurno</a>
        <button onClick={() => {
          socketActions.finTurno(socket, 
                                    sesion.email,
                                    estadoPartida.id_partida);
        }}>Submit</button>
      </div>

      <hr/><div className="desplazarJugador">
        <a>desplazarJugador</a>
        <input type="text" id="desplazarJugador_posicion" placeholder="posicion" />
        <button onClick={() => {
          socketActions.desplazarJugador(socket, 
                                sesion.email,
                                estadoPartida.id_partida,
                                document.getElementById('desplazarJugador_posicion').value);
        }}>Submit</button>
      </div>

      <hr/><div className="pagarLiberarseCarcel">
        <a>pagarLiberarseCarcel</a>
        <button onClick={() => {
          socketActions.pagarLiberarseCarcel(socket, 
                                sesion.email,
                                estadoPartida.id_partida);
        }}>Submit</button>
      </div>

      <hr/><div className="subastar">
        <a>subastar</a>
        <input type="text" id="subastar_propiedad" placeholder="propiedad" />
        <input type="text" id="subastar_precio" placeholder="precio" />
        <button onClick={() => {
          socketActions.subastar(socket,
                                estadoPartida.id_partida,
                                sesion.email,
                                document.getElementById('subastar_propiedad').value,
                                document.getElementById('subastar_precio').value);
        }}>Submit</button>
      </div>

      <hr/><div className="chat">
        <a>chat</a>
        <input type="text" id="chat_mensaje" placeholder="mensaje" />
        <button onClick={() => {
          socketActions.chat(socket, 
                                sesion.email,
                                estadoPartida.id_partida,
                                document.getElementById('chat_mensaje').value);
        }}>Submit</button>
      </div>

      <hr/><div className="venderEdificacion">
        <a>venderEdificacion</a>
        <input type="text" id="venderEdificacion_propiedad" placeholder="propiedad" />
        <button onClick={() => {
          socketActions.venderEdificacion(socket,
                                sesion.email,                    
                                estadoPartida.id_partida,
                                document.getElementById('venderEdificacion_propiedad').value);
        }}>Submit</button>
      </div>

      <hr/><div className="comprarSubasta">
        <a>comprarSubasta</a>
        <input type="text" id="comprarSubasta_propiedad" placeholder="propiedad" />
        <button onClick={() => {
          socketActions.comprarSubasta(socket,
                                sesion.email,                    
                                estadoPartida.id_partida,
                                estadoPartida.subastaJugador);
        }}>Submit</button>
      </div>

    </div>
  );
}
