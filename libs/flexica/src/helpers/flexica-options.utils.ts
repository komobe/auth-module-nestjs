import {
    FactoryProvider,
    InternalServerErrorException,
    Provider,
    ValueProvider,
} from '@nestjs/common';
import {
    AUTHENTICATOR_PROVIDER,
    PASSWORD_VALIDATOR_PROVIDER,
    RETRIEVE_USER_PROVIDER,
} from '../configs/tokens';
import {
    AuthenticatorType,
    createAuthenticator,
    createPasswordValidator,
    FlexicaModuleOptions,
    PasswordType,
} from '../contracts';

/**
 * Validates the provided FlexicaModule options and throws an exception if any required field is missing.
 * @param options - The module options to validate.
 */
function validateOptions<T>(options: FlexicaModuleOptions<T>): void {
    if (!options.retrieveUserProvider) {
        throw new InternalServerErrorException(
            'The retrieveUserProvider must be provided in FlexicaModule options.',
        );
    }

    if (options.authenticatorType === 'JWT' && !options.parameters?.jwtSecret) {
        throw new InternalServerErrorException(
            'A jwtSecret must be provided in FlexicaModule options when using JWT authenticator type.',
        );
    }
}

/**
 * Sets default values for the FlexicaModule options if they are not provided by the user.
 * @param options - The module options to initialize with default values.
 */
function setDefaultOptions<T>(options: FlexicaModuleOptions<T>): void {
    options.authenticatorType = options.authenticatorType ?? 'JWT';
    options.passwordType = options.passwordType ?? 'BCRYPT';
}

/**
 * Initializes the FlexicaModule options by setting defaults and validating the provided options.
 * @param options - The module options to initialize.
 * @returns The fully initialized and validated module options.
 */
export function initializeOptions<T>(options: FlexicaModuleOptions<T>): FlexicaModuleOptions<T> {
    setDefaultOptions(options);
    validateOptions(options);
    return options;
}

/**
 * Creates providers for the FlexicaModule based on the initialized options.
 * @param options - The fully initialized module options.
 * @returns An array of providers to be used in the module.
 */
export function createProvidersFromOptions<T>(options: FlexicaModuleOptions<T>): Provider[] {
    const authenticatorProvider: FactoryProvider = {
        provide: AUTHENTICATOR_PROVIDER,
        useFactory: () =>
            createAuthenticator(
                options.authenticatorType as AuthenticatorType,
                options.parameters,
            ),
    };

    const passwordValidatorProvider: FactoryProvider = {
        provide: PASSWORD_VALIDATOR_PROVIDER,
        useFactory: () =>
            createPasswordValidator(
                options.passwordType as PasswordType,
            ),
    };

    const retrieveUserProvider: ValueProvider = {
        provide: RETRIEVE_USER_PROVIDER,
        useValue: options.retrieveUserProvider,
    };

    return [authenticatorProvider, passwordValidatorProvider, retrieveUserProvider];
}