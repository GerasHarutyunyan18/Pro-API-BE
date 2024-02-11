import { Request, Response } from "express";
import { Errors } from "../../errors";
import { signUpValidation } from "../../validators/auth";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import { env } from "../../env";

export const signUp = async (req: Request, res: Response) => {
  try {
    const validationErros = await signUpValidation(req.body);

    if (validationErros.length) {
      return res.send({ success: true, errors: validationErros });
    }

    const { name, surname, nickname, email, password } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      surname,
      nickname,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id }, env.jwtTokenSecretKey, {
      expiresIn: env.jwtTokenExpire,
    });

    if (token) {
      user.personalAccessKey = token;
      user.save();
    }

    res.send({ success: true, user, token });
  } catch (error) {
    res.send({ success: false, errors: [Errors.Internal] });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { nickname, password } = req.body;

    if (!nickname || !password) {
      return res.send({
        success: false,
        message: Errors.Parameter,
      });
    }

    const user = await User.findOne({ nickname });

    if (!user) {
      return res.send({
        success: false,
        error: Errors.InvalidAuthCreds,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.send({
        success: false,
        error: Errors.InvalidAuthCreds,
      });
    }

    const token = jwt.sign({ userId: user._id }, env.jwtTokenSecretKey, {
      expiresIn: env.jwtTokenExpire,
    });

    res.send({ success: true, user, token });
  } catch (error) {
    res.send({ success: false, error: [Errors.Internal] });
  }
};

export const checkAuthToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.send({ success: false, message: "`token` not provided." });
    }

    jwt.verify(token, env.jwtTokenSecretKey, async (err, decoded) => {
      if (err) {
        return res.send({
          success: false,
          error: Errors.AuthTokenInvalid,
        });
      }

      const user = await User.findById((decoded as any)?.userId);

      if (!user) {
        return res.send({ success: false, error: Errors.UserNotFound });
      }

      res.send({ success: true, user });
    });
  } catch (error) {
    res.send({ success: false, errors: [Errors.Internal] });
  }
};
