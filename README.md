
## Installation

```bash
$ npm install
```

Edit `prisma/.env` to set `DATABASE_URL`.

Or make it available as environment variable. For example in `.bash_profile`:
```
export DATABASE_URL="mysql://account:password@host:port/databse?schema=public"
```

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
