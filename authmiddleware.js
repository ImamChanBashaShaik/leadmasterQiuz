const jwt = require("jsonwebtoken");

function authmiddleware(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Make sure JWT_SECRET is set in .env
    req.user = verified; // attach user payload to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = authmiddleware;
