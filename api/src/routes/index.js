const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', function(req, res) { // Aca tengo que hacer algo con el home, o no?
  
    res.json({prueba: 'estas en /'})
  
});


module.exports = {
    countries: require('./countries'),
    activity: require('./activity'),
    index: router,
  };
  
