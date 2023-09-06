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

const subtaskSchema = new mongoose.Schema({
    task: String,
    done: Boolean
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
        type: Number,
        set: function (date) {
            return new Date(date).getTime();
        },
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
    },
    subtasks: [subtaskSchema]
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
