import List from "@/models/listSchema";
import connectDB from "@/config/db";

export default async function handler(req, res) {
    const { listId, taskId, subTask } = JSON.parse(req.body);
    try {
        await connectDB();
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }

        const task = list.tasks.id(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.subtasks.push(subTask);
        await list.save();

        return res.status(200).json({ message: "success" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
}
