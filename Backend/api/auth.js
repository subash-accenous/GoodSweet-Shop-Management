import jwt from "jsonwebtoken";
import User from "./models/user.js";
import bcrypt from "bcrypt";

// REGISTER
app.post("/api/auth/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: "User registered" });
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});
