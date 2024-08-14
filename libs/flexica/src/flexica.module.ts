import { FlexicaModuleOptions } from "@contracts/flexica-config.interface";
import { RETRIEVE_USER_PROVIDER } from "libs/flexica/src/configs/tokens";
import { DynamicModule, InternalServerErrorException, Module } from '@nestjs/common';
import { FlexicaService } from './flexica.service';

@Module({})
export class FlexicaModule {
    static forRoot<T>(options: FlexicaModuleOptions<T>): DynamicModule {
        if (!options.retrieveUserProvider) {
            throw new InternalServerErrorException('retrieveUserProvider must be provided in FlexicaModule options.');
        }

        return {
            module: FlexicaModule,
            providers: [
                FlexicaService,
                {
                    provide: RETRIEVE_USER_PROVIDER,
                    useValue: options.retrieveUserProvider,
                },
            ],
            exports: [FlexicaService],
        };
    }
}