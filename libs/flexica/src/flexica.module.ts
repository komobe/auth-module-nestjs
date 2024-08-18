import { DynamicModule, Module } from '@nestjs/common';
import { FlexicaModuleOptions } from './contracts';
import { FlexicaService } from './flexica.service';
import { FlexicaOptionsInitializer, FlexicaProvidersInitializer } from './initializers';

@Module({})
export class FlexicaModule {
    static forRoot<T>(options: FlexicaModuleOptions<T>): DynamicModule {
        const initializedOptions = FlexicaOptionsInitializer.initialize(options);
        return {
            module: FlexicaModule,
            providers: FlexicaProvidersInitializer.create(initializedOptions),
            exports: [FlexicaService],
        };
    }
}
