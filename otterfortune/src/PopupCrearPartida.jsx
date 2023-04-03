import React, { useState } from "react";
import './CSS/PopupCrear.css';

import * as socketActions from './socketActions';
import { useSocket } from './socketContext';

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupCrearPartida = (props) => {
	//const [content, setContent] = useState("");
	const [id, setId] = useState(""); // Agregar esta línea
	console.log(props.content);

	const socket = useSocket();

	const handleAccept = async (e) => {
		// TODO:
		// Aquí iría comprobar el mensaje de unirse con el id
		//console.log(id);
		// Esto te lleva de vuelta al menú, habría que mirar como ir a 
		// la pantalla del monopoly y pasarle el ID.
		// Seria hacer algo tipo <Tablero id={id} />
		// Y que tablero reciba props y acceder con props.id

		// Obtener el id recibido del mensaje
		const id = await socketActions.crearPartida(socket, props.email);
		props.handleCloseCreate(id, true);
	};

	const handleClose = () => {
		props.handleClose();
	};
	
	return (
		<div className="popupC">
			<div className="popup__contentC">
				<button className="popup__closeC" onClick={handleClose}>X</button>
				<div>
					<p className="popup__labelC">¿Estás seguro de crear la partida?</p>
				</div>
				<div className="buttons-containerC">
					<div className="cancelC">
						<button onClick={handleClose}>No</button>
					</div>
					<div className="aceptC">
						<button onClick={handleAccept}>Sí</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopupCrearPartida;
