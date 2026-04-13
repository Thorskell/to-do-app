let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function displayTasks(filter = 'all') {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.name;

        if (task.completed) {
            taskItem.style.textDecoration = 'line-through';
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => toggleTaskCompletion(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

function addTask(taskName) {
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        saveTasks();
        displayTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function filterTasks(filter) {
    displayTasks(filter);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Example usage:
// addTask("New Task");
// filterTasks("completed");
