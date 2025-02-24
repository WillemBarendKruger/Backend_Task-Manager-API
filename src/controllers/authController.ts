// -------------Imports
import {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
require("dotenv").config();


const prisma = new PrismaClient();


export const createUser = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        
        const hasedPassword = bcrypt.hashSync(password, 8)

        const user = await prisma.user.create({
            data: {
                email,
                password: hasedPassword
            }
        });
        res.status(201).json({message: "User created successfly", user})
    }
    catch(error){
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// READ
    // Returns all users
// export const fetchAllUsers = async (req: Request, res:Response ) => {
//     //Just to test
//     // console.log("fetching all the users...")
//     // res.json(users)

//     // Fetch data from database 
//     // Find all users
//     try{
//         const users = await prisma.user.findMany();
//         res.status(200).json(users);
//     }
//     catch(error){
//         console.error("Error fetching users:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }

// }
    // Returns a specific user
export const fetchUserLogin = async (req: Request, res:Response): Promise<any> => {
    try{
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if(!user || !bcrypt.compareSync(password, user.password)){
            return res.status(401).json({error: "Invalid email or password"})
        }

        // JWY token creation
        const token = jwt.sign(
            { userId: user.id }, 
            process.env.JWT_SECRET as string, 
            {expiresIn: "1h"}
        );

         res.json({message: "Login successful", token})
    }
    catch(error){
        console.error("Error fetching user:", error);
         res.status(500).json({ error: "Internal Server Erro" });
    }
}

// export const fetchUserLogin = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { email, password } = req.body;

//         const user = await prisma.user.findUnique({
//             where: { email }
//         });

//         if (!user || !bcrypt.compareSync(password, user.password)) {
//             res.status(401).json({ error: "Invalid email or password" });
//             return; 
//         }

//         // JWT token creation
//         const token = jwt.sign(
//             { userId: user.id, role: user.role }, 
//             process.env.JWT_SECRET as string, 
//             { expiresIn: "1h" }
//         );

//         res.json({ message: "Login success", token });
//     } catch (error) {
//         console.error("Error fetching user:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };



// redo
// UPDATE
// export const updateAllUser = async (req: Request, res:Response) => {
    
//     const {id, firstname, lastname, email, password, role, tasks} = req.body;
//     const hasedPassword = await bcrypt.hashSync(password, 8);

//     try{
//         // Send in updated info
//        const updatedUser = await prisma.user.update({
//             where: {
//                 id: Number(id)
//             },
//             data: {
//                 // DB_Value : requested_Value
//                 username: firstname + lastname,
//                 email,
//                 password: hasedPassword,
//                 role,
//                 tasks: tasks ? { connect: tasks.map((taskId: string) => ({ id: taskId}))}: undefined

//             }
//         });
//         res.status(200).json({message: "user updated success", updatedUser})
//     }
//     catch(error){
//         console.error("Error updating user:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }   
// }
// export const updateUser = async (req: Request, res:Response) => {
    
//     const {id, firstname, lastname, email, password, role, tasks} = req.body;
//     const hasedPassword = await bcrypt.hashSync(password, 8);

//     try{
//         // Send in updated info
//        const updatedUser = await prisma.user.update({
//             where: {
//                 id: Number(id)
//             },
//             data: {
//                 // DB_Value : requested_Value
//                 username: firstname + lastname,
//                 email,
//                 password: hasedPassword,
//                 role,
//                 tasks: tasks ? { connect: tasks.map((taskId: string) => ({ id: taskId}))}: undefined

//             }
//         });
//         res.status(200).json({message: "user updated success", updatedUser})
//     }
//     catch(error){
//         console.error("Error updating user:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }   
// }

// // DELETE
// export const deleteUser = async (req: Request, res:Response) => {
//     // Find user by id
//     const {id} = req.params;
//     try{
//         // Remove data from database
//         const deletedUser = await prisma.user.delete({
//             where: {
//             id: Number(id),
//             },
//         });
//         res.status(200).json({messsage: "User deleted success", deletedUser})
//     }
//     catch(error){
//         console.error("Error deleting user:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }

// }
