
## Installation

```bash
$ npm install
```

Edit `prisma/schema.prisma`.
prisma folder should be the **same level** of `src`
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Make sure `DATABASE_URL` in environment variable.



## Running the app

```bash
# prepare prisma client
$ npx prisma introspect
$ npx prisma generate

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
