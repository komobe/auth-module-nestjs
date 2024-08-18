import * as jwt from 'jsonwebtoken';
import { Authenticator, authentificationError } from '../contracts';

/**
 * JWT-based authenticator that verifies JWT tokens and returns the decoded payload.
 *
 * @template T - The type of the object that the `authenticate` method returns.
 */
export class JwtAuthenticator<T = any> implements Authenticator<T> {
    /**
     * Creates an instance of `JwtAuthenticator`.
     *
     * @param jwtSecret - The secret key used to verify the JWT token.
     */
    constructor(private readonly jwtSecret: string) {}

    /**
     * Authenticates a JWT token and returns the decoded payload.
     *
     * @param token - The JWT token to authenticate.
     * @returns A promise that resolves to the decoded payload if the token is valid.
     * @throws UnauthorizedException if the token is invalid or expired.
     */
    async authenticate(token: string): Promise<T> {
        try {
            return jwt.verify(token, this.jwtSecret) as T;
        } catch (error: any) {
            authentificationError(error.message || 'Invalid token');
        }
    }

    /**
     * Generates a JWT token based on the provided payload and optional arguments.
     * The implementation allows customization of the token, such as setting expiration, audience, etc.
     *
     * @param payload - The payload to encode in the token. Must be an object or can be converted to an object.
     * @param options - Optional arguments to customize the token generation (e.g., expiration time, audience).
     * @returns A promise that resolves to a string representing the signed JWT token.
     * @throws Error if the payload cannot be converted to an object or if token generation fails.
     */
    async generateToken(payload: T, options: jwt.SignOptions = {}): Promise<string> {
        if (typeof payload !== 'object' || payload === null) {
            throw new Error('Payload must be an object to generate a JWT token.');
        }

        try {
            return jwt.sign(payload, this.jwtSecret, options);
        } catch (error: any) {
            throw new Error(`Token generation failed: ${error.message}`);
        }
    }
}
