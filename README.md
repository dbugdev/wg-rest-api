# wg-rest-api

Rest API with JWT Authentication.

## Run Locally

Clone the project

```bash
  git clone https://github.com/dbugdev/wg-rest-api.git
```

Go to the project directory

```bash
  cd wg-rest-api
```

Install dependencies

```bash
  yarn Install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`MONGO_URL`
`JWT_SECRET`

Start the server

```bash
  yarn dev
```

---

## API

> http://localhost:{PORT}

## LOGIN - REGISTER

| TYPE     | METHOD | URL                |
| -------- | ------ | ------------------ |
| Login    | post   | /api/auth/login    |
| Register | post   | /api/auth/register |

## PRODUCTS

| TYPE                                                   | METHOD | URL                          |
| ------------------------------------------------------ | ------ | ---------------------------- |
| Get all products.                                      | get    | /api/products                |
| Get products by name.                                  | get    | /api/products?name=demo      |
| Get products by page no. [default : 5 products]        | get    | /api/products?page=2         |
| Get products by page and limit. [default : 5 products] | get    | /api/products?page=2&limit=6 |
| Create product.                                        | post   | /api/products                |
| Get a single product.                                  | get    | /api/products/:id            |
| Update product.                                        | put    | /api/products/:id            |
| Delete product.                                        | delete | /api/products/:id            |

> Register

```
{
    "name" : "<name>",
    "email" : "<email>",
    "password: "<password>"
}
```

> Login

```
{
    "email" : "<email>",
    "password: "<password>"
}
```

> Products

```
{
    "name" : "<product name>",
    "price" : "<price>",
    "description" : "<description>",
    "user" : "<userId>",
}

```

## Authors

- [@dbugdev](https://www.github.com/dbugdev)

## License

MIT
