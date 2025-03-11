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

router.get('/delete/:id', function(req, res, next) {
  const id = req.params.id;
  const pattern = `http://localhost:3000/filmes/${id}`;
  console.log(pattern);

  axios.delete(pattern)
    .then(() => res.redirect('/filmes'))
    .catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});
  


module.exports = router;
