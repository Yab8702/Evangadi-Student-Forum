import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ msg: "No authentication token, authorization denied" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const { userid, username } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userid, username };
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
