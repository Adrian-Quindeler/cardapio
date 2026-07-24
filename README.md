# Projeto: Cardápio Online para Sorveteria

## Visão Geral

Este projeto consiste no desenvolvimento de um sistema web para uma sorveteria, dividido em duas áreas: uma área pública para os clientes consultarem os produtos e uma área administrativa para gerenciamento do sistema.

---  

# Stack

O sisema utiliza as tecnologias abaixo:

* Next.js (App Router)
* TypeScript
* CSS Modules
* Bootstrap
* Turso (DB SQLite)
* Drizzle ORM
* Better Auth
* Zod
* Lucide React

---

# Objetivos do Projeto

O sistema permite que clientes consultem facilmente o catálogo da sorveteria enquanto administradores possam gerenciar todas as informações através de um painel protegido por autenticação.

O sistema foi pensado para crescer futuramente, portanto toda a estrutura é modular e preparada para expansão.

---

# Área Pública (Cliente)

A área do cliente é totalmente pública e não exige autenticação. Ela funciona como um cardápio digital:

* Categorias
* Subcategorias
* Produtos
* Preço de varejo
* Preço de atacado
* Horário de funcionamento da loja
* Informação indicando se a loja está aberta ou fechada naquele momento

---

# Área Administrativa

A área administrativa possui autenticação e somente usuários autorizados podem acessá-la.

Após o login, o administrador tem acesso a um painel contendo os módulos:

* Dashboard
* Produtos
* Categorias
* Subcategorias
* Usuários
* Horários de Funcionamento

Cada módulo possui operações completas de CRUD.

---

# Arquitetura

A organização do projeto segue uma arquitetura semelhante à utilizada em backends tradicionais.

```
Route Handler => Service => Repository => Banco de Dados
```

Cada camada resolve apenas sua responsabilidade.


### Route Handlers

Responsáveis apenas por:

* Receber requisições
* Validar entrada
* Chamar os Services
* Retornar respostas

Não devem conter regras de negócio.

---

### Services

Responsáveis por:

* Regras de negócio
* Validações
* Operações
* Comunicação com os Repositories

---

### Repositories

Responsáveis exclusivamente pelo acesso ao banco de dados.

Toda consulta SQL ou utilização do Drizzle fica nesta camada.

---

### Banco de dados

* Turso
* Drizzle ORM

---

# Escalabilidade

A arquitetura é preparada para permitir futuras implementações sem grandes refatorações.

Entre elas:

* Modal de detalhes do produto
* Upload de imagens
* Promoções
* Pesquisa de produtos
* Carrinho de compras
* Pedidos online
* Integração com WhatsApp
* Controle de estoque
* Múltiplas lojas
* Sistema de permissões mais avançado
* Dashboard com estatísticas