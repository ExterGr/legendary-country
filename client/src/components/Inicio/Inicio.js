//Componente tonto ==> Inteligente para cargar los 10 paises
//Renderizo solamente el landing qu eme lleve al home
import React from 'react';
import './Inicio.css';

function Inicio(props) {
    
    return (
        <div>
            <a href="/home" className="initial-button" onClick={()=> props.getCountries()}>Iniciar</a>
            <h1 className="landing-title">Henry countries</h1>
            <img src="https://img2.pngio.com/icono-mundo-mostrar-americas-gratis-d-126983-png-images-pngio-mundo-png-512_512.png" className="landing-image" alt=""/>
            <i className="landing-sign">By Ivan Kudacki</i>
        </div>
    );
}

export default Inicio;
