import React, { useState } from "react";
import './Popup.css';

const Popup = ({ handleClose }) => {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="popup">
      <div className="popup__content">
        <button className="popup__close" onClick={handleClose}>X</button>
        <div>
        <div>
            <label htmlFor="id-input">ID:</label>
            <input
                id="id-input"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="content-input">Contenido:</label>
            <textarea
                id="content-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
