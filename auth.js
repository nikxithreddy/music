document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      alert(`Login attempt with:\nEmail: ${email}\nPassword: ${password}`);
      // TODO: Replace alert with actual login handling
      window.location.href = "index.html"; // redirect to music player
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pass = document.getElementById("regPassword").value;
      const confirm = document.getElementById("regConfirm").value;

      if (pass !== confirm) {
        alert("Passwords do not match!");
        return;
      }

      alert("Registration successful!");
      window.location.href = "login.html"; // redirect to login
    });
  }
});
