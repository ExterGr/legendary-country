const axios = require('axios')

export function getCountries(number, column, order, continent, activity) {
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/countries",{
        params: {
          number,
          column,
          order,
          continent,
          activity
        }
      });
      return dispatch({ type: "GET_COUNTRIES", payload: json.data });
    };
  }
export function getCountryDetail (id){ //Trae el detalle de la pelicula
    return async function(dispatch) {
        var json = await axios("http://localhost:3001/countries/" + id)
        
        return dispatch({ type: "GET_COUNTRY_DETAIL", payload: json.data });
       
    };
}

export function getCountryName (name){ //Trae el detalle de la pelicula
  return async function(dispatch) {
      var json = await axios("http://localhost:3001/countries?name=" + name)
      
      return dispatch({ type: "GET_COUNTRY_NAME", payload: json.data });
     
  };
}

export function postActivity (id){ //Trae el detalle de la pelicula
  return async function(dispatch) {
      var json = await axios.post("http://localhost:3001/activity", {
        name: id.name,
        difficulty: id.difficulty,
        duration: id.duration,
        season: id.season,
        id: id.id
      })
      
      return dispatch({ type: "POST_ACTIVITY", payload: json.data });
     
  };
}