const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Register route with username + email
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) return res.status(400).json({ error: "User already exists" });

  const newUser = await User.create({ username, email, password });
  res.status(201).json({ message: "Registered successfully", user: newUser });
});

// ✅ Login using username OR email
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // ← must match `email`
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, "secretkey");
  res.json({ token, username: user.username, userId: user._id }); // ✅ Include userId if needed
});


module.exports = router;
