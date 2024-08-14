import { AuthenticatorParameters, AuthenticatorType } from '@contracts/authenticator.factory';
import { PasswordType } from '@contracts/password-validator.factory';
import { RetrieveUserProvider } from 'libs/flexica/src/configs/types';

export interface FlexicaModuleOptions<T = any> {
    authenticatorType: AuthenticatorType;
    passwordType: PasswordType;
    parameters: AuthenticatorParameters;
    retrieveUserProvider: RetrieveUserProvider<T>;
}