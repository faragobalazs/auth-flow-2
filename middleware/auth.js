import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get the signed cookie
    const accessToken = req.signedCookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        error: "Access denied. No token provided.",
      });
    }

    // Verify the JWT token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // Add user info to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Invalid token.",
      });
    }

    console.error("Auth middleware error:", error);
    return res.status(500).json({
      error: "Authentication error.",
    });
  }
};

export default authMiddleware;
