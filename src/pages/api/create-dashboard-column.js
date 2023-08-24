import List from "@/models/listSchema";
import connectDB from "@/config/db";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        await connectDB();

        const { listName, listColor } = JSON.parse(req.body);

        const newList = new List({ listName, listColor });

        await newList.save();

        res.status(201).json({ message: "Created Successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add list." });
    }
}
