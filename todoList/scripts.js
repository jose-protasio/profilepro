function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
    
    var newTask = document.createElement("li");
    newTask.innerText = taskInput.value;
    
    taskList.appendChild(newTask);
    
    taskInput.value = "";

    var form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
    event.preventDefault();
    addTask();
});
  }

 