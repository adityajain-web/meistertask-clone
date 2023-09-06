import mongoose from "mongoose";
import connectDB from "@/config/db";
import List from "@/models/listSchema";

export default async function handler(req, res) {
    const { listId, taskId } = JSON.parse(req.body);
    await connectDB();

    try {
        if (!mongoose.Types.ObjectId.isValid(listId) || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: "Invalid listId or taskId" });
        }

        const list = await List.findById(listId);

        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }

        const taskIndex = list.tasks.findIndex(task => task._id.equals(taskId));

        if (taskIndex === -1) {
            return res.status(404).json({ message: "Task not found" });
        }

        list.tasks.splice(taskIndex, 1); // Remove the task from the tasks array

        await list.save();

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
