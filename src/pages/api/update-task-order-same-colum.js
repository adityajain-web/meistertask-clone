import List from '@/models/listSchema';
import connectDB from '@/config/db';

export default async function handler(req, res) {

    await connectDB()

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { updatedColumns } = JSON.parse(req.body);

        for (const column of updatedColumns) {
            const updatedList = await List.findByIdAndUpdate(
                column._id,
                { tasks: column.tasks },
                { new: true }
            );
        }

        res.status(200).json({ message: 'Task order updated successfully' });
    } catch (error) {
        console.error('Error updating task order:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
