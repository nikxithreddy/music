// auth.server.js
// Use this INSTEAD of your current auth.js when running with the backend.
// Either rename this file to auth.js or update your HTML to include this one.

const API = "http://localhost:3000";

// Register
const regForm = document.getElementById("registerForm");
if (regForm) {
  regForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const pass = document.getElementById("regPassword").value.trim();
    const confirm = document.getElementById("regConfirm").value.trim();

    if (pass !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      alert(data.message);
      window.location.href = "index.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPassword").value.trim();

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      alert(`Welcome, ${data.user.name}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      window.location.href = "MUSIC.html";
    } catch (err) {
      alert(err.message);
    }
  });
}
