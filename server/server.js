const express = require('express');
const app = express();
require('./config/config');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/usuario', (req, res) => {
  res.json("Get Usuario");
});

app.post('/usuario', (req, res) => {

  let body = req.body;

  if(body.nombre === undefined){
    res.status(400).json({
      ok: false,
      mensaje: "El nombre es requerido"
    })

  }else {
    res.json({
      persona: body
    });
  }

});

app.put('/usuario/:id/:name', (req, res) => {

  let id = req.params.id;
  let name = req.params.name;

  res.json({
    id,
    name
  });

});

app.delete('/usuario', (req, res) => {
  res.json("Delete Usuario");
});


app.listen(process.env.PORT, () =>{
  console.log('Escuchando puerto:', process.env.PORT);
});
