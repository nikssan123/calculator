export interface User {
    username: string;
    email: string;
    id: string;
    password: string;
    equations?: string[];
}

export interface Error {
    status?: number;
    message: string;
}