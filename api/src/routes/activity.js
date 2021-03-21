const router = require('express').Router();
const { Activity, Country } = require('../db.js');
const { Op } = require("sequelize");

router.post('/', async function(req, res) {
    console.log(req.body);

    let {name, difficulty, duration, season, countriesList } = req.body

    if (!Array.isArray(countriesList)) {
        countriesList = [countriesList];
    }

    const country = await Country.findAll({
        where: {
            id: {
                [Op.in]: countriesList
            }
        }
        
    })
    const activity = await Activity.findOrCreate({
        where:{
            name: name.activityName,
            difficulty: difficulty,
            duration: duration.durationNumber,
            season: season
    }
})


    await activity.setActivities(country); //Aca se rompe

    res.sendStatus(200);

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