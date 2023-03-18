import React, { useState } from "react";
import './CSS/EmpezarPartida.css';

// Props es como un struct que almacena la informacion con el nombre que
// se le da cuando llamas a la función.
const PopupEmpezar = (props) => {
  //const [content, setContent] = useState("");
  console.log(props.content);

  const handleAccept = () => {    
    // TODO: mirar como hacer esto para ir al tablero del monopoly
    props.handleCloseCreate();
  };
  
  return (
    <div className="popupE">
    <div className="popup__contentE">
        <div>
        <p className="popup__labelE">Partida creada correctamente con ID: 0</p>
        </div>
        <div className="buttons-containerE">
        <div className="aceptE">
            <button onClick={handleAccept}>Empezar Partida</button>
        </div>
        </div>
    </div>
    </div>
  );
};

export default PopupEmpezar;
  