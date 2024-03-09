import { saveEquation, getEquations } from "../models/history";
import { Request, Response } from "express";

const saveHistory = (req: Request, res: Response) => {
    const { equation } = req.body;
    const { userId } = req.params;

    if (!equation || !userId) {
        return res.send("You must specify equation and userId!");
    }

    try {
        const user = saveEquation(userId, equation);
        res.json(user);
    } catch (e) {
        return res.json({ message: "Something went wrong!" });
    }
}

const getHistory = (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        return res.send("You must specify userId!");
    }

    try {
        const equations = getEquations(userId);
        res.json(equations);
    } catch (e) {
        return res.json({ message: "Something went wrong!" });
    }
}


export { saveHistory, getHistory };