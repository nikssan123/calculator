import { createUser, getUser } from "../models/user";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../constants";

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.send("You must specify username, email and password!");
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return res.json({ message: "Invalid Email!" });
    }

    try {
        const user = createUser({ username, email, password });
        const id = user.id

        const token = jwt.sign(
            {
                id,
                email,
                username,
            },
            SECRET
        );

        return res.status(200).json({
            id,
            email,
            username,
            token,
        });
    } catch (e) {
        return res.json({ message: "Something went wrong!" });
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const user = getUser(email);

        const { username, id } = user;

        const isMatch = user.password === password;

        if (isMatch) {
            const token = jwt.sign(
                {
                    id,
                    email,
                    username,
                },
                SECRET
            );

            return res.status(200).json({
                id,
                email,
                username,
                token,
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password",
            });
        }
    } catch (e) {
        return next({
            status: 400,
            message: "Invalid Email/Password",
        });
    }
};


export { register, login };