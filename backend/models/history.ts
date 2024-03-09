import fs from "fs";
import { readFile, getUserById } from "./user";
import { User } from "../types";

export const saveEquation = (userId: string, equation: string) => {
    const users = readFile();

    const userIndex  = users.findIndex((user:User) => user.id === userId)

    users[userIndex] = {
        ...users[userIndex],
        equations: [...users[userIndex]?.equations ?? [], equation]
    }

    fs.writeFileSync("models/db.json", JSON.stringify(users));

    return users[userIndex].equations;
}

export const getEquations = (userId: string) => {
    const user = getUserById(userId);

    return user.equations;
}

saveEquation("55665622-e78d-495f-9dcb-4d39903f8373", "1 + 2 + 5")
