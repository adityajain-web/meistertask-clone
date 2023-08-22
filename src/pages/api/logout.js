export default async function handler(req, res) {
    try {
        res.setHeader("Set-Cookie", "auth-token=; Max-Age=0; Path=/");
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        res.status(500).json({ message: 'Logout failed' });
    }
}
