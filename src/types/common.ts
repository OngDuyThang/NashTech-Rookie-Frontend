export type Require<T, U extends keyof T, V extends keyof T = any> = Required<Pick<T, U>> & Omit<T, U | V>