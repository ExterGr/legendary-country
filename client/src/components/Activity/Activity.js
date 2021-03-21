import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {postActivity, getCountryName} from '../../actions/index.js';

const Activity = (props) => {
const [name, setName] = useState(false)
const [difficulty, setDifficulty] = useState(0);
const [duration, setDuration] = useState(0);
const [season, setSeason] = useState(undefined);
const [countries, setCountries] = useState([]);
const [countriesList, setCountriesList] = useState([])

function handleName (event) {
    setName({ activityName: event.target.value});
}

function handleDuration (event) {
    setDuration({ durationNumber: event.target.value});
}

function handleCountries (event) {
    setCountries({ countryName: event.target.value});
}

function handleSubmit(event) {
    event.preventDefault();
}

function removeCountry (country){
    setCountriesList(countryList.filter(el => el != country))
}



const { durationNumber } = duration;
const { activityName } = name;
const { countryName } = countries;
const countryList = []
    return (
        <div>
            <h1>Estas creando una actividad</h1>
            <Link to={`/home`}>
                volver al home
            </Link>
            <form>
                <div>
                    <label>Activity name:</label>
                    <input
                    type="text"
                    id="activity-input"
                    autoComplete="off"
                    value={activityName}
                    placeholder="Activity name"
                    onChange={(e) => {handleName(e)}}
                    />
                </div>
                <div>
                    <label>Difficulty (1 - 5):</label>
                    <select name="" id="" onChange={(e)=>{setDifficulty(e.target.value)}}>
                        <option value="0"></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <label>Duration (days):</label>
                    <input
                    type="text"
                    id="duration-input"
                    autoComplete="off"
                    value={durationNumber}
                    placeholder="Duration days (number)"
                    onChange={(e) => {handleDuration(e)}}
                    />
                </div>
                <div>
                    <label>Season:</label>
                    <select name="" id="" onChange={(e)=>{setSeason(e.target.value)}}>
                        <option value=""></option>
                        <option value="spring">spring</option>
                        <option value="winter">winter</option>
                        <option value="fall">fall</option>
                        <option value="summer">summer</option>
                    </select>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                    type="text"
                    id="duration-input"
                    autoComplete="off"
                    value={countryName}
                    placeholder="Add country"
                    onChange={(e) => {handleCountries(e)}}
                    />
                    <button type="submit" onClick={(e) =>{
                        e.preventDefault();
                        props.getCountryName(countryName)
                        .then(country => {
                            if(!country.payload.id) return alert('No se encontro el pais solicitado')
                            setCountriesList([...countriesList, country.payload.id])
                        })
                        .then(e => console.log(countriesList))}}
                        >ADD COUNTRY</button>
                </form>
                <ul>
                    <h4>Selected countries:</h4>
                    {
                        countriesList && countriesList.map(el => {
                            if(el === undefined) return
                            return (
                                <article>
                                    <li>{el}</li>
                                    <button onClick={(e) => {e.preventDefault(); removeCountry(el)}}>X</button>
                                </article>
                            )
                        })
                    }
                </ul>
                <input type="submit" onClick={() => props.postActivity(name, difficulty, duration, season, countriesList)}/>
            </form>
        </div>
    );
};


function mapDispatchToProps(dispatch) {
    return {
        postActivity: (name, difficulty, duration, season, countriesList) => dispatch(postActivity(name, difficulty, duration, season, countriesList)),
        getCountryName: (name) => dispatch(getCountryName(name))
    };
}

export default connect(null, mapDispatchToProps)(Activity);