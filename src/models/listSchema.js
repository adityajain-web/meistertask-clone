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
    },
    userId: {
        type: String
    }
});

const listSchema = new mongoose.Schema({
    listName: {
        type: String,
    },
    tasks: []
});

const List = mongoose.models.List || mongoose.model("List", listSchema);

export default List;
