
//Rutas
const express = require('express');
const app = express();

//Usuario
app.use(require('./usuario') );
//Login
app.use(require('./login') );


module.exports = app;
