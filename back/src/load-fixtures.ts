import { createConnection } from 'typeorm';

import { loadFixtures } from '../test/fixtures/loader';

async function boot() {
  const connection = await createConnection();
  await connection.synchronize(true);
  await loadFixtures('kiro2018');
  await connection.close();
}

boot();
