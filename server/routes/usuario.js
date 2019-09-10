const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const {verificaToken, verificaAdmin_role} = require('../middlewares/autenticacion');
const app = express();


app.get('/usuario', verificaToken ,(req, res) => {


  // return res.json({
  //   usuario: req.usuario,
  //   nombre: req.usuario.nombre,
  //   email: req.usuario.email
  // });

  let desde = req.query.desde || 0
  desde = Number(desde);
  let hasta = 5;
  hasta = Number(hasta);

  Usuario.find({estado: true}, 'nombre email')
          .skip(desde)
          .limit(20)
          .exec( (err, usuarios) =>{
            if(err){
              return res.status(400).json({
                ok: false,
                err
              })
            }

            Usuario.countDocuments({estado: true}, (err, conteo)=>{

              res.json({
                ok: true,
                registros: conteo,
                usuarios
              });

            })


          })

});

app.post('/usuario', [verificaToken, verificaAdmin_role] , (req, res) => {

  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync( body.password, 10 ),
    role: body.role
  });

  usuario.save( (err, usuarioBD) => {

    if(err){
      return res.status(400).json({
        ok: false,
        err
      })
    }
    res.json({
      ok: true,
      usuario: usuarioBD
    })
  })

});

app.put('/usuario/:id', [verificaToken, verificaAdmin_role] , (req, res) => {

  let id = req.params.id;
  body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

  Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioBD) => {

    if(err){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      usuario: usuarioBD,
    });

  })



});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_role] , (req, res) => {

  let id = req.params.id;

  let cambiaEstado = { estado: false};

  Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioBorrado) =>{

    if(err){
      return res.status(400).json({
        ok: false,
        err
      })
    }

    if(!usuarioBorrado){
      return res.status(400).json({
        ok: false,
        err: "Este usuario no existe en la BD",
      });
    }

    res.json({
      ok:true,
      usuario: usuarioBorrado
    });
  });
});


module.exports = app;
