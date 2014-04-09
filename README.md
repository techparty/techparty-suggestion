# TechParty FACCAT 2015

Projeto para a comunidade dar sugestões de assuntos para a próxima TechParty, que será realizada no segundo semestre de 2014.

## Como contribuir?
Para contribuir com o projeto, é necessário ter uma conta no GitHub e criar um fork deste deste projeto em sua conta.

### O que é um fork?

Um fork é a forma como o GitHub (não o git) faz para que alguém possa copiar o projeto para sí e modificar como bem entender, sem que interfira no projeto principal.

Mais informações: https://help.github.com/articles/fork-a-repo

### Tenho um fork do projeto. E agora?

Depois de ter um fork do projeto e ter o projeto clonado em sua máquina, é hora de trocar o branch. Um branch serve para separarmos as modificações que desejamos fazer do branch master do projeto, que teoricamente é o que está em produção. Nós, já temos um branch criado (development) para desenvolvimento. Para isto, basta executar o seguinte comando (no diretório do projeto):

> $ git checkout development

Caso queira criar seu próprio branch, execute:

> $ git checkout -b seu-branch

Depois de trocado o branch, você pode fazer as alterações que você quiser no projeto, fazer os commits e então fazer push. Após fazer push, poderá entrar na sua página do projeto no GitHub e fazer um pull request ao projeto.

## Instruções

Execute os seguintes comandos no diretório do projeto:

Para atualizar as dependências do projeto
> npm update

Para executar a aplicação
> npm start

## Dependências

* [Node.js](http://nodejs.org/)
* [NPM - Node Packaged Modules](https://www.npmjs.org/)
* [MongoDB](http://www.mongodb.org/)
