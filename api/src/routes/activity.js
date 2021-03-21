const router = require('express').Router();
const { Activity, Country } = require('../db.js')

router.post('/', async function(req, res) {

    const country = await Country.findByPk(
         req.body.country //Me traigo el que coincida con las 3 letras Find by pk
        
    )
    const activity = await Activity.findOrCreate({
        where:{
            name: req.body.name,
            difficulty: req.body.difficulty,
            duration: req.body.duration,
            season: req.body.season
    }
})

    country.setActivities(activity); //Aca se rompe

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