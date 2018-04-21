import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CollectModule} from './collect/collect.module';
import {getOrmConfig} from './database.config';

@Module({
    imports: [
        TypeOrmModule.forRoot(getOrmConfig()),
        CollectModule,
    ],
    controllers: [],
    components: [],
})
export class AppModule {
}
