# NLW Connect 19 - trilha NodeJS
## Criação de um backend em Typescript para um sistema de recomendações (referral systems)

### Tecnologias utilizadas
- NodeJS
- Typescript
- Fastify ("Fast and low overhead web framework, for Node.js")
- Zod ("Zod is a TypeScript-first schema declaration and validation library")
- Swagger (documentações das APIs geradas automaticamente) - acessar via http://localhost:3333/docs
- Docker (subir as services de postgres e redis)
- Drizzle ORM (conector com o postgres)
- Drizzle Kit (executor das migrations)
- PostgreSQL como banco relacional
- Redis como banco chave/valor, além de incrementador (funções hincrby, zrevrange, hget, zscore, zrevrank)
- CORS
- Biome ("Formate, verifique erros e muito mais em uma fração de segundo")
- tsup (transpilador dos arquivos para a produção)

### Comandos para instalação das libs

Typescript: 
- npm i tsx, typescript @types/node -D

Init arquivo tsconfig.json:
- npx tsc --init

Fastify:
- npm i @fastify/cors
- npm i fastify-type-provider-zod
- npm i @fastify/swagger @fastify/swagger-ui
- npm i @fastify/swagger @fastify/swagger-ui

Biome:
- npm i @biomejs/biome -D

Redis / Postgres / Drizzle:
- npm i ioredis
- npm i postgres drizzle-orm
- npm i drizzle-kit -D

Transpilador do Typescript em Javascript:
- npm i tsup -D