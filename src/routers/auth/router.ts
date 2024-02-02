import { Router } from "express";
import { signUp } from "./controller";

const AuthRouter = Router()

AuthRouter.post('/signup', signUp)

export default AuthRouter
