import express from 'express'
import { insertTask, getAllTask, deleteTask, updateStatus } from '../controller/taskOps.js'



export const taskRoutes = express.Router();

taskRoutes.post('/insertTask', insertTask);
taskRoutes.get('/getAllTask', getAllTask);
taskRoutes.delete("/deleteTask/:id", deleteTask);
taskRoutes.post("/statusTask/:id", updateStatus);