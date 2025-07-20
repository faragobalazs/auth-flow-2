const getUserProfile = (req, res) => {
  try {
    // The user object is added by the auth middleware
    const { userId, email } = req.user;

    res.json({
      message: "User profile retrieved successfully",
      user: {
        userId,
        email,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({ error: "Failed to get user profile" });
  }
};

module.exports = {
  getUserProfile,
};
