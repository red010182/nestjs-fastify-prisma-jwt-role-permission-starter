
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

## Prepare Database
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
