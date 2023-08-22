import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    const token = JSON.parse(req.body)
    try {
        const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
        res.status(200).json(decodedToken)
    } catch (error) {
        res.status(500).json({ message: "Error occurred while fetching token data." })
    }
}