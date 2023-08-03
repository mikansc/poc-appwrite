# POC - React + Appwrite

## Sobre

Este app é uma POC de utilização do [Appwrite](https://appwrite.io/).

## Features

- login com oAuth2 do Google
- criação de usuário
- criação de tarefa (To do)
- Logging com [Rollbar](https://rollbar.com/)

## Como executar

Para usá-la, você precisa configurar as variáveis de ambiente (ver [.env.example](./env.example))

| Variável                | Descrição                  |
| ----------------------- | -------------------------- |
| MK_DATABASE_ID          | ID do banco de dados       |
| MK_COLLECTION_ID        | ID da coleção              |
| MK_ENDPOINT             | Endpoint do Appwrite       |
| MK_PROJECT_ID           | ID do projeto              |
| MK_ROLLBAR_ACCESS_TOKEN | Token de acesso do Rollbar |
| MK_ROLLBAR_ENV          | Ambiente do Rollbar        |

Após configurar as variáveis de ambiente, execute:

```bash
npm install # ou yarn
npm run dev # ou yarn dev
```

Acesse [http://localhost:5173](http://localhost:5173) para ver o resultado.

## Autor

Michael Nascimento - [LinkedIn](https://www.linkedin.com/in/michaelnsc) | [GitHub](https://github.com/mikansc)
