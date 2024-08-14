import { AuthPayload } from "@contracts/auth-payload.interface";

export type RetrieveUserProvider<T> = (payload: AuthPayload) => Promise<T>;