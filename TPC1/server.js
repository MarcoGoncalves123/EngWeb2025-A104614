const http = require('http')
const axios = require('axios')


http.createServer((req,res) => {
    console.log("METHOD: " + req.method)
    console.log("URL: " + req.url)

    switch(req.method){
        case "GET":
        {
            if(req.url === "/")
            {
                res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
                res.write("<h1>Página Inicial</h1>")
                res.write(`<li><a href='/reparacoes'> Lista de reparações </a></li>`)
                res.write(`<li><a href='/intervencoes'> Lista de intervenções </a></li>`)
                res.write(`<li><a href='/viatura'> Lista de viaturas </a></li>`)
            }

            if(req.url === "/reparacoes")
            {            
                axios.get('http://localhost:3000/reparacoes')
                    .then(resp => {
                        var reparacoes = resp.data
                        res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
                        res.write("<h1>Reparacoes</h1>")
                        res.write("<ul>")
                        reparacoes.forEach(element => {
                            res.write(`<li><a href='/reparacoes/${element.nif}'>${element.data} ${element.nome} ${element.nif}</a></li>`)
                        });
                        res.write("</ul>")
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                        console.log(err)
                        res.end()  
                    })
            }
            if(req.url.startsWith("/reparacoes/"))
            {
                var nif = req.url.split("/")[2]
                axios.get('http://localhost:3000/reparacoes')
                .then(resp => {
                    let reparacao = resp.data.find(r => r.nif == nif)
                    
                    if(reparacao)
                    {
                        var viatura = reparacao.viatura
                        var intervencoes = reparacao.intervencoes
                        res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
                        res.write("<h1>Detalhes de reparação</h1>")
                        res.write(`<p>Nome: ${reparacao.nome}</p>`)
                        res.write(`<p>Nif: ${reparacao.nif}</p>`)
                        res.write(`<p>Data: ${reparacao.data}</p>`)
                        res.write(`<p>Viatura: (Marca) - ${viatura.marca} - (Modelo) ${viatura.modelo} - (Matricula) ${viatura.marca}</p>`)
                        res.write(`<p>Número de intervenções: ${reparacao.nr_intervencoes}</p>`)
                        res.write("<ul>")
                        intervencoes.forEach(interv => {
                            res.write(`<li>${interv.codigo} - ${interv.nome}: ${interv.descricao}</li>`)
                        })

                        res.write("</ul>")                        
                            res.write(`<br><a href='/reparacoes'>Voltar</a>`)
                            res.end()
                    }
                }) .catch(err => {
                    res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
                    console.log(err)
                    res.end()
                })
            }
            if(req.url === "/intervencoes")
                {
                    axios.get('http://localhost:3001/intervencoes')
                    .then(resp => {
                        var intervencoes = resp.data.flat()
                        res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
                        res.write("<h1>Intervenções</h1>")
                        res.write("<ul>")
                            intervencoes.forEach(element => {
                                res.write(`<li><a href='/intervencoes/${element.codigo}'>${element.codigo} ${element.nome}${element.descricao}</a></li>`)
                            })
                        res.write("</ul>")
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                        console.log(err)
                        res.end()  
                    })
                }
            if(req.url.startsWith("/intervencoes/"))
            {
                var codigo = req.url.split("/")[2]
                axios.get('http://localhost:3001/intervencoes')
                .then(resp =>{

                    var intervencoes = resp.data.flat()
                    let intervencao = intervencoes.find(r => r.codigo == codigo)
                    
                    axios.get('http://localhost:3000/reparacoes')
                    .then(resp => {
                        let reparacoes = resp.data.filter(r =>
                                                    r.intervencoes.some(interv =>
                                                    interv.codigo == codigo))
                        
                        res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
                        res.write("<h1>Detalhes de intervenção</h1>")
                        res.write(`<p>Código: ${intervencao.codigo}</p>`)
                        res.write(`<p>Nome: ${intervencao.nome}</p>`)
                        res.write(`<p>Descrição: ${intervencao.descricao}</p>`) 
                        res.write("<h1>Reparações em que foi usada</h1>")
                        reparacoes.forEach(element => {
                            res.write(`<p>Nome: ${element.nome}</p>`)
                            res.write(`<p>Nif: ${element.nif}</p>`)
                            res.write(`<p>Data: ${element.data}</p>`)      
                        })

                        res.write(`<br><a href='/intervencoes'>Voltar</a>`)
                        res.end()

                        }) .catch(err => {
                            res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                            console.log(err)
                            res.end()  
                        })
                })
                .catch(err => {
                    res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                    console.log(err)
                    res.end()  
                })
            }
            if(req.url === "/viatura")
            {
                axios.get('http://localhost:3002/viatura')
                    .then(resp => {
                        var viaturas = resp.data
                        res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
                        res.write("<h1>Viaturas</h1>")
                        res.write("<ul>")
                            viaturas.forEach(element => {
                                res.write(`<li><a href='/viatura/${element.modelo}'>${element.marca} ${element.modelo}</a></li>`)
                            })
                        res.write("</ul>")
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                        console.log(err)
                        res.end()  
                    })
            }
            if(req.url.startsWith("/viatura/"))
                {
                    const modelo = decodeURIComponent(req.url.split('/')[2]);
                    console.log(modelo)
                    axios.get('http://localhost:3002/viatura')
                    .then(resp =>{
                        
                        var viaturas = resp.data
                        let viatura = viaturas.find(r => r.modelo == modelo)

                        axios.get('http://localhost:3000/reparacoes')
                        .then(resp => {
                            let reparacoes = resp.data.filter(r => r.viatura.modelo == modelo)
                            console.log(reparacoes)
                            
                            res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
                            res.write("<h1>Detalhes de Modelo</h1>")
                            res.write(`<p>Marca: ${viatura.marca}</p>`)
                            res.write(`<p>Modelo: ${viatura.modelo}</p>`)
                            res.write(`<p>Matrícula: ${viatura.matricula}</p>`) 

                            res.write("<h1>Reparações em que foi usada</h1>")
                            reparacoes.forEach(element => {
                                res.write(`<p>Nome: ${element.nome}</p>`)
                                res.write(`<p>Nif: ${element.nif}</p>`)
                                res.write(`<p>Data: ${element.data}</p>`)      
                            })

                            res.write(`<br><a href='/viatura'>Voltar</a>`)
                            res.end()

                            }) .catch(err => {
                                res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                                console.log(err)
                                res.end()  
                            })
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'})
                        console.log(err)
                        res.end()  
                    })
                }
            break;
        }
        default : 
        res.writeHead(405, {'Content-Type' : 'text/html;charset=utf-8'})
        res.end()  
        break;
    }
}).listen(1234)


//http://localhost:3000/reparacoes
