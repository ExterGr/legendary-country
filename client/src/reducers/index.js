
const initialState = {
    countries: [],
    countryDetail: [],
    countryName: []
};

function rootReducer(state = initialState, action) {
    if (action.type === "GET_COUNTRIES") { //Me guardo el listado de paises a renderizar, se debe actualizar con el paginado
        return {
            ...state,
            countries: action.payload
        };
    }
    if(action.type === 'GET_COUNTRY_DETAIL'){ //Muestro los detalles del pais con sus actividades
        return {
            ...state,
            countryDetail: action.payload
        }
    }
    if(action.type === 'GET_COUNTRY_NAME'){
       return{
        ...state,
        countries:  [action.payload]
       }
    }
    if(action.type === 'POST_ACTIVITY'){
        return {
            ...state
        }
    }

    return state;
}

//Adicional a esto, estar atento a la posibilidad de mandar la data (post) desde aca.
  
export default rootReducer;