const router = require('express').Router();
const { Activity, Country, Country_activity } = require('../db.js');
const { Op } = require("sequelize");
const cors = require("cors");

router.use(cors());

router.post('/', async function(req, res) {
    //console.log(req.body);

    let {name, difficulty, duration, season, countriesList } = req.body

    if (!Array.isArray(countriesList)) {
        countriesList = [countriesList];
    }

    const addCountry = await Country.findAll({
        where: {
            id: {
                [Op.in]: countriesList
            }
        }
        
    })
    const addActivity = await Activity.findOrCreate({
        where:{
            name: name.activityName,
            difficulty: difficulty,
            duration: duration.durationNumber,
            season: season
    }
})

    const findActivity = await Activity.findOne({
        where:{
            name: name.activityName,
            difficulty: difficulty,
            duration: duration.durationNumber,
            season: season
    }
    })

//console.log(country)


    await findActivity.setCountries(addCountry); //Aca se rompe

    return res.sendStatus(200);

});

module.exports = router;

/* 
Prueba JSON:
{
    "name": "Tennis",
    "difficulty": "2",
    "duration": "3",
    "season": "summer",
    "country": "FRA"
}
 */