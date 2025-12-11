// SIGNUP
export function signupUser(username, password) {
  const user = { username, password };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Signup successful!");
}

// LOGIN
export function loginUser(username, password) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return alert("No user found! Please signup first.");

  if (user.username === username && user.password === password) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "todos.html";
  } else {
    alert("Invalid credentials!");
  }
}

// CHECK LOGIN
export function checkLogin() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    alert("Please login first.");
    window.location.href = "login.html";
  }
}
