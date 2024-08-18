import { Inject, Injectable } from '@nestjs/common';
import { RetrieveUserProvider } from './configs';
import {
    AUTHENTICATOR_PROVIDER,
    PASSWORD_VALIDATOR_PROVIDER,
    RETRIEVE_USER_PROVIDER,
} from './configs/tokens';
import { Authenticator, authentificationError, AuthPayload, PasswordValidator } from './contracts';

@Injectable()
export class FlexicaService<T = any> {
    constructor(
        @Inject(AUTHENTICATOR_PROVIDER)
        private readonly authenticator: Authenticator,
        @Inject(PASSWORD_VALIDATOR_PROVIDER)
        private readonly passwordValidator: PasswordValidator,
        @Inject(RETRIEVE_USER_PROVIDER)
        private readonly retrieveUserProvider: RetrieveUserProvider<T>,
    ) {}

    async loginUser(payload: AuthPayload): Promise<string> {
        const user = await this.retrieveUserProvider(payload);

        const isValid = await this.passwordValidator.validate(
            payload.password,
            (user as any).password,
        );

        if (!isValid) {
            authentificationError('Invalid credentials');
        }

        return await (this.authenticator.generateToken as Function)({
            username: payload.username,
        });
    }

    async verifyUser(header: string): Promise<T> {
        const [scheme, token] = header.split(' ');

        if (scheme !== 'Bearer') {
            authentificationError('Unsupported authentication scheme');
        }

        const decoded = await this.authenticator.authenticate(token);
        const user = await this.retrieveUserProvider(decoded as AuthPayload);

        if (!user) {
            authentificationError('User not found');
        }

        return user;
    }
}
