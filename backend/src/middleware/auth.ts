import { auth } from "express-oauth2-jwt-bearer";
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import User from "../models/user";

declare global {
    namespace Express {
        interface Request {
            userId: string;
            auth0Id: string
        }
    }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

  export const jwtParse = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        res.sendStatus(401);
        return;
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.decode(token) as jwt.JwtPayload | null;
        if (!decoded || !decoded.sub) {
            res.sendStatus(401);
            return;
        }

        const auth0Id = decoded.sub;

        const user = await User.findOne({ auth0Id })

        if (!user) {
            res.sendStatus(401);
            return;
        }

        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString();
        next();
        
    } catch (error) {
        res.sendStatus(401);
        return;
    }
  }