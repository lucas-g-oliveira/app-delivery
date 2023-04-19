# App de Delivery  (Projeto Fullstack em grupo)

### `Javascript | CSS | React | Hofs | ContexAPI | LocalStorage | Express | Sequelize | MySQL | Docker | Md5 | JWT`

<br>

## Objetivo:
<section>
- Desenvolver o frontend e o backend de um sistema para gerênciar pedidos de um delivery de cervejas. O projeto tem o fluxo de pessoa cliente, onde é possível criar um novo usuário ou fazer login, e com o acesso validado, adicionar produtos ao carrinho, e efetuar checkout escolhendo a pessoa vendedora e prenchendo o endereço. Já no fluxo de pessoa vendedora, é possível alterar o status do pedido, para 'Preparando' ou 'Enviado', e a partir daí a pessoa cliente pode marcar o pedido como recebido.  
</section>

<br>

### Créditos:


Projeto desenvolvido em grupo; parte individual, parte em pair programing e parte refatorado por pessoa diferente á que programou a 1º versão, não sendo possível classificar com precisão o que desenvolvido por cada um. <br>
<br> <a href="https://www.linkedin.com/in/lucas-g-oliveira/"><img src="https://img.shields.io/badge/lucas gonçalves-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<br> <a href="https://www.linkedin.com/in/bruno-sayago/"><img src="https://img.shields.io/badge/Bruno Sayago-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<br> <a href="https://www.linkedin.com/in/gustavocorrealeal/"><img src="https://img.shields.io/badge/Gustavo Corrêa-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<br> <a href="https://www.linkedin.com/in/luizotcosta/"><img src="https://img.shields.io/badge/Luiz Otávio-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<br> <a href="https://www.linkedin.com/in/rodrigo-santiago-gomide/"><img src="https://img.shields.io/badge/Rodrigo Gomide-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>

- Desenvolvido pela Trybe: Conteúdos de testes, configurações do package.json, eslint, protótipo figma, e demais configurações base e de avaliação.

<br><br><img src="images/preview1.png" width="900px" >
<br><br><img src="images/preview2.png" width="900px" >
<br><br><img src="images/preview3.png" width="900px" >
<br><br><img src="images/preview4.png" width="900px" >
<br><br><img src="images/preview5.png" width="900px" >

</br>

## Requisitos alcançados:

> <br> 1 - Crie uma tela de login que deve ser acessível pelos endpoints / e /login no navegador
> <br> 2 - Crie os elementos da tela de login com os data-testids disponíveis no protótipo
> <br> 3 - Desenvolva a tela de login de maneira que ela impossibilite o login com dados mal-formatados
> <br> 4 - Desenvolva a tela de login de maneira que ela impossibilite o login com dados válidos, porém inexistentes no banco de dados
> <br> 5 - Desenvolva a tela de login de maneira que ela possibilite fazer o login com dados válidos e existentes no banco de dados
> <br> 6 - Crie uma tela de registro que deve ser acessível via endpoint /register no navegador e pelo botão de registro na tela de login
> <br> 7 - Crie os elementos da tela de registro com os data-testids disponíveis no protótipo
> <br> 8 - Desenvolva a tela de registro de maneira que ela impossibilite o cadastro com dados mal-formatados
> <br> 9 - Desenvolva a tela de registro de maneira que ela possibilite cadastrar com dados válidos
> <br> 10 - Desenvolva a tela de registro de maneira que ela impossibilite o cadastro de um usuário já existente
> <br> 11 - Crie uma tela de produtos do cliente contendo uma barra de navegação - navbar - que servirá também para demais telas das pessoas usuárias
> <br> 12 - Desenvolva a tela de produtos do cliente criando os demais elementos com os data-testids disponíveis no protótipo
> <br> 13 - Desenvolva a tela de produtos do cliente de forma que ela pressuponha dados válidos da pessoa usuária armazenados no localStorage
> <br> 14 - Desenvolva a tela de produtos do cliente de forma que os cards de todos os produtos pré-cadastrados contenham os valores corretos
> <br> 15 - Desenvolva a tela de produtos do cliente de forma que o preço total esteja correto após a adição de itens aleatórios
> <br> 16 - Desenvolva a tela de produtos do cliente de forma que haja um botão de carrinho que redirecionará para a tela de checkout caso itens sejam adicionados
> <br> 17 - Crie uma tela de checkout do cliente com elementos com os data-testids disponíveis no protótipo
> <br> 18 - Desenvolva a tela de checkout do cliente de forma a possuir os dados corretos do carrinho e preço total
> <br> 19 - Desenvolva a tela de checkout do cliente de forma que seja possível remover itens do carrinho
> <br> 20 - Desenvolva a tela de checkout do cliente de forma a nos redirecionar para a tela de detalhes do pedido feito após a finalização do mesmo
> <br> 21 - Desenvolva a tela de checkout do cliente de forma a gerar uma nova venda na tabela sales, assim como relações em salesProducts ao finalizar o pedido
> <br> 22 - Crie uma tela de pedidos do cliente com elementos a partir dos data-testids disponíveis no protótipo
> <br> 23 - Desenvolva a tela de pedidos do cliente de forma a conter a lista de pedidos do mesmo com os dados corretos
> <br> 24 - Desenvolva a tela de pedidos do cliente de forma a dar acesso à tela de detalhes de um pedido ao clicar no card do mesmo
> <br> 25 - Crie uma tela de detalhes do pedido do cliente com elementos a partir dos data-testids disponíveis no protótipo
> <br> 26 - Desenvolva a tela de detalhes do pedido do cliente de forma a possuir os dados corretos da venda
> <br> 27 - Crie uma tela de pedidos da pessoa vendedora com elementos a partir dos data-testids disponíveis no protótipo
> <br> 28 - Desenvolva a tela de pedidos da pessoa vendedora de forma a conter a lista de pedidos do mesmo com os dados corretos
> <br> 29 - Desenvolva a tela de pedidos da pessoa vendedora de forma a dar acesso à tela de detalhes de um pedido ao clicar no card do mesmo
> <br> 30 - Crie uma tela de detalhes do pedido da pessoa vendedora com elementos a partir dos data-testids disponíveis no protótipo
> <br> 31 - Desenvolva a tela de detalhes do pedido da pessoa vendedora de forma a possuir os dados corretos da venda
> <br> 32 - Desenvolva a tela de detalhes do pedido da pessoa vendedora de forma a ser capaz de alterar o status do pedido
> <br> 33 - Garanta que o status do pedido atualizado na tela de detalhes do pedido da pessoa vendedora seja refletido na tela de detalhes do pedido do cliente após atualização das páginas
> <br> 34 - Garanta que o status do pedido atualizado na tela de detalhes do pedido da pessoa vendedora seja refletido na tela de lista de pedidos do cliente após atualização das páginas

</br>
