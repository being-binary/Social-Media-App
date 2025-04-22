import jwt from "jsonwebtoken";

const checkToken = async (req, res, next) => {
    let token = req.headers.authorization;

    // Ensure token exists and is a string before processing
    if (!token || typeof token !== "string") {
        return res.status(401).json({ msg: "Unauthorized, no token provided", success: false });
    }

    try {
        // If token starts with "Bearer ", remove it
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // Ensure token contains a valid user ID
        if (!decoded || !decoded._id) {
            return res.status(403).json({ msg: "Invalid token", success: false });
        }   
        
        req.id = decoded._id; // Attach user ID to request
        next(); // Proceed to the next middleware

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Token has expired", success: false });
        }
        return res.status(403).json({ msg: "Invalid token", success: false, error: error.message });
    }
};

export default checkToken;
