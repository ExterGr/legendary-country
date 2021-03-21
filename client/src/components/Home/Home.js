//Componente inteligente
//Aqui renderizo:
//-Barra de busqueda
//-Filtros
//-Ordenamiento
//-Paginado
//-10 Paises de mi estado

import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {getCountries, getCountryName} from '../../actions/index.js';
import {Link} from 'react-router-dom';
import './Home.css';
import Country from '../Country/Country.js';


function Home (props){
const [loader, setLoader] = useState(false)
const [number, setNumber] = useState(0);
const [state, setState] = useState('');
const [order, setOrder] = useState('ASC');
const [column, setColumn] = useState('name');
const allContinents = ['Asia','Americas','Africa','Europe','Polar','Oceania',''];
const [continent, setContinent] = useState(allContinents);
const [activity, setActivity] = useState('');


    useEffect( () => {
        setLoader(true)
        const fetchCountries = async () => {
            await props.getCountries(number, column, order, continent, activity);
        }
        setLoader(false)
        fetchCountries();
    }, [number, column, order, continent]);

    function handleChange(event) {
        setState({ title: event.target.value });

    }

    function handleActivity (event) {
        setActivity({ activityName: event.target.value});
    }

    /* function handleNumber(event){
        let auxPrev = document.getElementById('previous-button')
        let auxNext = document.getElementById('next-button')
        if(number < 0){ 
            auxPrev.disabled = true
            setNumber(0);
        };
        if(number > 250){
             auxNext.disabled = true;
             setNumber(250);
            }
        if(number >= 0 || number <= 250){
            auxPrev.disabled = false;
            auxNext.disabled = false;
            setNumber(event)
        }
        
    } */

    function handleButtons (){
        let auxPrev = document.getElementById('previous-button')
        let auxNext = document.getElementById('next-button')
        let myNumber = number;
        if(myNumber <= 0 && auxPrev){ 
            auxPrev.disabled = true;
        }
        else if(myNumber >= 240 && auxNext){
            auxNext.disabled = true;
        } else if( auxNext || auxPrev) {
            auxNext.disabled = false;
            auxPrev.disabled = false;
        }
    }

    

    function handleSubmit(event) {
     event.preventDefault();
    }
    const { title } = state;
    const { activityName } = activity;
    
        return (
        <div>
            <h1 className="home-title">Estas en el home :D</h1>
            <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className="label" htmlFor="title">Pais: </label>
                    <input
                    type="text"
                    id="title"
                    autoComplete="off"
                    value={title}
                    placeholder="Country name"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <button type="submit" onClick={() => props.getCountryName(state.title)}>BUSCAR</button>
            </form>  
            <Link to={`/home/activity`}>
                Agregar actividad
            </Link>

            <form action="">
            <label htmlFor="">Order:</label>
            <select name="select" id="populationOrder" onChange={(e)=>{setOrder(e.target.value)}}>
                <option key='asc-order' text='' value='ASC' >Ascendent</option>
                <option key='desc-order' text='' value='DESC'>Descendent</option>
            </select>
            </form>  

            <form action="">
            <label htmlFor="">By:</label>
            <select name="select" id="populationOrder" onChange={(e)=>{setColumn(e.target.value); console.log(e)}}>
                <option key='name-order' text='' value='name' >Name</option>
                <option key='population-order' text='' value='population'>Population</option>
            </select>
            </form>

            <form onSubmit={(e) => handleSubmit(e)}>
                <h6>Filtros</h6>
                <label htmlFor="">Filter by continent:</label>
                <select name="select" id="continent-filter" onChange={(e)=>{setContinent(e.target.value); console.log(e)}}>
                    <option key='All-option' text='' value={[allContinents]} >All</option>
                    <option key='Americas-option' text='' value='Americas'>Americas</option>
                    <option key='Africa-option' text='' value='Africa'>Africa</option>
                    <option key='Asia-option' text='' value='Asia'>Asia</option>
                    <option key='Europe-option' text='' value='Europe'>Europe</option>
                    <option key='Oceania-option' text='' value='Oceania'>Oceania</option>
                    <option key='Polar-option' text='' value='Polar'>Polar</option>
                    <option key='Undefined-option' text='' value=''>Undefined</option>
                </select>
                <input
                    type="text"
                    id="title"
                    autoComplete="off"
                    value={activityName}
                    placeholder="Activity name"
                    onChange={(e) => handleActivity(e)}
                    />
                <button type="submit" onClick={() => props.getCountries(number, column, order, continent, activity.activityName)}>FILTER</button>
            </form>      
            <button id='previous-button' onClick={()=>{ setNumber(number - 10); handleButtons(); console.log(number - 10)}}>Previous</button>
            <button id='next-button' onClick={()=>{ setNumber(number + 10); handleButtons(); console.log(number +10)}}>Next</button>
            {handleButtons()}
            <div>
                {
                number >=0 && number <= 250 && props.countries && props.countries.map(el => {
                    return (
                        <div key={el.name}>
                            <Country
                            name={el.name}
                            flag={el.flag}
                            continent={el.continent}
                            id={el.id}
                            key={el.name}
                            />
                        </div>
                    )
                })}
                
                {loader && <h3>Cargando . . .</h3>}
            </div>
        </div>
        )
}



function mapStateToProps(state){ //Lo uso despues como this.props.movies
    return{
      countries: state.countries,
      countryName: state.countryName
    }
}

function mapDispatchToProps(dispatch) {
    return {
      getCountries: (number, column, order, continent, activity) => dispatch(getCountries(number, column, order, continent, activity)),
      getCountryName: (name) => dispatch (getCountryName(name))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);



/* 
Americas
Asia
Africa
Europe
Oceania
Polar
2 without continent
*/

