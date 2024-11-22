import { verifyToken } from "../utils/jwt.js";
 import User from "../models/mysql/User.js";

// Protect middleware
const protect = async (req, res, next) => {
  const token = req.cookies?.authtoken;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    
    const decoded = verifyToken(token);
    req.user = decoded.id;
    // const user = await User.findById(req.user.id);
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.userDetails = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};
export default protect;
