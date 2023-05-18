import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import UserRepository from "../repositories/UserRepository.js";

const secret = process.env.JWT_SECRET;

class AuthController {

    async registration(req, res) {
        try {
            const salt      = await bcrypt.genSalt(10);
            const passHash  = await bcrypt.hash(req.body.password, salt);
            
            const newUser   = await UserRepository.create({
                email:      req.body.email,
                passHash:   passHash
            });

            const token = jwt.sign(
                {
                    id: newUser.id,
                },
                secret,
                {
                    expiresIn: '1d'
                }
            )

            return res.status(200).json({
                ...newUser, token
            })
        } catch (e) {
            return res.status(500).json({
                message: "Failed to create new user :("
            })
        }
    }

    async login(req, res) {
        try {
            const user = await UserRepository.getOneByEmail(req.email);

            const passValid = await bcrypt.compare(req.body.password, user.passHash)
            if (!passValid) {
                throw new Error('email/password pair is invalid')
            }
            const token = jwt.sign(
                {
                    id: user.id,
                },
                secret,
                {
                    expiresIn: '1d'
                }
            )
            return res.status(200).json({
                ...user, token
            })
        } catch (e) {
            return res.status(403).json({
                message: "Authorization failed"
            })
        }
    }

    async getAuth(req, res) {
        try {
            const user = await UserRepository.getOne(req.userId);
            if (!user) {
                return res.status(404).json({
                    message: "not found user"
                })
            } 
            return res.status(200).json({
                ...user
            })
        } catch (e) {
            console.error(e)
        }
    }
}

export default new AuthController();
