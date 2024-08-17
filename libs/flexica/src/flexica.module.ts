import {
    DynamicModule,
    FactoryProvider,
    InternalServerErrorException,
    Module,
    Provider,
    ValueProvider,
} from '@nestjs/common';
import {
    AUTHENTICATOR_PROVIDER,
    PASSWORD_VALIDATOR_PROVIDER,
    RETRIEVE_USER_PROVIDER,
} from './configs/tokens';
import {
    AuthenticatorType,
    createAuthenticator,
    createPasswordValidator,
    FlexicaModuleOptions,
    PasswordType,
} from './contracts';
import { FlexicaService } from './flexica.service';

@Module({})
export class FlexicaModule {
    static forRoot<T>(options: FlexicaModuleOptions<T>): DynamicModule {
        FlexicaModule.validateOptions(options);
        FlexicaModule.setDefaultOptions(options);
        const providers = FlexicaModule.createProviders(options);

        return {
            module: FlexicaModule,
            providers: [FlexicaService, ...providers],
            exports: [FlexicaService],
        };
    }

    private static validateOptions<T>(options: FlexicaModuleOptions<T>): void {
        if (!options.retrieveUserProvider) {
            throw new InternalServerErrorException(
                'retrieveUserProvider must be provided in FlexicaModule options.',
            );
        }
    }

    private static createProviders<T>(options: FlexicaModuleOptions<T>): Provider[] {
        const authenticatorProvider: FactoryProvider = {
            provide: AUTHENTICATOR_PROVIDER,
            useFactory: () => createAuthenticator(options.authenticatorType as AuthenticatorType, options.parameters),
        };

        const passwordValidatorProvider: FactoryProvider = {
            provide: PASSWORD_VALIDATOR_PROVIDER,
            useFactory: () => createPasswordValidator(options.passwordType as PasswordType),
        };

        const retrieveUserProvider: ValueProvider = {
            provide: RETRIEVE_USER_PROVIDER,
            useValue: options.retrieveUserProvider,
        };

        return [authenticatorProvider, passwordValidatorProvider, retrieveUserProvider];
    }

    private static setDefaultOptions<T>(options: FlexicaModuleOptions<T>) {
        if (!options.authenticatorType) {
            options.authenticatorType = 'JWT';
        }

        if (!options.passwordType) {
            options.passwordType = 'BCRYPT';
        }
    }
}
