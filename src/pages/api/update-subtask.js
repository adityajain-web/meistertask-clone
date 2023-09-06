import List from "@/models/listSchema";
import connectDB from "@/config/db";

export default async function handler(req, res) {
    const { listId, taskId, subId } = JSON.parse(req.body);

    try {
        await connectDB();

        const list = await List.findById(listId);

        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }

        const task = list.tasks.find(task => task._id.toString() === taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const subtask = task.subtasks.find(subtask => subtask._id.toString() === subId);

        if (!subtask) {
            return res.status(404).json({ message: "Subtask not found" });
        }

        subtask.done = !subtask.done;

        await list.save();

        return res.status(200).json({ message: "Subtask status toggled successfully", list });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
