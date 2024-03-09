import express from "express";
import { PORT } from "./constants"
import { Error } from "./types"
import { errorHandler } from "./helpers/error";
import cors from "cors";

import authRoutes from "./routes/auth";
import historyRoutes from "./routes/history";
import { loginRequired } from "./middleware/auth";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/history", loginRequired, historyRoutes)

app.use((req, res, next: any) => {
    let err: Error = { status: 404, message: "Not Found" };

    return next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
});