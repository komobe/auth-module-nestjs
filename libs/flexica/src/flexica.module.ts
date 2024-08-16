import { createAuthenticator } from '@contracts/authenticator.factory';
import { FlexicaModuleOptions } from '@contracts/flexica-config.interface';
import { createPasswordValidator } from '@contracts/password-validator.factory';
import { DynamicModule, FactoryProvider, InternalServerErrorException, Module, ValueProvider } from '@nestjs/common';
import {
    AUTHENTICATOR_PROVIDER,
    PASSWORD_VALIDATOR_PROVIDER,
    RETRIEVE_USER_PROVIDER,
} from 'libs/flexica/src/configs/tokens';
import { FlexicaService } from './flexica.service';

@Module({})
export class FlexicaModule {
    static forRoot<T>(options: FlexicaModuleOptions<T>): DynamicModule {
        FlexicaModule.validateOptions(options);
        const providers = FlexicaModule.createProviders(options);

        return {
            module: FlexicaModule,
            providers: [FlexicaService, ...providers,],
            exports: [FlexicaService],
        };
    }

    private static validateOptions<T>(options: FlexicaModuleOptions<T>): void {
        if (!options.retrieveUserProvider) {
            throw new InternalServerErrorException('retrieveUserProvider must be provided in FlexicaModule options.');
        }

        if (!options.authenticatorType) {
            throw new InternalServerErrorException('Authenticator type must be provided.');
        }

        if (!options.passwordType) {
            throw new InternalServerErrorException('Password type must be provided.');
        }
    }

    private static createProviders<T>(options: FlexicaModuleOptions<T>): (ValueProvider | FactoryProvider)[] {
        const authenticatorProvider: FactoryProvider = {
            provide: AUTHENTICATOR_PROVIDER,
            useFactory: () => createAuthenticator(options.authenticatorType, options.parameters),
        };

        const passwordValidatorProvider: FactoryProvider = {
            provide: PASSWORD_VALIDATOR_PROVIDER,
            useFactory: () => createPasswordValidator(options.passwordType),
        };

        const retrieveUserProvider: ValueProvider = {
            provide: RETRIEVE_USER_PROVIDER,
            useValue: options.retrieveUserProvider,
        };

        return [authenticatorProvider, passwordValidatorProvider, retrieveUserProvider];
    }
}