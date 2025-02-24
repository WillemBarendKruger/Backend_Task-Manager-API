// -------------Imports
import { error } from "console";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//CREATE
export const createTask = async (req: Request, res: Response) => {
    try {
        const { taskName, status } = req.body;
        const { userId } = (req as any).user;

        const task = await prisma.task.create({
            data: {
                taskName,
                status,
                userId
            }
        });
        res.status(201).json({ message: "Task created successfully", task})
        
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//READ
// GET ALL TASKS
export const getTasks = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        const tasks = await prisma.task.findMany({
            where: {
                userId
            }
        })

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//UPDATE
export const updateTaskStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const { userId } = (req as any).user;

        const task = await prisma.task.findUnique({
            where: {
                id
            }
        });

        if(!task || task.userId !== userId){
            return res.status(403).json({ error: "Unauthorized"})
        };

        const updatedTask = await prisma.task.update({
            where: {
                id
            },
            data: {
                status
            }
        })

        res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// export const assignTaskToUser = async (req: Request, res: Response) => {
//     try{
//         const {userId, taskId } = req.body;
//         const { role } = req.user;

//         if(role !=="manager"){
//             return res.status(403).json({error: "Unauthorized"})
//         }

//         const updatedTask = await prisma.task.update({
//             where: {
//                 id: taskId
//             },
//             data: {
//                 assignedTo: userId
//             },
//         });
//         res.status(200).json({message: "Task assigned success", updatedTask})
//     }
//     catch(error){
//         res.status(500).json({error: "Internal Server Error"})
//     }
// };

//DELETE
export const deleteTask = async (req:Request, res:Response): Promise<any> => {
    try{
        const { id } = req.params;
        const { userId } = (req as any).user;

        const task = await prisma.task.findUnique({
            where: {
                id
            }
        });
        if(!task || task.userId !== userId){
            return res.status(403).json({ error: "Unauthorized"})
        }

        await prisma.task.delete({
            where: {
                id
            }
        });
        res.json({ message: "Task deleted successfully"})
    }
    catch(error){
        res.status(500).json({ error: "Internal Server Error"})
    }
}