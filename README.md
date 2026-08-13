# Projeto: Cardápio Online para Sorveteria

## Visão Geral

Este projeto consiste no desenvolvimento de um sistema web para uma sorveteria, dividido em duas áreas: uma área pública para os clientes consultarem os produtos e uma área administrativa para gerenciamento do sistema.

---

# Stack

O sistema utiliza as tecnologias abaixo:

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

### Fluxo de dados (leitura do cardápio)

Os dados são carregados no servidor e passados por props até a UI:

```
page.tsx (Server Component)
  → home-data.ts (consultas Drizzle)
  → Header / CategorySection
       → SubcategorySection
            → ProductCard
```

Arquivos principais:

* `cardapio/src/app/page.tsx` — orquestra a página e distribui os dados
* `cardapio/src/lib/home-data.ts` — buscas e montagem da árvore categoria → subcategoria → produtos
* `cardapio/src/components/home/` — componentes de exibição

Não há nova consulta ao banco ao trocar de subcategoria na interface: a troca usa dados já carregados em memória.

---

# Área Administrativa

A área administrativa possui autenticação via Better Auth; somente usuários autorizados podem acessá-la.

O painel está estruturado com os módulos abaixo (rotas e esboços em `src/app/admin`, `src/app/api`, `src/services` e `src/repositories`):

* Dashboard
* Produtos
* Categorias
* Subcategorias
* Usuários
* Horários de Funcionamento

A autenticação e a sessão já funcionam. O CRUD completo de cada módulo ainda está em construção (handlers, services e repositories em grande parte como stubs/TODO).

---

# Arquitetura

O projeto usa dois caminhos de dados, conforme a área.

### Área pública (leitura)

```
Server Component → home-data (Drizzle) → props → componentes
```

Usado na home para carregar o cardápio de forma eficiente, sem passar pela API REST.

### Área administrativa / API (alvo)

A organização segue uma arquitetura semelhante à utilizada em backends tradicionais:

```
Route Handler => Service => Repository => Banco de Dados
```

Esboços em `src/app/api`, `src/services` e `src/repositories`. Cada camada resolve apenas sua responsabilidade.

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

Nas rotas de API, consultas SQL / Drizzle ficam nesta camada. Na área pública de leitura, as consultas do cardápio ficam em `home-data.ts`.

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
