import * as fs from 'fs';
import * as yaml from 'js-yaml';
import {Connection} from 'typeorm';

export async function loadFixtures(name: string, connection: Connection): Promise<any> {
    let items: any[] = [];
    try {
        const file: any = yaml.safeLoad(fs.readFileSync(`./test/fixtures/${name}.yml`, 'utf8'));
        items = file['fixtures'];
    } catch (e) {
        console.log('fixtures error', e);
    }

    if (!items) {
        return;
    }

    items.forEach(async (item: any) => {
        const entityName = Object.keys(item)[0];
        const data = item[entityName];
        const repo = connection.getRepository(entityName);
        await repo.createQueryBuilder().insert().into(entityName).values(data).execute();
    });
}
