var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EW 2025' });
});

router.get('/alunos',function(req,res,next) {
    axios.get('http://localhost:3000/alunos')
    .then(resp => {
      var alunos = resp.data
      res.render('alunos', {
        tit: 'Lista de Alunos',
        alunos: alunos
      })
    }).catch(error => {
      console.log(error);
      res.render('error', {error: error})
    })
})

router.get('/alunos/remover/:id',function(req,res,next) {
  axios.delete(`http://localhost:3000/alunos/${req.params.id}`)
  .then(resp => {
    res.redirect('/alunos')
  })
  .catch(erro => {
    console.log(erro)
    res.render('error', {error: erro})
  })
})

router.get('/alunos/:id',function(req,res,next) {
  axios.get(`http://localhost:3000/alunos/${req.params.id}`)
  .then(resp => {
    var aluno = resp.data
    res.render('aluno', {
      tit: `Aluno ${req.params.id}`,
      aluno: aluno
    })
  }).catch(error => {
    console.log(error);
    res.render('error', {error: error})
  })
})

router.get('/alunos/editar/:id', function(req, res, next) {
  axios.get(`http://localhost:3000/alunos/${req.params.id}`)
  .then(resp => {
    var aluno = resp.data
    res.render('edit_aluno', {
      tit: `Editar Aluno ${req.params.id}`,
      aluno: aluno
    })
  }).catch(error => {
    console.log(error);
    res.render('error', {error: error})
  })
})

router.get('/adicionar', function(req, res, next) {
  res.render('add_aluno', {
    tit: `Adicionar novo aluno`,
  })
})

router.post('/adicionar', function(req, res, next) {
  for (let i = 1; i <= 8; i++) {
    if (req.body[`tpc${i}`] === '1') {
      req.body[`tpc${i}`] = true;
    } else {
      req.body[`tpc${i}`] = false;
    }
  }

  axios.post(`http://localhost:3000/alunos`, req.body)
    .then(resp => {
      res.redirect(`/alunos`);
    }).catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});


router.post('/alunos/editar/:id', function(req, res, next) {
  for (let i = 1; i <= 8; i++) {
    if (req.body[`tpc${i}`] === '1') {
      req.body[`tpc${i}`] = true;
    } else {
      req.body[`tpc${i}`] = false;
    }
  }

  axios.put(`http://localhost:3000/alunos/${req.params.id}`, req.body)
    .then(resp => {
      res.redirect(`/alunos/${req.params.id}`);
    }).catch(error => {
      console.log(error);
      res.render('error', { error: error });
    });
});






module.exports = router;
