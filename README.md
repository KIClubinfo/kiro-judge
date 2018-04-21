## Installation

```bash
npm install
cp ormconfig.json.dist ormconfig.json
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Migrations

### Running migrations
```bash
npm run typeorm -- migration:run
```

### Creating a migration
```bash
npm run typeorm -- migration:generate -n add_super_table
```

### Documentation
- TypeORM documentation : http://typeorm.io/#/
- TypeORM migration documentation : http://typeorm.io/#/migrations