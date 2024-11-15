// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userRole = req.user.role; // Assuming `role` is a property in your JWT payload
    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }

    console.log(`User with role "${userRole}" authorized.`);
    next();
  };
};
export default authorize;