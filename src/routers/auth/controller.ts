import { Request, Response } from 'express';
import { Errors } from '../../errors';
import { signUpValidation } from '../../validators/auth';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import jwt from 'jsonwebtoken'
import { env } from '../../env';

export const signUp = async (req: Request, res: Response) => {
    try {
        const validationErros = await signUpValidation(req.body)

        if (validationErros.length) {
            return res.send({ success: true, errors: validationErros })
        }

        const {
            name,
            surname,
            nickname,
            email,
            password
        } = req.body

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            surname,
            nickname,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ ...user }, env.jwtTokenSecretKey, { expiresIn: env.jwtTokenExpire });

        if (token) {
            user.personalAccessKey = token
            user.save()
        }

        res.send({ success: true, user, token })
    } catch (error) {
        res.send({ success: false, errors: [Errors.Internal] })
    }
}