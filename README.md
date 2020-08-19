
## Installation

```bash
$ npm install
```

Create file `prisma/schema.prisma`:
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Create file `prisma/.env`:
```
DATABASE_URL="mysql://account:password@host:port/databse?schema=public"
```

## Prepare Database (Optional)
MySQL example

```
CREATE TABLE `Permission` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `User` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `roleID` int(11) unsigned DEFAULT NULL,
  `account` varchar(190) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`),
  KEY `roleID` (`roleID`),
  CONSTRAINT `User_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `Role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `RolePermission` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `permissionID` int(11) unsigned DEFAULT NULL,
  `roleID` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissionID` (`permissionID`,`roleID`),
  KEY `roleID` (`roleID`),
  CONSTRAINT `RolePermission_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `Role` (`id`),
  CONSTRAINT `RolePermission_ibfk_2` FOREIGN KEY (`permissionID`) REFERENCES `Permission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

```

## Prepare Prisma Client
After the database setup, we could automatically generate schema file by using these commands:
```
$ npx prisma introspect
```

#### Fine tune schema (Optional)
Then, edit prisma/schema.prisma, slightly change varaible names to match camel style. Do nothing except making the first character of relation variables to be lower case here.

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Permission {
  id             Int              @default(autoincrement()) @id
  name           String?
  category       String?
  rolePermission RolePermission[]

  @@index([name], name: "name")
}

model Role {
  id             Int              @default(autoincrement()) @id
  name           String?
  displayName    String?
  rolePermission RolePermission[]
  user           User[]

  @@index([name], name: "name")
}

model RolePermission {
  id           Int         @default(autoincrement()) @id
  permissionID Int?
  roleID       Int?
  permission   Permission? @relation(fields: [permissionID], references: [id])
  role         Role?       @relation(fields: [roleID], references: [id])

  @@index([roleID], name: "roleID")
  @@unique([permissionID, roleID], name: "permissionID")
}

model User {
  id       Int     @default(autoincrement()) @id
  name     String?
  roleID   Int?
  account  String? @unique
  password String?
  role     Role?   @relation(fields: [roleID], references: [id])

  @@index([roleID], name: "roleID")
}

```

#### Generate prisma client
```
$ npx prisma generate
```

Repeat above 2 steps everytime your database schema changes.

## Running the app



```bash

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run build:binary
$ node binary/index.js

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

## Known bugs
Injecting `@Res()` will unexpectedly timeout. This is nest's bug when using fastify adapter.
