// Updated script.js to include priority selection functionality, priority filtering, and manage tasks based on priority levels

const tasks = [];

function addTask(taskName, priority) {
    const task = {
        name: taskName,
        priority: priority,
        createdAt: new Date()
    };
    tasks.push(task);
}

function filterTasksByPriority(priority) {
    return tasks.filter(task => task.priority === priority);
}

function displayTasks() {
    tasks.sort((a, b) => a.priority - b.priority);
    tasks.forEach(task => {
        console.log(`[${task.priority}] ${task.name}`);
    });
}

// Sample usage
addTask('Complete project report', 2);
addTask('Pay bills', 1);
addTask('Do laundry', 3);

console.log('All tasks: ');
displayTasks();

console.log('Filtered tasks (priority 1): ');
console.log(filterTasksByPriority(1));