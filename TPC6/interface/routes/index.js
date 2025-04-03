var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/',function(req,res,next) {
  axios.get('http://localhost:16000/contratos')
  .then(resp => {
    var contratos = resp.data
    res.render('index', {
      tit: 'Lista de Contratos',
      contratos: contratos
    })
  }).catch(error => {
    console.log(error);
    res.render('error', {error: error})
  })
})

router.get('/:id',function(req,res,next) {
  axios.get(`http://localhost:16000/contratos/${req.params.id}`)
  .then(resp => {
    var contrato = resp.data
    res.render('contrato', {
      tit: `Contrato: ${req.params.id}`,
      contrato: contrato
    })
  }).catch(error => {
    console.log(error);
    res.render('error', {error: error})
  })
})

router.get('/entidades/:nipc',function(req,res,next) {
  axios.get(`http://localhost:16000/contratos/entidades/${req.params.nipc}`)
  .then(resp => {
    var entidades = resp.data
    var nome = entidades[0].entidade_comunicante 

    axios.get(`http://localhost:16000/contratos/sum/entidades/${req.params.nipc}`)
    .then(resp2 => {
      var soma = resp2.data[0].totalPreco
      res.render('entidade', {
        tit: `NIPC: ${req.params.nipc} | Entidade Comunicante: ${nome}`,
        entidades: entidades,
        soma: soma
      })
    }).catch(error => {
      console.log(error);
      res.render('error', {error: error})
    })
  }).catch(error => {
    console.log(error);
    res.render('error', {error: error})
  })
})



module.exports = router;
