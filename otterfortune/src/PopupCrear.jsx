import React, { useState } from "react";
import './PopupCrear.css';

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupCrear = (props) => {
  //const [content, setContent] = useState("");
  const [id, setId] = useState(""); // Agregar esta línea
  console.log(props.content);

  const handleAccept = () => {
    // TODO:
    // Aquí iría comprobar el mensaje de unirse con el id
    //console.log(id);
    // Esto te lleva de vuelta al menú, habría que mirar como ir a 
    // la pantalla del monopoly y pasarle el ID.
    // Seria hacer algo tipo <Tablero id={id} />
    // Y que tablero reciba props y acceder con props.id
    props.handleCloseCreate();
  };
  
  return (
    <div className="popup">
      <div className="popup__content">
        <button className="popup__close" onClick={props.handleCloseCreate}>X</button>
        <div>
          <p className="popup__label">{props.content}</p>
        </div>
        <div className="buttons-container">
          <div className="cancel">
            <button onClick={props.handleCloseCreate}>No</button>
          </div>
          <div className="acept">
            <button onClick={handleAccept}>Sí</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCrear;
  