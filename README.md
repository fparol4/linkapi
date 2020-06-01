# LinkApi - Pipedrive integration with Bling

## Getting started

1. Clone o projeto para o seu computador 

    `git clone https://github.com/fparol4/linkapi-challenge`

2. Abra a pasta do projeto e faça o download de todas as dependências

    `yarn install` or `npm install`

3. O projeto é baseado em **typescript**, portanto é necessário fazer primeiro uma build.
    
    `yarn build` or `npm run build`

4. Adicione ao arquivo `.env.production` sua **bling-api-key** e o **mongo-db-uri**

    ```
    BLING_API_KEY={your_api_key}
    MONGO_URI={your_mongo_uri}
    ```

5. Inicie a aplicação com `yarn start` ou `npm run start`

6. Installe o **ngrok** para disponibilizar localmente a aplicação na internet e escutar pelas webhooks. 
   ```
   npm install -g ngrok 
   ngrok http 4000 
   // Um link ira aparecer, copie este link para utilizar no proximo passo
   ```

7. Logue-se no **Pipedrive** e busque pelas opções **Tools and Apps** > **Web Hooks** > **Create new Webhook**. 

// imagem

Se tudo estiver configurado corretamente, a integração já está online. 

## Rotas

```
Get -> /deals

@Description

Rota acessada para trazer todos os registros integrados. 

@Filtros

min_value: Todos os registros com um valor mínimo
title: Busca por registros a partir do título
page: Navega entre as páginas dos registros
limit: Altera o limite de registros por página

response: {
  "status": 200,
  "message": "All deals found successfully",
  "data": {
    "docs": [
      {
        "_id": "5ed44b22babf6f18c4eed585",
        "title": "Banca de Jornal negócio",
        "value": 33000,
        "currency": "USD",
        "org_name": "Banca de Jornal",
        "won_time": "2020-06-01T03:26:06.000Z",
        "external_id": "2",
        "created_at": "2020-06-01T00:26:10.428Z",
        "updated_at": "2020-06-01T00:26:10.428Z",
        "__v": 0
      },
      {
        "_id": "5ed44b2ebabf6f18c4eed586",
        "title": "Negócio LinkApi",
        "value": 500,
        "currency": "BRL",
        "org_name": "LinkApi",
        "won_time": "2020-04-28T19:00:03.000Z",
        "external_id": "1",
        "created_at": "2020-06-01T00:26:22.045Z",
        "updated_at": "2020-06-01T00:26:22.045Z",
        "__v": 0
      },
      {
        "_id": "5ed4655e7bf8f663128f49a0",
        "title": "Negócio LinkApi",
        "value": 500,
        "currency": "BRL",
        "org_name": "LinkApi",
        "won_time": "2020-04-28T19:00:03.000Z",
        "external_id": "10",
        "created_at": "2020-06-01T02:18:06.299Z",
        "updated_at": "2020-06-01T02:18:06.299Z",
        "__v": 0
      }
    ],
    "totalDocs": 3,
    "limit": 15,
    "totalPages": 1,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
  }
}
```

```
Get -> /deals/aggregated

@Description

Rota acessada para trazer todos os registros agregados por data e valor. 

@Filtros

min_value: Todos os registros com um valor mínimo
min_date: Todos os registros a partir de uma data mínima

response: {
  "status": 200,
  "message": "All deals found successfully",
  "data": [
    {
      "_id": "2020-06-01",
      "total": 33000
    },
    {
      "_id": "2020-06-02",
      "total": 500
    }
  ]
}
```

```
Get -> /deals/:id 

@Description

Rota acessada para trazer um registro pelo id. 

response: {
  "status": 200,
  "message": "Deal found successfully",
  "data": {
    "_id": "5ed44b22babf6f18c4eed585",
    "title": "Banca de Jornal negócio",
    "value": 33000,
    "currency": "USD",
    "org_name": "Banca de Jornal",
    "won_time": "2020-06-01T03:26:06.000Z",
    "external_id": "2",
    "created_at": "2020-06-01T00:26:10.428Z",
    "updated_at": "2020-06-01T00:26:10.428Z",
    "__v": 0
  }
}
```

```
Post -> /deals

@Description

Rota acessada pela webhook do pipedrive. 

@Examples

request: {
  id: number
  title: string
  value: number
  currency: string
  won_time: Date
  org_name: string
  status: string
},

response: {
  "status": 201,
  "message": "Deal created successfully",
  "data": {
    "_id": "5ed4655e7bf8f663128f49a0",
    "title": "Negócio LinkApi",
    "value": 500,
    "currency": "BRL",
    "org_name": "LinkApi",
    "won_time": "2020-04-28T19:00:03.000Z",
    "external_id": "10",
    "created_at": "2020-06-01T02:18:06.299Z",
    "updated_at": "2020-06-01T02:18:06.299Z",
    "__v": 0
  }
}
```

## Todo

- [ ] Mercury
