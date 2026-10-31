
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;

    const taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now(),
        name: taskName,
        priority: priority,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    const search = document.getElementById("searchInput").value.toLowerCase();

    list.innerHTML = "";

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(search)
    );

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        const info = document.createElement("div");
        info.className = "task-info";

        const name = document.createElement("span");
        name.textContent = task.name;

        if (task.completed) {
            name.className = "completed";
        }

        const priority = document.createElement("div");
        priority.className = "priority";
        priority.textContent = "Priority: " + task.priority;

        info.append(name, priority);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(task.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        li.append(checkbox, info, deleteButton);
        list.appendChild(li);
    });

    document.getElementById("totalTasks").textContent = tasks.length;

    document.getElementById("completedTasks").textContent =
        tasks.filter(task => task.completed).length;

    document.getElementById("pendingTasks").textContent =
        tasks.filter(task => !task.completed).length;
}

renderTasks();
