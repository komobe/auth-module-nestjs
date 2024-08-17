import { AuthPayload } from '../contracts';

export type RetrieveUserProvider<T> = (payload: AuthPayload) => Promise<T>;
