import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    assignee: {
        type: String
    },
    assignTo: {
        type: String
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String
    }
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;