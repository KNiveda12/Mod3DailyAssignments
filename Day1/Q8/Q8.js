const key = "todos";

    async function fetchTodos() {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        return data.slice(0, 20);
    }
    function saveTodos(todos) {
        localStorage.setItem(key, JSON.stringify(todos));
    }
        
    
    function loadTodos() {
        const raw = localStorage.getItem(key);
        if (!raw) return [];        
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    }
    function renderTodos() {
        const grid = document.getElementById("grid");
        const todos = loadTodos();
        grid.innerHTML = "";
        if(todos.length === 0) {
            grid.innerHTML = `<p>No Todos Available</p>`;
            return;
        }
        todos.forEach(todo => {
            const div = document.createElement("div");
            div.className = `todo ${todo.completed ? "completed" : ""}`;
            div.innerHTML = `
            <span class="title">${todo.title}</span>
            <div>
                <button onclick="toggleTodo(${todo.id})">${todo.completed ? "Undo" : "Complete"}</button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            </div>`;
            grid.appendChild(div);
        });
    
    }
    function deleteTodo(id) {
        const todos = loadTodos().filter(todo => todo.id !== id);
        saveTodos(todos);
        renderTodos();
    }
    function toggleTodo(id) {
        const todos = loadTodos().map(todo => {
            if(todo.id === id) todo.completed = !todo.completed;
            return todo;
        });
        saveTodos(todos);
        renderTodos();
    }

async function init() {
  const stored = loadTodos();

  if (stored.length === 0) {  
    const todos = await fetchTodos();
    saveTodos(todos);
  }
  renderTodos();
}

init();