Projeto de frontend para o cidadão realizar consultas requisições feitas a Prefeitura da Cidade do Recife

## Executando o projeto 

1. Para que o projeto possa rodar é necessario que também esteja rodando o [back-end da aplicação](https://github.com/JampaUchoa/cityhelper-back)
2. Instalar o [node.js](https://nodejs.org/en/)
3. Instalar as dependecias com `npm install`
4. Executar o projeto com `npm start`, que abrirá uma janela do navegador para [http://localhost:3000](http://localhost:3000)

Os requests serão mandados para o backend no qual o valor esta apontado no `"proxy": "http://localhost:8000"`, que pode ser mudado no package.json
