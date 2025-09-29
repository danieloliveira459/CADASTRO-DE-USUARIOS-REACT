Nome do Projeto

* SISTEMA DE CADATRO DE USUÁRIOS FULSTACK, COM REACT

Descrição

* Projeto full-stack para cadastro, listagem e gerenciamento de usuários. Possui frontend em React com formulários validados e backend em Node.js/Express, com persistência de dados em MySQL.

Principais funcionalidades:

* Cadastro de usuários com validação de campos.

* Listagem de usuários em tabela paginada.

* Página de detalhes de cada usuário.

* Feedback visual e notificações (sucesso/erro) no frontend.

* Persistência de dados no MySQL via API REST.

Tecnologias

* Frontend: React, React Hook Form, Yup, Axios, React Router, React Toastify
* Backend: Node.js, Express, MySQL, dotenv
* Banco de Dados: MySQL
* Ferramentas: Postman (teste de API), MySQL Workbench
ESTRUTURA DO PROJETO
FRONTBACK/
├── backend/
│   ├── db/
│   │   ├── node_modules/
│   │   ├── index.js
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── test-server.js
│   ├── routes/
│   │   └── records.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── node_modules/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── .env
│   │   ├── App.js
│   │   ├── fix-all-imports.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── routes.js
│   ├── .gitignore
│   ├── package-lock.json
│   └── package.json
      
PASSO A PASSO
* abrir o projeto pelo editor de codigo VSCODE
* verificar se o servidor está rodando "npm start"
* se estiver rodando você vai ver "http://localhost:3000/"
* inserir os campos obrigatórios
* vai salvar localmente no "localhost"
* abrir o "xampp" para rodar o mysql, verificar se o "Actions" está em "stop", se estiver em "start" a porta não está rodando, se estiver rodando abra o MYSQL
* abrir o "MYSQL Workbench" 
* verificar se a tabela está criada para cadastrar os usuários dentro do banco com "ID, Name, email, age, birth_date, role, terms_accepted"
* SHOW Tables;
DESCRIBE usuarios;
verificar se o banco está criado 
* quando o banco está criando e inserir no "localhost"
* verificar se foi cadastrado com sucesso
* "USE mentebanco;"
* "SELECT * FROM usuarios;"
* se estiver tudo certo cadastrado quando o usuario for cadastrado no sistema, vai ser inserido no banco de dados "MYSQL"
