import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { getConnection } from 'typeorm';

export async function loadFixtures(
  fixturesPath: string,
): Promise<any> {
  let items: any[] = [];
  try {
    console.log(`Loading fixtures from ${fixturesPath}`);
    const file: any = yaml.safeLoad(fs.readFileSync(fixturesPath, 'utf8'));
    items = file['fixtures'];
  } catch (e) {
    console.log('fixtures error', e);
  }

  if (!items) {
    console.log('No fixtures found');
    return;
  }

  const connection = getConnection();

  const refs = {};

  for (const item of items) {
    await loadItem(connection, item, refs);
  }
}

async function loadItem(connection, item: any, refs: any) {
  const entityName = Object.keys(item)[0];
  const { $ref, ...data } = item[entityName];
  const entity = connection.getRepository(entityName).create(data);

  for (const key in data) {
    if (refs[data[key]] !== undefined) {
      entity[key] = refs[data[key]];
    }
  }

  const persistedEntity = await connection.manager.save(entity);

  if ($ref !== undefined) {
    if (refs[$ref] !== undefined) {
      throw new Error('duplicate $ref');
    }
    refs[$ref] = persistedEntity.id;
  }
}
