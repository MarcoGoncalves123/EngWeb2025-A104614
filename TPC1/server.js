const http = require('http')
const axios = require('axios')


http.createServer((req,res) => {
    console.log("METHOD: " + req.method)
    console.log("URL: " + req.url)

    switch(req.method){
        case "GET":
        {
            if(req.url === "/reparacoes")
            {
                axios.get('http://localhost:3000/reparacoes')
                    .then(resp => {
                        var reparacoes = resp.data
                        res.writeHead(200,{'Content-Type' : 'text/html;charset=utf-8'})
                        res.write("<h1>Reparacoes</h1>")
                        res.write("<ul>")
                        reparacoes.forEach(element => {
                            res.write(`<li>${element.data} ${element.nome} ${element.nif} ${element.marca} ${element.modelo} ${element.nr_intervencoes}</li>`)
                        });
                        res.write("</ul>")
                        res.end
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
