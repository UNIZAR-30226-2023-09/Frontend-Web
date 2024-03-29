/*import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './loading.css';

const Loading = ({ isLoading }) => {
  if (!isLoading) {
	return null;
  }

  return (
	<div className="loading">
	  <FaSpinner className="loading-icon" />
	  <h2>Cargando...</h2>
	</div>
  );
};

export default Loading;*/

import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import './CSS/loading.css';
import Tablero from "./Tablero";
import loginVideo from "./Imagenes/loginVideo.mp4";

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';
import { sesion, estadoPartida } from './estadoGeneral.js';


const Loading = (props) => {
	const [showTablero, setshowTablero] = useState(false);

	const socket = useSocket();

	console.log("props.partidaJuego: " + props.partidaJuego);

	async function iniciarPartida(socket) {
		const empezar = await socketActions.esperarEmpezarPartida(socket);
		if (empezar) {
			setshowTablero(true);
		}
	}

	async function iniciarTorneo(socket) {
		const empezar = await socketActions.esperarEmpezarTorneo(socket);
		if (empezar) {
			setshowTablero(true);
		}
	}

	useEffect(() => {
		if (props.partidaJuego) {
			iniciarTorneo(socket, setshowTablero);
		}
		else {
			iniciarPartida(socket, setshowTablero);
		}
	  }, [socket, setshowTablero]);

	
	if (showTablero) {
		return <Tablero email={props.email} gemas={props.gemas} />;
	}

	return (
		<div >
			<video autoPlay loop className="video-fondo">
				<source src={loginVideo} type="video/mp4"></source>
			</video>
			<div className="text-container">
				<h2>Te has unido correctamente</h2>
				<h2>Esperando a que el líder de comienzo</h2>
				<FaSpinner className="loading-icon" />
			</div>
		</div>
	);
};

export default Loading;


/*<div className="loading">
  <h2>Te has unido correctamente</h2>
  <h2>Esperando a que el líder de comienzo</h2>
  <FaSpinner className="loading-icon" />
</div>*/
