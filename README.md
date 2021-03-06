# Netflix

Sistema semelhante ao Netflix, projeto final do curso de Nodejs

# Rodando localmente

    git clone https://github.com/troianosacademy/netflix.git
    cd netflix
    npm install
    npm start
    npm install -g nodemon

    http://localhost:3000/
    http://localhost:3000/admin

    Default user: admin@io
    Default password: admin.io

## Frontend

**1. Autenticação**

- [x] Cadastro de novos usuário
- [x] Login
- [x] Logout

**2. Geral**

- [x] Listagem de títulos agrupados por categoria
- [x] Listagem de filmes
- [x] Listagem de séries
- [x] Listagem de episódios por série
- [x] Player de filmes e séries
- [x] Busca
- [x] Alterar dados do usuário

## Admin

**1. Autenticação**

- [x] Login
- [x] Logout

**2. Categorias**

- [x] Listagem
- [x] Cadastro com validações
- [x] Edição com validações
- [x] Remoção

**3. Filmes**

- [x] Listagem
- [x] Cadastro com validações e upload de arquivos (capa e video)
- [x] Edição com validações e upload de arquivos (capa e video)

**4. Series**

- [x] Listagem
- [x] Cadastro com validação e upload de arquivo (capa)
- [x] Edição com validação e upload de arquivo (capa)
- [x] Cadastro de temporadas com validação
- [ ] Upload de vídeos e capas para cada episódio por temporada

**5. Usuários**

- [x] Listagem
- [x] Desabilitar um usuário
- [x] Edição do usuário com validação 
- [x] Gerenciar permissões de um usuário
