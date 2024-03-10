export interface UserResponse {
    username: string;
    email: string;
    id: string;
    token: string;
    equations?: string[];
}

export interface User {
    username: string;
    email: string;
    password: string;
}