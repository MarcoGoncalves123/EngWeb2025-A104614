
export function getMainPage(data){
    var page_html = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Escola de Música</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> 
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Página inicial</h1>
                </header>

                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a href="/alunos">Listar alunos</a>
                        </li>

                        <li>
                            <a href="/cursos">Listar cursos</a>
                        </li>

                        <li>
                            <a href="/instrumentos">Listar instrumentos</a>
                        </li>
                    </ul>
                </div>

                <footer class="w3-container w3-purple">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>

            </div>
        </body>
    </html>
    `

    return page_html
}


export function getAlunosPage(alunos,id,data){
    var page_html = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Escola de Música</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> 
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Alunos ${id == null? '' : ' - Id:' + id}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all" scrollable>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Curso</th>
                            <th>Ano Curso</th>
                            <th>Instrumento</th>
                        </tr>
                `

                if(id != null)
                {
                    page_html += `
                        <tr>
                            <td>${alunos.id}</td>
                            <td>${alunos.nome}</td>
                            <td>${alunos.dataNasc}</td>
                            <td>${alunos.curso}</td>
                            <td>${alunos.anoCurso}</td>
                            <td>${alunos.instrumento}</td>
                        </tr>
                        `
                }
                else
                {
                    alunos.forEach(aluno => {
                        page_html += `
                        <tr>
                            <td><a href="/alunos/${aluno.id}">${aluno.id}</a></td>
                            <td>${aluno.nome}</td>
                            <td>${aluno.dataNasc}</td>
                            <td>${aluno.curso}</td>
                            <td>${aluno.anoCurso}</td>
                            <td>${aluno.instrumento}</td>
                        </tr>
                        `
                    });
                }


    page_html += `
                </table>
            </div>
    
            <footer class="w3-container w3-purple">
                <h5>Generated in EngWeb2025 ${data}</h5>
            </footer>

        </div>
    </body>
</html>`
    return page_html
}





export function getCursosPage(cursos,alunos,id,data){
    var page_html = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Escola de Música</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> 
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Cursos ${id == null? '' : ' - Id:' + id}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all" scrollable>
                        <tr>
                            <th>Id</th>
                            <th>Designação</th>
                            <th>Duração</th>
                            <th>ID de Instrumento</th>
                            <th>Descrição de Instrumento</th>
                        </tr>
                `
                if(id != null)
                {
                    page_html += `
                        <tr>
                            <td>${cursos.id}</td>
                            <td>${cursos.designacao}</td>
                            <td>${cursos.duracao}</td>
                            <td>${cursos.instrumento.id}</td>
                            <td>${cursos.instrumento["#text"]}</td>
                        </tr>
                        `

                    page_html += `
                    </table>
                    <h2>Lista de Alunos Inscritos</h2>
                        <div class="w3-container">
                            <table class="w3-table-all" scrollable>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                </tr>

                    `
                        alunos.forEach(aluno => {
                            page_html += `
                            <tr>
                                <td><a href="/alunos/${aluno.id}">${aluno.id}</a></td>
                                <td>${aluno.nome}</td>
                            </tr>
                            ` 
                        });
                }
                else
                {
                    cursos.forEach(curso => {
                        page_html += `
                        <tr>
                            <td><a href="/cursos/${curso.id}">${curso.id}</a></td>
                            <td>${curso.id}</td>
                            <td>${curso.designacao}</td>
                            <td>${curso.duracao}</td>
                            <td>${curso.instrumento.id}</td>
                            <td>${curso.instrumento["#text"]}</td>
                        </tr>
                        `
                    });
                }


    page_html += `
                </table>
            </div>
    
            <footer class="w3-container w3-purple">
                <h5>Generated in EngWeb2025 ${data}</h5>
            </footer>

        </div>
    </body>
</html>`
    return page_html
}




export function getInstrumentosPage(instrumentos,alunos,id,data){
    var page_html = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Escola de Música</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> 
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Instrumentos ${id == null? '' : ' - Id:' + id}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all" scrollable>
                        <tr>
                            <th>Id</th>
                            <th>Descrição</th>
                        </tr>
                `
                if(id != null)
                {
                    page_html += `
                        <tr>
                            <td>${instrumentos.id}</td>
                            <td>${instrumentos["#text"]}</td>
                        </tr>
                        `

                    page_html += `
                    </table>
                    <h2>Lista de alunos que o tocam</h2>
                        <div class="w3-container">
                            <table class="w3-table-all" scrollable>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                </tr>

                    `
                        alunos.forEach(aluno => {
                            page_html += `
                            <tr>
                                <td><a href="/alunos/${aluno.id}">${aluno.id}</a></td>
                                <td>${aluno.nome}</td>
                            </tr>
                            ` 
                        });
                }
                else
                {
                    instrumentos.forEach(instrumento => {
                        page_html += `
                        <tr>
                            <td><a href="/instrumentos/${instrumento.id}">${instrumento.id}</a></td>
                            <td>${instrumento["#text"]}</td>
                        </tr>
                        `
                    });
                }


    page_html += `
                </table>
            </div>
    
            <footer class="w3-container w3-purple">
                <h5>Generated in EngWeb2025 ${data}</h5>
            </footer>

        </div>
    </body>
</html>`
    return page_html
}