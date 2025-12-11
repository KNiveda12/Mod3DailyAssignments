export function displayTodos(data) {
  const container = document.getElementById("todos-container");
  container.innerHTML = "";

  data.forEach(todo => {
    let div = document.createElement("div");
    div.style.border = "1px solid #aaa";
    div.style.padding = "10px";
    div.style.margin = "10px 0";
    div.innerHTML = `
      <h3>${todo.title}</h3>
      <p>Status: <strong>${todo.completed ? "Completed" : "Pending"}</strong></p>
    `;
    container.appendChild(div);
  });
}
