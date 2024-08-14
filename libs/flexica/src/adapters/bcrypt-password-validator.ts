import { PasswordValidatorInterface } from '@contracts/password-validator.interface';
import * as bcrypt from 'bcrypt';

export class BcryptPasswordValidator implements PasswordValidatorInterface {
    async validate(plainPassword: string, passwordHash: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, passwordHash);
    }
}