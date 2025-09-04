// auth.js

// Try to load users from localStorage or JSON file
let users = JSON.parse(localStorage.getItem("users")) || [];

// Register form
const regForm = document.getElementById("registerForm");
if (regForm) {
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const pass = document.getElementById("regPassword").value.trim();
    const confirm = document.getElementById("regConfirm").value.trim();

    if (pass !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    // Check if already registered
    if (users.some(u => u.email === email)) {
      alert("Email already registered!");
      return;
    }

    // Save new user
    const newUser = { name, email, password: pass };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    window.location.href = "index.html"; // Go to login
  });
}

// Login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPassword").value.trim();

    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      alert(`Welcome, ${user.name}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "MUSIC.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
}
