import User from "../models/User.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { username, email, firstname, lastname, password } = req.body;
  if (!username || !email || !firstname || !lastname || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    if (await User.findOne({ username })) {
      return res.status(400).json({ msg: "Username already taken" });
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "Email already taken" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const user = await User.create({
      username,
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });
    user.password = undefined;
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "no user found" });
    }
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userid: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const checkUser = async (req, res) => {
  res.status(200).json(req.user || {});
};
