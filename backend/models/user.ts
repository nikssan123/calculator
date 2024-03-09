import fs from "fs";
import {v4 as uuidv4} from 'uuid';
import { User } from "../types";

export const createUser = (user: Pick<User, 'email' | 'username' | 'password'>): User => {
    const users = readFile();

    const newUser: User = {
        id: uuidv4(),
        ...user
    }

    const newUsers = [...users, newUser];
    fs.writeFileSync("models/db.json", JSON.stringify(newUsers));

    return newUser;
}

export const getUser = (email: string): User => {
    const users = readFile();

    return users.filter((user: User) => user.email === email)[0];
}

export const getUserById = (id: string): User => {
    const users = readFile();

    return users.filter((user: User) => user.id === id)[0];
}

export const readFile = (): any => {
    const file = fs.readFileSync('models/db.json', "utf-8");

    const users = JSON.parse(file);

    return users;
}


// TODO: remove testing
// createUser({
//     username: "Test func",
//     email: "testEmail@gmail.com",
//     password: "123"
// });

// console.log(getUser("test@gmail.com"))

