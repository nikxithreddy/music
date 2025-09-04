// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, "users.json");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve your HTML/CSS/JS files

// Ensure users.json exists
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
}

// Register endpoint
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const raw = fs.readFileSync(USERS_FILE, "utf8");
  let data = JSON.parse(raw || "{\"users\":[]}");

  if (data.users.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email already registered" });
  }

  data.users.push({ name, email, password });
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));

  res.json({ message: "Registration successful" });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const raw = fs.readFileSync(USERS_FILE, "utf8");
  let data = JSON.parse(raw || "{\"users\":[]}");

  const user = data.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", user });
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
