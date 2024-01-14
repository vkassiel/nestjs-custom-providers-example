# nestjs-custom-providers-examples
Alternando a injeção de dependência das classes a partir de um parâmetro utilizando [`custom providers`](https://docs.nestjs.com/fundamentals/custom-providers) do NestJS no [`escopo de requisição`](https://docs.nestjs.com/fundamentals/injection-scopes).

## Requisitos
- Node v20.11.x

## Iniciando
Após clonar o repositório, vá até a raiz do projeto e instale as dependências utilizando o `npm install`.

## Rodando o app
Rode o comando `npm run start:dev`.

## Fazendo uma requisição
Rode o script localizado na raiz do projeto utilizando o comando `sh request-to-price-endpoint.sh <CUSTOMER_HOSTNAME>`, com o `hostname` do cliente. Disponíveis: `skynet`, `umbrellacorp`.

## Referências
- [NodeJS](https://nodejs.org/)
- [NestJS Docs](docs.nestjs.com)
- [NestJS Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)
- [NestJS Injection Scopes](https://docs.nestjs.com/fundamentals/injection-scopes)