const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
    // Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request object
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

module.exports = { jwtAuthMiddleware };
