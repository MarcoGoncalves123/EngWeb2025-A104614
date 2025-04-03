var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contratos')

router.get('/', function(req, res, next) {
  if(req.query.entidade){
    Contrato.listByEntidade(req.query.entidade)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
  }
  else if(req.query.tipo){
    Contrato.listByTipo(req.query.tipo)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
  }
  else{
    Contrato.list()
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
  }
});

router.get("/entidades",function(req, res, next){
    Contrato.listEntidades()
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
})

router.get("/entidades/:nipc",function(req, res, next){
  Contrato.listNipcEntidades(req.params.nipc)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
})

router.get("/sum/entidades/:nipc",function(req, res, next){
  Contrato.sumContratos(req.params.nipc)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
})

router.get("/tipos",function(req, res, next){
  Contrato.listTipos()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
})

router.get('/:id', function(req, res, next) {
  Contrato.findByID(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
});

router.post('/',function(req, res, next){
  Contrato.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
})

router.delete('/:id',function(req, res, next){
  Contrato.delete(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
})

router.put('/:id',function(req, res, next){
  Contrato.edit(req.params.id,req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
})




module.exports = router;
