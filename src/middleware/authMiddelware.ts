//Imports

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (req:Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if(!token) return res.status(401).json({ error: "Access Denied"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };// Attach user to request object
        (req as any).user = decoded;
        next();
    }
    catch(error){
        return res.status(403).json({ error: "Invalid token"})
    }
}