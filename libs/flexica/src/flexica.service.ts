import { AuthPayload } from "@contracts/auth-payload.interface";
import { Authenticator } from '@contracts/authenticator.interface';
import { AuthentificationError } from '@contracts/errors/authentification.error';
import { PasswordValidator } from '@contracts/password.validator';
import {
    AUTHENTICATOR_PROVIDER,
    PASSWORD_VALIDATOR_PROVIDER,
    RETRIEVE_USER_PROVIDER,
} from 'libs/flexica/src/configs/tokens';
import { RetrieveUserProvider } from 'libs/flexica/src/configs/types';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FlexicaService<T = any> {
    constructor(
        @Inject(AUTHENTICATOR_PROVIDER)
        private readonly authenticator: Authenticator,
        @Inject(PASSWORD_VALIDATOR_PROVIDER)
        private readonly passwordValidator: PasswordValidator,
        @Inject(RETRIEVE_USER_PROVIDER)
        private readonly retrieveUserProvider: RetrieveUserProvider<T>
    ) {}

    async loginUser(payload: AuthPayload): Promise<string> {
        const user = await this.retrieveUserProvider(payload);

        const isValid = await this.passwordValidator.validate(payload.password, (user as any).password);

        if (!isValid) {
            throw new AuthentificationError('Invalid credentials');
        }

        return await (this.authenticator.generateToken as Function)({username: payload.username});
    }

    async verifyUser(header: string): Promise<T> {
        try {
            const [scheme, token] = header.split(' ');

            if (scheme !== 'Bearer') {
                throw new AuthentificationError('Unsupported authentication scheme');
            }

            const decoded = await this.authenticator.authenticate(token);

            const user = await this.retrieveUserProvider(decoded as AuthPayload);

            if (!user) {
                throw new AuthentificationError('User not found');
            }

            return user;
        } catch (error) {
            if (!(error instanceof AuthentificationError)) {
                throw new AuthentificationError('Invalid token');
            }
            throw error;
        }
    }
}