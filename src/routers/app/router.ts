import { Router } from "express";
import { createApp, getAll, getById } from "./controller";
import { userMiddleware } from "../../middlewares/user";

const AppRouter = Router();

AppRouter.post("/create", userMiddleware, createApp);
AppRouter.get("/getAll", userMiddleware, getAll);
AppRouter.get("/get/:id", getById);

export default AppRouter;
