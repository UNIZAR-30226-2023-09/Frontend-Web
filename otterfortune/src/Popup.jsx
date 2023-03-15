import React, { useState } from "react";
import './Popup.css';

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const Popup = (props) => {
  //const [content, setContent] = useState("");
  const [id, setId] = useState(""); // Agregar esta línea
  console.log(props.content);

  const handleAccept = () => {
    // TODO:
    // Aquí iría comprobar el mensaje de unirse con el id
    console.log(id);
    // Esto te lleva de vuelta al menú, habría que mirar como ir a 
    // la pantalla del monopoly y pasarle el ID.
    // Seria hacer algo tipo <Tablero id={id} />
    // Y que tablero reciba props y acceder con props.id
    props.handleClose(id);
  };
  
  return (
  <div className="popup">
    <div className="popup__content">
      <button className="popup__close" onClick={props.handleClose}>X</button>
      <div>
        <label htmlFor="text" className="popup__label">
          {props.content}</label>
          <input
            type="number"
            id="input-id" /* Para modificar solo este en el css*/
            value={id}
            onChange={(e) => setId(e.target.value)}  /* almacenar el valor introducido en id*/
          />
      </div>
      <div className="buttons-container">
        <div className="cancel">
          <button onClick={props.handleClose}>Cancelar</button>
        </div>
        <div className="acept">
          <button onClick={handleAccept}>Aceptar</button>
        </div>

      </div>
    </div>
  </div>

  );
};

export default Popup;