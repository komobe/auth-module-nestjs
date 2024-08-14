import * as bcrypt from 'bcrypt';
import {PasswordValidator} from "@komobe/flexica/core/password-validator";

export class BcryptPasswordValidator implements PasswordValidator {
    async validate(plainPassword: string, passwordHash: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, passwordHash);
    }
}