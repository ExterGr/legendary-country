//Componente inteligente
//Aqui renderizo:
//-Pais solicitado
//-Detalles
//-Actividades
//-Creacion de actividad
//-Boton de vuelta al home

import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {getCountryDetail} from '../../actions/index.js';
import './Details.css';

function Details(props) {
//console.log(props.match.params.id)

    useEffect( () => {
        const fetchCountries = () => {
            props.getCountryDetail(props.match.params.id);
        }
        fetchCountries();
    }, []);
    //console.log(props.countryDetail)
    return (
        
        <div className="details-container">
            <a href="/home" className="details-back-button">Back to home</a>
            {props.countryDetail && props.countryDetail.map(el => { //Mapeo el unico que se encuentra
                return (
                    <div className="details-map-container">
                        <div className="details-map-father">
                            <h1 className="details-title">This are the details:</h1>
                            <div className="details-content">
                                <h3 className="details-content-country">{props.countryDetail[0].name}</h3>
                                <img src={`${props.countryDetail[0].flag}`} className="details-content-flag" alt="Flag"/>
                                <div className="details-subtitle"><b>Details</b></div>
                                <div className="details-content-father">
                                    <p className="details-content-info"><b>Continent:</b> {props.countryDetail[0].continent}</p>
                                    <p className="details-content-info"><b>Subregion:</b> {props.countryDetail[0].subregion}</p>
                                    <p className="details-content-info"><b>Capital:</b> {props.countryDetail[0].capital}</p>
                                    <p className="details-content-info"><b>Population:</b> {props.countryDetail[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                    <p className="details-content-info"><b>Area:</b> { props.countryDetail[0].area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km²</p>
                                </div>
                            </div>
                        </div>
                            <div className="activity-map-container">
                            <h1 className="details-activities-title">Activities:</h1>
                            <div className="details-activities-map">
                                {props.countryDetail[0].activities && props.countryDetail[0].activities.map(act => {
                                    return (
                                        <div className="details-activities-element">
                                            <h3 className="details-activities-name">Activity: {`${act.name}`}</h3>
                                            <ul className="details-activities-ul">
                                                <li className="details-activities-li">Difficulty: {`${act.difficulty}`}</li>
                                                <li className="details-activities-li">Duration: {`${act.duration}`} days</li>
                                                <li className="details-activities-li">Season: {`${act.season}`}</li>
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                                {
                                !props.countryDetail[0] && <h4>There are not activities in this country ! ! !</h4>
                                }
                            </div>
                    </div>
                )
            })}
            {!props.countryDetail && <h2>No carga y dios sabra porque</h2>}

        </div>
    );
}

function mapStateToProps(state){ //Lo uso despues como this.props.movies
    return{
        countryDetail: state.countryDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCountryDetail: id => dispatch(getCountryDetail(id)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Details);
