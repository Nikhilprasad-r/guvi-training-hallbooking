import { verifyToken } from "../utils/jwt.js";

// Protect middleware
const protect = (req, res, next) => {
  const token = req.cookies?.authtoken;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = verifyToken(token);
    req.user = decoded.id; // Store the decoded user ID in req.user for future middleware access
    console.log("Token successfully verified. User ID:", req.user);
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protect;
