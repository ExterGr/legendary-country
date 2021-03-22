//Componente tonto ==> Inteligente para cargar los 10 paises
//Renderizo solamente el landing qu eme lleve al home
import React from 'react';
import './Inicio.css';

function Inicio(props) {
    
    return (
        <div>
            <a href="/home" className="initial-button" onClick={()=> props.getCountries()}>Start</a>
            <h1 className="landing-title">Henry countries</h1>
            <img src="https://acegif.com/wp-content/uploads/Earth.gif" className="landing-image" alt=""/>
            <i className="landing-sign">By Ivan Kudacki</i>
        </div>
    );
}

export default Inicio;

//https://img2.pngio.com/icono-mundo-mostrar-americas-gratis-d-126983-png-images-pngio-mundo-png-512_512.png
//https://ftsamuelrobinson.files.wordpress.com/2015/02/planeta-gif-2b924d2.gif
//https://im7.ezgif.com/tmp/ezgif-7-d84d033fc8e7.gif
//https://acegif.com/wp-content/uploads/Earth.gif