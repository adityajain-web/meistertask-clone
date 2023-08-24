import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
    base64: String,
    file: {
        lastModified: Number,
        lastModifiedDate: Date,
        name: String,
        size: Number,
        type: String,
        webkitRelativePath: String
    },
    name: String,
    size: String,
    type: String
});

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    assignTo: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    attachment: [attachmentSchema],
    description: {
        type: String,
    },
    assignBy: {
        type: String,
    },
    listId: {
        type: String
    }
});

const listSchema = new mongoose.Schema({
    listName: {
        type: String,
    },
    listColor: {
        type: String
    },
    tasks: [taskSchema]
});

const List = mongoose.models.List || mongoose.model("List", listSchema);

export default List;
