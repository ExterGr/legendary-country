import React, { useState} from 'react';
import { connect } from 'react-redux';
import {postActivity, getCountryName} from '../../actions/index.js';
import './Activity.css'

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

function removeCountry (el){
    setCountriesList(countryList.filter(countryEl => countryEl != el))
}



const { durationNumber } = duration;
const { activityName } = name;
const { countryName } = countries;
const countryList = []
    return (
        <div className="activity-form-container">
            <h1 className="activity-h1">You are creating an activity</h1>
            <div className="activity-form-father">
                
                <form className="general-form"> 
                    <div>
                        <label><b>Activity name: </b></label>
                        <input
                        type="text"
                        id="activity-input"
                        autoComplete="off"
                        className="activity-input"
                        value={activityName}
                        placeholder="Activity name"
                        onChange={(e) => {handleName(e)}}
                        />
                    </div>
                    <div>
                        <label ><b>Difficulty (1 - 5): </b></label>
                        <select className="activity-input" name="" id="" onChange={(e)=>{setDifficulty(e.target.value)}}>
                            <option value="0"></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <label><b>Duration (days): </b> </label>
                        <input
                        type="text"
                        id="duration-input"
                        className="activity-input"
                        autoComplete="off"
                        value={durationNumber}
                        placeholder="Duration days (number)"
                        onChange={(e) => {handleDuration(e)}}
                        />
                    </div>
                    <div>
                        <label><b>Season: </b></label>
                        <select name="" id="" onChange={(e)=>{setSeason(e.target.value)}} className="activity-input">
                            <option value=""></option>
                            <option value="spring">spring</option>
                            <option value="winter">winter</option>
                            <option value="fall">fall</option>
                            <option value="summer">summer</option>
                        </select>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className="country-form">
                        <input
                        type="text"
                        id="duration-input"
                        autoComplete="off"
                        value={countryName}
                        className="activity-input"
                        placeholder="Add country"
                        onChange={(e) => {handleCountries(e)}}
                        />
                        <button type="submit" className="activity-search-country-button" onClick={(e) =>{
                            e.preventDefault();
                            props.getCountryName(countryName)
                            .then(country => {
                                if(!country.payload.id) return alert('The requested country was not found')
                                if(countriesList.includes(country.payload.id)) return alert('You have already loaded that country')
                                console.log(country)
                                setCountriesList([...countriesList, {id: country.payload.id, flag:country.payload.flag }])
                            })
                            .then(e => {
                                console.log(countriesList)
                            })}}
                            >Search country</button>
                    </form>
                    <ul>
                        <h4>Selected countries:</h4>
                        {
                            countriesList && countriesList.map(el => {
                                if(el.id === undefined) return
                                return (
                                    <article className="selected-country-content">
                                        <li><b>{el.id}</b></li>
                                        <img src={el.flag} className="selected-country-flag" alt=""/>
                                        <button className="selected-country-x" onClick={(e) => {e.preventDefault(); alert('Thats a premium function (:'); console.log("This element:",`${el}`, "Country list:", countriesList)}}>X</button>
                                    </article>
                                )
                            })
                        }
                    </ul>
                    <input className="post-activity-button" value="Create" type="submit" onClick={() => props.postActivity(name, difficulty, duration, season, countriesList)}/> 
                </form>
            </div>
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

{/* <Link to={`/home`}>
    volver al home
</Link> */}