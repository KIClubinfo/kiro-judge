import { createConnection } from 'typeorm';

import getOrmConfig from '../ormconfig';
import { loadFixtures } from './fixtures-loader';

async function boot() {
  const connection = await createConnection(getOrmConfig());
  await connection.synchronize(true);
  await loadFixtures(process.argv[2]);
  await connection.close();
}

boot();
