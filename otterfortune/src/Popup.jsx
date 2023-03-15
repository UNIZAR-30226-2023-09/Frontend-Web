import React from 'react';
import './Popup.css';

const Popup = ({ content, handleClose }) => {
  return (
    <div className="popup">
      <div className="popup__content">
        <button className="popup__close" onClick={handleClose}>X</button>
        {content}
      </div>
    </div>
  );
};

export default Popup;
