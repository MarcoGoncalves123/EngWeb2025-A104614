var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/alunos')

/* GET home page. */
router.get('/', function(req, res, next) {
  Aluno.list()
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
});

/* GET alunos by id. */
router.get('/:id', function(req, res, next) {
  Aluno.findById(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
});

router.post('/', function(req, res, next) {
  Aluno.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
});

router.put('/:id', function(req, res, next) {
  Aluno.update(req.params.id,req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
});

router.delete('/:id', function(req, res, next) {
  Aluno.delete(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.put('/:id/tpc/', function(req, res, next) {
  Aluno.update(req.params.id,req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
});

router.put('/:id/tpc/:idTpc', function(req, res, next) {
  Aluno.inverteTpc(req.params.id,req.params.idTpc)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro));
});


module.exports = router;
