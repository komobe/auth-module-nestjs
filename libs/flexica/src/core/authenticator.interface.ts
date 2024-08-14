/**
 * Interface representing an authenticator that verifies and optionally generates a token for a given payload.
 *
 * @template T - The type of the object that the `authenticate` method returns. Defaults to `any`.
 */
export interface Authenticator<T = any> {
    /**
     * Authenticates a given payload.
     *
     * @param payload - The string payload to authenticate, typically a JWT token or similar.
     * @returns A promise that resolves to an object of type `T` if the payload is valid.
     * @throws An error if the payload is invalid or if the authentication fails.
     */
    authenticate(payload: string): Promise<T>;

    /**
     * Optionally generates a token based on the provided payload.
     * The implementation of this method may vary depending on the authenticator.
     *
     * @param payload - The payload to encode in the token.
     * @param options - Optional arguments to customize the token generation (e.g., expiration time, audience).
     * @returns A promise that resolves to a string representing the generated token, if applicable.
     */
    generateToken?(payload: T, options?: {}): Promise<string>;
}