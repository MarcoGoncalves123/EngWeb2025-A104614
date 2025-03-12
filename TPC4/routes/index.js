var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    { 
      title: 'Engenharia Web 2025',
      docente: 'jcr',
      instituicao: 'UM'
    
    });
});


router.get('/filmes', function(req, res, next) {
  axios.get('http://localhost:3000/filmes')
    .then(resp => {
        res.render('filmes',{lfilmes: resp.data,tit: "Lista de Filmes"})
    })
    .catch(error => {
      console.log(error)
      res.render('error',{error: error})
    })
});


router.get('/edit/:id', function(req, res, next) {
  const id = req.params.id;
  const pattern = `http://localhost:3000/filmes/${id}`;

  axios.get(pattern)
    .then(resp => {
      res.render('studentEditFormPage',{movie: resp.data,tit: "Editar Filme"})
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

router.post('/edit/:id', function(req, res, next) {

  const id = req.params.id;

  if (typeof req.body.genres === 'string') {
    req.body.genres = [req.body.genres]; 
  }
  const pattern = `http://localhost:3000/filmes/${id}`;

  axios.put(pattern,req.body)
    .then(resp => {
      res.redirect("/filmes")
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

router.get('/delete/:id', function(req, res, next) {
  const id = req.params.id;
  const pattern = `http://localhost:3000/filmes/${id}`;

  axios.delete(pattern)
    .then(() => res.redirect('/filmes'))
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

router.get('/actor/:name', function(req, res, next) {
  const name = req.params.name;
  const pattern = `http://localhost:3000/filmes`;

  axios.get(pattern)
    .then(resp => {
      filmes_de_Ator = resp.data.filter(filme => filme.cast.includes(name))
      console.log(filmes_de_Ator)
      res.render('actor',{lfilmes: filmes_de_Ator,tit: `Lista de Filmes com participação de: ${name}`})
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});

  


module.exports = router;
