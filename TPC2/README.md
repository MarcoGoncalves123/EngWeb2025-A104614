# EngWeb2025-A104614

# Marco Soares Gonçalves

![Alt text](https://github.com/MarcoGoncalves123/EngWeb2025-A104614/blob/main/image.PNG)

# Escola de Música

**Objetivo**

Neste segundo TPC foi nos proposto "Construir um serviço em nodejs, que consuma a API de dados servida pelo json-server da escola de música e que sirva um website com as seguintes caraterísticas:

Página principal: Listar alunos, Listar Cursos, Listar Instrumentos;

Página de alunos: Tabela com a informação dos alunos (clicando numa linha deve saltar-se para a página de aluno);

Página de cursos: Tabela com a informação dos cursos (clicando numa linha deve saltar-se para a página do curso onde deverá aparecer a lista de alunos a frequentá-lo);

Página de instrumentos: Tabela com a informação dos instrumentos (clicando numa linha deve saltar-se para a página do instrumento onde deverá aparecer a lista de alunos que o tocam).

O dataset fornecido [db.json](https://github.com/MarcoGoncalves123/EngWeb2025-A104614/blob/main/TPC2/db.json) contém 3 listas diferentes:

- Alunos, onde cada aluno é composto por:
  - ID
  - Nome
  - Data de Nascimento
  - Curso
  - Ano do Curso
  - Instrumento (nome)
    
- Cursos, onde cada curso é composto por:
  - ID
  - Designação
  - Duração
  - Instrumento (id e nome)
   
- Instrumentos, onde cada instrumento é composto por:
  - ID
  - Nome 

**Resolução** 

Nesta semana, dada a grande semelhança entre este problema e o abordado na aula prática, decidi utilizar o modelo desenvolvido na mesma ([my_pages.js](https://github.com/MarcoGoncalves123/EngWeb2025-A104614/blob/main/TPC2/my_pages.js)
que contém o design de  cada página e [server.js](https://github.com/MarcoGoncalves123/EngWeb2025-A104614/blob/main/TPC2/server.js) que contém as funcionalidades presentes no sistema). Para tal substituí todos os URLs para que agora correspondessem ao contexto
abordado pelo problema. Em seguida fiz os necessários ajustes para corresponder ao pedido no enunciado e para tornar o sistema intuitívo. Para facilitar a navegação adicionei em cada página uma opção **"Voltar"**
 que permite o utilizador para a página anterior. Com tudo implementado passei a ter um projeto que segue a seguinte estrutura:

- **Página Inicial ("/")** : Nesta página são apresentadas as 3 diferentes opções oferecidas pelo sistema : Listar alunos, Listar cursos e Listar Instrumentos.

- **Lista de Alunos ("/alunos")** : Nesta página podemos ver todos os alunos existentes no dataset fornecido. Cada um dos ids apresentados pode ser clicado para que o utilizador
  seja redirecionado para a página "/alunos/{id}".

- **Informações sobre um aluno ("/alunos/{id}")** : Nesta página podemos ver todas as informações relativas a um aluno.

- **Lista de Cursos ("/cursos")** : Nesta página podemos ver todos os cursos existentes no dataset fornecido. Cada um dos ids de curso apresentados pode ser clicado para que o utilizador
  seja redirecionado para a página "/cursos/{id}".

- **Informações sobre um curso ("/cursos/{id}")** : Nesta página podemos ver todas as informações sobre um curso, incluíndo uma lista de todos os alunos que estão inscritos no mesmo

- **Lista de Instrumentos ("/instrumentos")** : Nesta página podemos ver todos os instrumentos existentes no dataset fornecido. Cada um dos ids de curso apresentados pode ser clicado para que o utilizador
  seja redirecionado para a página "/instrumentos/{id}".

- **Informações sobre um curso ("/cursos/{id}")** : Nesta página podemos ver todas as informações sobre um instrumento, incluíndo uma lista de todos os alunos que o tocam.

**Utilização**

  1. json-server --watch db.json
  4. node server.js



