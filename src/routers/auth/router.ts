import { Router } from "express";
import { checkAuthToken, login, signUp } from "./controller";

const AuthRouter = Router();

AuthRouter.post("/signup", signUp);
AuthRouter.post("/login", login);
AuthRouter.post("/authToken/:token", checkAuthToken);

export default AuthRouter;
