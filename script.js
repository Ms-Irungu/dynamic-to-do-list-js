// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select the DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without saving duplicates
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(item => item.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // If no taskText is provided (manual call), get and trim the task input value
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // If the input is empty, alert the user and exit the function
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item element
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");
        // removeButton.className = "remove-btn";

        // Add an event listener to the remove button
        removeButton.addEventListener("click", function () {
            taskList.removeChild(listItem); // Remove the task from the list
            saveTasks(); // Update Local Storage
        });

        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        // Append the list item to the task list
        taskList.appendChild(listItem);
        // Clear the task input field
        taskInput.value = "";

        // Save the task to Local Storage if required
        if (save) {
            saveTasks();
        }
    }

    // Add a click event listener to the "Add Task" button
    addButton.addEventListener('click', function () {
        addTask(); // Call addTask with no arguments (taskText will be taken from input)
    });
    // Add a keypress event listener to allow adding tasks using the Enter key
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask(); // Call the addTask function
        }
    });
    // Load tasks from Local Storage on page load
    loadTasks();
});