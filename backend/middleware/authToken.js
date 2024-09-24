import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(200).json({
        message: "Uner Not Login",
        error: true,
        success: false,
      });
    }
    jwt.verify(token, process.env.TOKEN_SECREATE_KEY, function (err, decoded) {
      if (err) {
        console.log("error auth", err);
      }
      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    console.error(err); // Log the error to console for debugging
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
};
