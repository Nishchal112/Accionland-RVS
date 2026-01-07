exports.managerOnly = (req, res, next) => {
  if (req.user.userType !== "manager") {
    return res.status(403).json({
      message: "Access denied. Manager only.",
    });
  }
  next();
};
