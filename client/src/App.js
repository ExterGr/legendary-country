import React from 'react';
import { Route } from "react-router-dom";
import './App.css';

//Importo los componentes
import Inicio from './components/Inicio/Inicio.js';
import Home from './components/Home/Home.js';
import Details from './components/Details/Details.js'
import Activity from './components/Activity/Activity.js'

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={Inicio} />
      <Route exact path="/home" component={Home} />
      <Route path="/home/:id" component={Details} />
      <Route path="/home/activity" component={Activity}/>
    </React.Fragment>
  );
}

export default App;
