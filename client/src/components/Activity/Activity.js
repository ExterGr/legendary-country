import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {postActivity} from '../../actions/index.js';

const Activity = () => {
const [name, setName] = useState(false)
const [difficulty, setDifficulty] = useState(0);
const [duration, setDuration] = useState(undefined);
const [season, setSeason] = useState(undefined);
    return (
        <div>
            <h1>Estas creando una actividad</h1>
            <Link to={`/home`}>
                volver al home
            </Link>
            <form>
                <div>
                    <label>Activity name:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Difficulty (1 - 5):</label>
                    <select name="" id="">
                        <option value=""></option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                    </select>
                </div>
                <div>
                    <label>Duration (days):</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Season:</label>
                    <select name="" id="">
                        <option value=""></option>
                        <option value="">spring</option>
                        <option value="">winter</option>
                        <option value="">fall</option>
                        <option value="">summer</option>
                    </select>
                </div>
                <input type="submit" value='send'/>
            </form>
        </div>
    );
};


function mapDispatchToProps(dispatch) {
    return {
        postActivity: (name, difficulty, duration, season) => dispatch(postActivity(name, difficulty, duration, season)),
    };
}

export default connect(null, mapDispatchToProps)(Activity);