import List from '../../models/listSchema'

export default async function handler(req, res) {
    try {
        const response = await List.find()
        res.status(200).json({ column: response })
    } catch (error) {
        res.status(500).json({ message: "Failed fetch dashboard column." })
    }
}