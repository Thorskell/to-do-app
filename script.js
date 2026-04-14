const input = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const list = document.getElementById("task-list");
const counter = document.getElementById("task-counter");
const themeBtn = document.getElementById("toggle-theme");
const filterBtns = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

/* ---------- Utils ---------- */
const saveTasks = () =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

const updateCounter = () => {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  counter.textContent = `Total: ${total} • Concluídas: ${done} • Pendentes: ${total - done}`;
};

/* ---------- Render ---------- */
function renderTasks() {
  list.innerHTML = "";

  const filtered = tasks.filter(t => {
    if (currentFilter === "completed") return t.completed;
    if (currentFilter === "pending") return !t.completed;
    return true;
  });

  filtered
    .sort((a, b) => a.priority.localeCompare(b.priority))
    .forEach(task => list.appendChild(createTaskElement(task)));

  updateCounter();
}

/* ---------- Task Element ---------- */
function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = `task ${task.priority} ${task.completed ? "completed" : ""}`;

  const span = document.createElement("span");
  span.textContent = task.text;
  span.contentEditable = true;

  span.addEventListener("blur", () => {
    task.text = span.textContent.trim();
    saveTasks();
  });

  const doneBtn = document.createElement("button");
  doneBtn.innerHTML = `<i class="fas fa-check"></i>`;
  doneBtn.onclick = () => {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteBtn.onclick = () => {
    if (confirm("Deseja excluir esta tarefa?")) {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    }
  };

  li.append(span, doneBtn, deleteBtn);
  return li;
}

/* ---------- Add Task ---------- */
function addTask() {
  const text = input.value.trim();
  if (!text) return alert("Digite uma tarefa.");
  if (tasks.some(t => t.text === text)) return alert("Tarefa duplicada!");

  tasks.push({
    id: crypto.randomUUID(),
    text,
    priority: prioritySelect.value,
    completed: false
  });

  saveTasks();
  input.value = "";
  renderTasks();
}

document.getElementById("add-task").addEventListener("click", addTask);
input.addEventListener("keydown", e => e.key === "Enter" && addTask());

/* ---------- Filters ---------- */
filterBtns.forEach(btn => {
  btn.onclick = () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  };
});

/* ---------- Theme ---------- */
themeBtn.onclick = () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
};

/* ---------- Init ---------- */
renderTasks();
