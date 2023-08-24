import List from "@/models/listSchema"

export default async function handler(req, res) {
    const { newTaskData } = JSON.parse(req.body)

    try {
        const response = await List.findOneAndUpdate({ _id: newTaskData.listId }, { $push: { tasks: newTaskData } }, { new: true }).then(updatedList => {
            if (updatedList) {
                res.status(200).json({ message: 'Task added suucessfully.' })
            } else {
                res.status(400).json({ message: "List not found." })
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to create task." })
    }
}