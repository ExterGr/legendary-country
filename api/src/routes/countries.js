const router = require('express').Router();
const axios = require('axios').default;
const { Country, Activity } = require('../db.js')
const bodyParser = require("body-parser");
const { Op } = require("sequelize");

router.use(bodyParser.json())

router.get('/', function(req, res) {
    if(req.query.name){
        res.status(200);
        return axios.get(`https://restcountries.eu/rest/v2/name/${req.query.name}`)
        .then(function (response) {
            res.send({
                id: response.data[0].alpha3Code,
                name: response.data[0].name,
                flag: response.data[0].flag,
                continent: response.data[0].region,
                capital: response.data[0].capital,
                subregion: response.data[0].subregion,
                area: response.data[0].area,
                population: response.data[0].population
            });
        })
        .catch(function (error) {
            res.json({err: 'No se encontro el pais solicitado'})
            console.log(error);
        })
    } else{ //Aca tengo que solicitar todos los paises que tenga en mi base de datos find / create db. Debo guardarlos todos y traer solos los 10 primeros
        return axios.get(`https://restcountries.eu/rest/v2/all`)
        .then(function(response){
            Country.count()
            //Me fijo el largo, si son iguales que no haga el recorrido con los 250 elementos.
            //Problema: Si cambian algun dato, no lo detecto. O si un pais deja de existir y en el mismo momento se genera otro.
            //Que haya amor y paz
            .then( c => { 
                if(c !== response.data.length){
                    for(let i = 0; i < response.data.length; i++){
                        Country.findOrCreate({
                            where:{
                                id: response.data[i].alpha3Code,
                                name: response.data[i].name,
                                flag: response.data[i].flag,
                                continent: response.data[i].region,
                                capital: response.data[i].capital,
                                subregion: response.data[i].subregion,
                                area: response.data[i].area,
                                population: response.data[i].population
                            }
                        })
                    }
                }
            })
        })
        .then(function(response){
            //console.log(req.query.continent)
            //console.log(req.query.activity)
            let {continent} = req.query

            if(continent.includes(',')){
                continent = continent.split(',');
            }
            //console.log(continent)
            //console.log(req.query.activity)
            //Error: Si busco una actividad, no puedo paginar hasta darle al boton filtrar nuevamente . . .
            if(req.query.activity){
                return Country.findAll(
                    {
                        offset: req.query.number || 0,
                        limit: 10,
                        order: [[req.query.column || 'name', req.query.order || 'ASC']],
                        attributes: ['name', 'flag', 'continent', 'id'],
                        where: {
                            continent: continent
                        },
                        include: [{
                            model: Activity,
                            where: {
                                name: req.query.activity
                            }
                        }]
                    }
                    )
                .then(countries => {
                    return res.json(countries)
                });

            } else {
                let {continent} = req.query

                if(continent.includes(',')){
                    continent = continent.split(',');
                }
                return Country.findAll(
                    {
                        offset: req.query.number || 0,
                        limit: 10,
                        order: [[req.query.column || 'name', req.query.order || 'ASC']],
                        attributes: ['name', 'flag', 'continent', 'id'],
                        where: {
                            continent: continent
                        }
                    }
                    )
                .then(countries => {
                    return res.json(countries)
                });
            }
        })
        .catch(function(err){
            res.json({err: 'Hubo un error, fijate en la consola que onda jajaj'})
            console.log(err);
        })
    }
});

router.get('/:idCountry', async function(req, res) {
    if(req.params.idCountry.length !== 3){
        res.status(404);
        res.json({
            err: 'El largo del ID debe ser de 3 caracteres'
        })
    }
    //Aca arranco
    try{
        const theCountrie = await Country.findAll( {
            where:{
                id:req.params.idCountry.toUpperCase()
            } ,
            include:{model: Activity }
        })
        //console.log(theCountrie[0].activities) //Me trae solo 1 actividad
        if(!theCountrie)return res.send({err: 'Ese ID no se encuentra en la base de datos'}).status(404);
        res.json(theCountrie);

    } catch(err){
        res.send({err: 'Hubo un error'})
    }
});


module.exports = router;

/* Country.findOrCreate({
    where: {
        id: req.params.idCountry
    }
}) */

//axios.get(`https://restcountries.eu/rest/v2/name/${req.params.idCountry}`)

/* 
Country.findAll({
    where: {
        id: req.params.idCountry.toLowerCase()
    }
})
.then(function (response) {
  console.log(response)
  res.send({
      id: response.data[0].alpha3Code,
      name: response.data[0].name,
      flag: response.data[0].flag,
      continent: response.data[0].region,
      capital: response.data[0].capital,
      subregion: response.data[0].subregion,
      area: response.data[0].area,
      population: response.data[0].population
  });
})
.catch(function (error) {
    res.json({err: 'No se encontro el ID solicitado'})
  console.log(error);
}) */

/* const theCountrie = await Country.findByPk(req.params.idCountry.toUpperCase(), {
    include: Activity 
}) */