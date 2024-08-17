import { RetrieveUserProvider } from '@flexica/configs';
import { AuthenticatorParameters, AuthenticatorType, PasswordType } from '@flexica/contracts';

export interface FlexicaModuleOptions<T = any> {
    authenticatorType: AuthenticatorType;
    passwordType: PasswordType;
    parameters: AuthenticatorParameters;
    retrieveUserProvider: RetrieveUserProvider<T>;
}
