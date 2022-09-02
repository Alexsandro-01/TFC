# Boas vindas ao repositório do Trybe Futebol Clube!
O TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

No desenvolvimento do TFC, fiquei responsável por desenvolver uma API (utilizando o método TDD) e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, desenvolvi um back-end dockerizado utilizando modelagem de dados através do Sequelize. Meu desenvolvimento teve que respeitar regras de negócio providas no projeto e minha API deve ser capaz de ser consumida por um front-end já provido nesse projeto pelo time da Trybe.

Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

```javascript
// Caso queira testar

  email: 'admin@admin.com'
  senha: 'secret_admin'
```

O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

Utilizei tecnologias como o `Typescrip` com `Programação orientada a objetos`, `Node-js` e `Express` para construir a `API REST`. Desenvolvi testes de integração com `Mocha`, `Chai` e o `Sinon`.

> O projeto foi uma ótima forma de praticar o `Typescript` com `OO`. Reforcei muito mais os conhecimentos sobre ambas as tecnologias.
#

### O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ Banco de dados:

É um container docker MySQL já configurado no docker-compose através de um serviço definido como db.
Tem o papel de fornecer dados para o serviço de backend.

2️⃣ Back-end:

É o ambiente que utilizei para fazer a maior parte das implementações exigidas.
Roda na porta 3001, pois o front-end faz requisições para ele nessa porta por padrão;

3️⃣ Front-end:

O front `já estava concluído e foi fornecido pela Trybe`, não realizei modificações no mesmo. A única exceção foi o  Dockerfile que precisou ser configurado.

4️⃣ Docker:

O docker-compose tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando npm run compose:up ou npm run compose:up:dev;
Eu apenas configurei as Dockerfiles corretamente nas raízes do front-end e back-end, para conseguir inicializar a aplicação. `O Docker-compose também foi fornecido pela Trybe`;

## Rodando o projeto localmente

> Caso você queira testar o projeto na sua máquina.

- 1. Para clonar o projeto cole o comando abaixo no seu terminal. (Necessário Docker e Docker-compose instalados)

```bash
git clone git@github.com:Alexsandro-01/TFC.git
```

- 2. Entrando no diretório e instalando as dependências.

```bash
cd TFC
npm install
```
- 3. Subindo os serviços com o Docker-compose

```bash
cd app
npm run compose:up
```
Ao final da execução você deve ser capaz de acessar o front-end da aplicação no seu navegador com o seguinte endereço:

```
http://localhost:3000/leaderboard
```

<img src="./media/front-example.png" />