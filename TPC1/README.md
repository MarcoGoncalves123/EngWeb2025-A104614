# EngWeb2025-A104614

# Marco Soares Gonçalves

![Alt text](https://github.com/MarcoGoncalves123/EngWeb2025-A104614/blob/main/image.PNG)

# A oficina

**Objetivo**

Este programa tem como objetivo construir um serviço em nodejs, que consuma a API de dados servida pelo json-server da oficina de reparações e responda com as páginas web do site.

**Resolução** 

Para resolver este problema comecei por criar um ficheiro em python [(generate.py)](https://github.com/MarcoGoncalves123/EngWeb2025-A104614/blob/main/TPC1/generator.py) que filtra todas as **intervenções** e **viaturas**, 
guardando as de seguida nos ficheiros [intervencoes.json](https://github.com/MarcoGoncalves123/EngWeb2025-A104614/blob/main/TPC1/intervencoes.json) e 
[viatura.json](https://github.com/MarcoGoncalves123/EngWeb2025-A104614/blob/main/TPC1/viatura.json) respetivamente. Decidi criar estes ficheiros pois assim seria relativamente simples 
de listar todas as intervenções e viaturas que aparecem no [dataset_reparacoes.json](https://github.com/MarcoGoncalves123/EngWeb2025-A104614/blob/main/TPC1/dataset_reparacoes.json).

Já no [server.js](https://github.com/MarcoGoncalves123/EngWeb2025-A104614/blob/main/TPC1/server.js) criei as 7 páginas requiridas:
 - **Página inicial ("/")** : Contém as 3 opções que permietem o utilizador navegar entre as diversas listas.
 - **Lista de reparações ("/reparacoes")** : Contém uma listagem de todas as reparações, sendo que cada uma delas pode ser clicada para que o utilizador seja redirecionado para a respetiva página de detalhes.
 - **Detalhes de reparação ("/reparacoes/{nif}")** : Contém todos os detalhes sobre uma reparação.
 - **Lista de intervenções ("/intervencao")** : Contém uma listagem de todas as intervenções, sendo que cada uma delas pode ser clicada para que o utilizador seja redirecionado para a respetiva página de detalhes.
 - **Detalhes de intervenção ("/intervenção/{código}")** : Contém todos os detalhes sobre uma intervenção, bem como todas as reparações em que foi usada. Para além disso, por cada reparação existe um botão **Ver detalhes**
  que redireciona o utilizador para a página de detalhes sobre a mesma.
 - **Lista de modelos ("/viatura")** : Contém uma listagem de todos os modelos, sendo que cada um deles pode ser clicado para que o utilizador seja redirecionado para a respetiva página de detalhes.
 - **Detalhes de modelo ("/viatura/{modelo}")** : Contém todos os detalhes sobre um modelo, bem como todas as reparações referentes a este. Para além disso, por cada reparação existe um botão **Ver detalhes**
  que redireciona o utilizador para a página de detalhes sobre a mesma.


**Utilização**

Para que não haja conflitos entre portas decidi atribuir portas específicas a cada ficheiro json. Deste modo a utilização do programa passa pelo seguinte:
  1. json-server --watch dataset_reparacoes.json
  2. json-server --watch intervencoes.json --port 3001
  3. json-server --watch viatura.json --port 3002
  4. node server.js


**Resultados**

Com esta implementação tudo aquilo que foi pedido fica implementado, no entanto é importante mencionar que quando um utilizador é redirecionado 
para a página de detalhes de reparação através do botão **"Ver detalhes"** quer das intervenções ou das viaturas, quando este pressionar o botão **"Voltar"** 
será redirecionado para **Lista de Reparações** e não para a página anterior.
