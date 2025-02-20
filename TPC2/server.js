import { createServer } from 'http'
import axios from 'axios'
import { readFile } from 'fs'
import { getMainPage, getAlunosPage, getCursosPage, getInstrumentosPage } from './my_pages.js'

createServer(function(req,res) {
    var date = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + date)

    if(req.url === "/"){
        res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
        res.write(getMainPage(date))
        res.end()
    }
    
    if(req.url === "/alunos"){
        axios.get("http://localhost:3000/alunos")
        .then(function(resp){
            var alunos = resp.data
            res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
            res.write(getAlunosPage(alunos,null,date))
            res.end()
        })
        .catch(erro => {
                console.log("Erro " + erro)
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.end('<p>Operação na obtenção de dados: '+ erro + '</p>')
            })
    }

    if(req.url === "/cursos"){
        axios.get("http://localhost:3000/cursos")
        .then(function(resp){
            var cursos = resp.data
            res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
            res.write(getCursosPage(cursos,null,null,date))
            res.end()
        })
        .catch(erro => {
                console.log("Erro " + erro)
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.end('<p>Operação na obtenção de dados: '+ erro + '</p>')
            })
    }

    if(req.url === "/instrumentos"){
        axios.get("http://localhost:3000/instrumentos")
        .then(function(resp){
            var instrumentos = resp.data
            res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
            res.write(getInstrumentosPage(instrumentos,null,null,date))
            res.end()
        })
        .catch(erro => {
                console.log("Erro " + erro)
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.end('<p>Operação na obtenção de dados: '+ erro + '</p>')
            })
    }


    if(req.url.match(/\alunos\/(.*)/)){
        var id = req.url.split('/')[2]
        axios.get(`http://localhost:3000/alunos?id=${id}`)
        .then(function(resp){
            var alunos = resp.data
            var aluno = alunos.find(r => r.id == id)
            res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
            res.write(getAlunosPage(aluno,id,date))
            res.end()
        })
    }

    if(req.url.match(/\/cursos\/(.*)/)){
        var id = req.url.split('/')[2]
        axios.get(`http://localhost:3000/cursos?cursos.id=${id}`)
        .then(function(resp){
            axios.get(`http://localhost:3000/alunos?curso=${id}`)
            .then(function(lista){
                var cursos = resp.data
                var curso = cursos.find(r => r.id == id)
                var alunos = lista.data
                res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
                res.write(getCursosPage(curso,alunos,id,date))
                res.end()
            })
        })
    }

    if(req.url.match(/\/instrumentos\/I[0-9]+/)){
        var id = req.url.split('/')[2]
        axios.get(`http://localhost:3000/instrumentos`)
        .then(function(resp){
            var instrumentos = resp.data
            var instrumento = instrumentos.find(r => r.id == id)
            axios.get(`http://localhost:3000/alunos`)
            .then(function(lista){
                var all_alunos = lista.data
                var alunos = all_alunos.filter(t => t.instrumento === instrumento["#text"])
                alunos.forEach(element => {
                    console.log(element.aluno)
                });
                res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
                res.write(getInstrumentosPage(instrumento,alunos,id,date))
                res.end()
            })
        })
    }

}).listen(1234)