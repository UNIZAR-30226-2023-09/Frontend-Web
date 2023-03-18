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

const Loading = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // TODO: Aquí iria a la del monopoly 
      // TODO: Mirar para hacerlo con variable y no ocn tiempo
      setShowMenu(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showMenu) {
    return <Menu email={props.email}/>;
  }

  return (
    <div className="loading">
      <h2>Te has unido correctamente</h2>
      <h2>Esperando a que el líder de comienzo</h2>
      <FaSpinner className="loading-icon" />
    </div>
  );
};

export default Loading;



