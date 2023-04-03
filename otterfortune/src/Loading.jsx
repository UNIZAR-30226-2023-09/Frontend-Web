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
import Menu from "./Menu";
import loginVideo from "./Imagenes/loginVideo.mp4";


const Loading = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // TODO: Aquí iria a la del monopoly 
      // TODO: Mirar para hacerlo con variable y no ocn tiempo
      setShowMenu(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  /* 
  useEffect(() => {
    const interval = setInterval(() => {
      // TODO: Ver como pasar lo de empezar la partida
      let empezarP = true;
      if (empezarP) {
        setShowMenu(true);
        clearInterval(interval);
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  */
  if (showMenu) {
    return <Menu email={props.email} gemas={props.gemas}/>;
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
