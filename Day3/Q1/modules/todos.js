import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { displayTodos } from "./displayTodos.js";
import { checkLogin } from "./auth.js";

// Check if user is logged in
checkLogin();

// Inject UI components
document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

// Fetch todos
async function loadTodos() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();
    displayTodos(data);
  } catch (err) {
    console.log(err);
  }
}

loadTodos();
