import List from "@/models/listSchema";

export default async function handler(req, res) {
    const { _id } = JSON.parse(req.body);
    try {
        const response = await List.findByIdAndDelete(_id)
        res.status(200).json({ message: "Dashboard column deleted." })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete dashboard column." })
    }
}