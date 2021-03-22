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
        <h5 className="country-name-details">{props.name}</h5>
        <img src={`${props.flag}`} alt="" className="country-home-image" />
        <div className="details-continent">{props.continent}</div>
        <div className="details-link">
          <Link to={{
                  pathname: `/home/${props.id}`, 
                  query:{id: props.id}
                }} style={{ textDecoration: 'none' }}>
              <div className="details-link-text">Details</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
