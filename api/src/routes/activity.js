const router = require('express').Router();
const { Activity, Country } = require('../db.js')

router.post('/', async function(req, res) {

    const country = await Country.findOrCreate({
        where:{
            id: req.body.country //Me traigo el que coincida con las 3 letras
        }
    })
    const activity = await Activity.findOrCreate({
        where:{
            name: req.body.name,
            difficulty: req.body.difficulty,
            duration: req.body.duration,
            season: req.body.season
        }
    })

    await country[0].setActivities(activity[0]); //Aca se rompe

    res.json(activity[0]);

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