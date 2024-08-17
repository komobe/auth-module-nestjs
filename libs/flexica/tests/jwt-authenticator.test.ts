import * as jwt from 'jsonwebtoken';
import { JwtPayload, verify } from 'jsonwebtoken';
import { JwtAuthenticator } from '../src/adapters';
import { Authenticator, AuthentificationError } from '../src/contracts';


describe('JwtAuthenticator', () => {
    const jwtSecret = 'w2Y/t6RnKDc9NfN+yVzHqjE56KcXwKHS3HdKSt+Hf0I=';
    const payload = { userId: 1, username: 'Kolo YEO' };
    let authenticator: Authenticator<typeof payload>;

    beforeEach(() => {
        authenticator = new JwtAuthenticator<typeof payload>(jwtSecret);
    });


    it('should generate a valid JWT token and handle expiration time', async () => {
        // Test pour un token valide
        const tokenWithoutExpiration = await (authenticator.generateToken as Function)(payload);
        expect(typeof tokenWithoutExpiration).toBe('string');

        const decodedWithoutExpiration = verify(tokenWithoutExpiration, jwtSecret) as JwtPayload & typeof payload;
        expect(decodedWithoutExpiration.userId).toBe(payload.userId);
        expect(decodedWithoutExpiration.username).toBe(payload.username);
        expect(decodedWithoutExpiration).toHaveProperty('iat'); // Vérifie que le champ `iat` est présent

        // Test pour un token avec une durée d'expiration
        const tokenWithExpiration = await (authenticator.generateToken as Function)(payload, { expiresIn: '1h' });
        expect(typeof tokenWithExpiration).toBe('string');

        const decodedWithExpiration = verify(tokenWithExpiration, jwtSecret) as JwtPayload & typeof payload;
        expect(decodedWithExpiration.userId).toBe(payload.userId);
        expect(decodedWithExpiration.username).toBe(payload.username);
        expect(decodedWithExpiration).toHaveProperty('iat');
        expect(decodedWithExpiration).toHaveProperty('exp'); // Vérifie que le champ `exp` est présent
    });

    it('should throw an error when generating a token with a non-object payload', () => {
        expect(async () => await (authenticator.generateToken as Function)('invalid_payload'))
            .rejects.toThrow('Payload must be an object to generate a JWT token.');
    });

    it('should authenticate a valid JWT token', async () => {
        const token = jwt.sign(payload, jwtSecret);
        const result = await authenticator.authenticate(token);

        expect(result.userId).toBe(payload.userId);
        expect(result.username).toBe(payload.username);
        expect(result).toHaveProperty('iat');
    });

    it('should throw an error for an invalid token', async () => {
        await expect(authenticator.authenticate('invalid_token'))
            .rejects.toThrow(AuthentificationError);
    });

    it('should throw an error for an expired token', async () => {
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1ms' });
        // wait a bit to ensure the token expires
        await new Promise(resolve => setTimeout(resolve, 10));
        await expect(authenticator.authenticate(token)).rejects.toThrow(AuthentificationError);
    });
});