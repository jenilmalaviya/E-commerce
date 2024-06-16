export const userLogoutcontroller = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      message: "User logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    console.error(err); // Log the error to console for debugging
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
