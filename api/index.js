//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Country , Activity } = require('./src/db.js')

// Syncing all the models at once.
conn.sync({ force: false }).then(() => { //Cambiar a false cada vez que quiera mantener todos los datos
  server.listen(3001, function() {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    console.log('Server is listening on port 3001!');

    
    var countryArgentina =  Country.findOrCreate({
      where: {
        id: 'ARG',
        name: 'Argentina',
        flag: 'https://restcountries.eu/data/arg.svg',
        continent: 'Americas',
        capital: 'Buenos Aires',
        subregion: 'South America',
        area: 2780400,
        population: 43590400
      }
    });
    
    var countryBrazil =  Country.findOrCreate({
      where: {
        id: 'BRA',
        name: 'Brazil',
        flag: 'https://restcountries.eu/data/bra.svg',
        continent: 'Americas',
        capital: 'Brasília',
        subregion: 'South America',
        area: 8515767,
        population: 206135893
      }
    });
    
    var activityArgentina =  Activity.findOrCreate({
      where:{
        name: "Ski",
        difficulty: 4,
        duration: 5,
        season: 'winter'
      }
    });
    
    Promise.all([countryArgentina, countryBrazil, activityArgentina])
      .then(res => {
        console.log("Categorías precargadas");
      });
  });
});
