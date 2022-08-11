import React from'react';
import ReactDOM, { createRoot } from'react-dom/client';
import { App } from "./HelloWorldApp";
import { FirstApp } from "./Componentes/FirstApp";
import "./styles.css";
import { CounterApp } from './Componentes/CounterApp';

const saludo = <h1>Hola Mundo</h1>;
const root = createRoot(document.getElementById("root"));   

// root.render(FirstApp(title="Titulo de las propiedades"));

root.render(
    <React.StrictMode>
        {/* <FirstApp title="Hola mundo de las props"  /> */}
        <CounterApp value={ 0 } />
    </React.StrictMode>
);