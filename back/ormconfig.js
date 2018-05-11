function getOrmConfig() {
  let settings;
  if (process.env.NODE_ENV !== 'test') {
    settings = {
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    };
  } else {
    settings = {
      host: 'localhost',
      port: 3306,
      username: 'scoreboard_test',
      password: 'scoreboard_test',
      database: 'scoreboard_test',
      dropSchema: true,
      synchronize: true,
      logging: 'error',
    };
  }

  return Object.assign(
    {
      type: 'mysql',
      entities: [__dirname + '/src/**/**.entity.ts'],
      migrations: [__dirname + '/src/migrations/**/*.ts'],
      subscribers: [__dirname + '/src/**/**.subscriber.ts'],
      synchronize: false,
      logging: true,
      maxQueryExecutionTime: 1000,
      charset: 'utf8mb4_unicode_ci',
      timezone: 'Z',
    },
    settings,
  );
}

module.exports = getOrmConfig();
