import React, { useState } from "react";
import logo from "./Imagenes/logo.svg";
import "./CSS/App.css";
import Login from "./Login";
import { Register } from "./Register";
import { Menu } from "./Menu";

function App() {
    const [currentForm, setCurrentForm] = useState("login");

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    };

    return (
        <div className="App">
            {currentForm === "login" ? (
                <Login onFormSwitch={toggleForm} />
            ) : currentForm === "register" ? (
                <Register onFormSwitch={toggleForm} />
            ) : (
                <Menu />
            )}
        </div>
    );
}

export default App;
