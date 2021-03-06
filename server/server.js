const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('./config/config');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


//Configuracion global de rutas
app.use(require('./routes/index'));



mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (err, res) => {
    if(err) throw err;
    console.log('Base de datos: ONLINE');
});


app.listen(process.env.PORT, () =>{
  console.log('Escuchando puerto:', process.env.PORT);
});
