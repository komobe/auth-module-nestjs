import { PasswordValidator } from '@contracts/password-validator';
import * as bcrypt from 'bcrypt';

export class BcryptPasswordValidator implements PasswordValidator {
    async validate(plainPassword: string, passwordHash: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, passwordHash);
    }
}