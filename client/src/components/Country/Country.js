//Componente tonto
//Solo renderizo el estilo de la carta del Pais.

import React from "react";

import "./Country.css";
import { Link } from 'react-router-dom';

export default function Card(props) {
  // acá va tu código
  return (
    <div className="country-container" >
      <div className="country-item" >
        <h5>{props.name}</h5>
        <img src={`${props.flag}`} alt="" className="country-home-image" />
        <div>{props.continent}</div>
        
        <Link to={{
                pathname: `/home/${props.id}`, 
                query:{id: props.id}
              }}>
            <a className="details-link">Detalles</a>
        </Link>
      </div>
    </div>
  );
}
