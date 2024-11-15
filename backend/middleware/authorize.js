const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.userDetails) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userRole = req.userDetails.role; 
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