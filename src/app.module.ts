import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CollectModule} from './collect/collect.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        CollectModule,
    ],
    controllers: [],
    components: [],
})
export class AppModule {
}
