const taskInput = document.querySelector("#task_input");
const taskList = document.getElementById("list-task");
const enterButton = document.getElementById("submitButton");
let tasks = [];

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded',()=>{
        tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        createHtml();
    })
    taskList.addEventListener("click", deleteTask)
}

function deleteTask(e){
    if(e.target.tagName === 'I' && e.target.classList.contains("fa-circle-xmark") ){
        const deleteId = parseInt(e.target.getAttribute("task-id"));
        tasks = tasks.filter(task => task.id !== deleteId);
        console.log(tasks);
        createHtml();
    }
}

enterButton.addEventListener("click",() =>{
    let task = taskInput.value;
    if(task === ""){
        showError("The field is empty!")
        return;
    }
    const taskObj = {
        task,
        id: Date.now()
    }
    tasks = [...tasks, taskObj]
    createHtml();

    taskInput.value=("");
})

function createHtml() {
    clearHtml();
    if(tasks.length > 0){
        tasks.forEach(task =>{
            const li = document.createElement("li");
            li.classList.add("task");
            li.innerHTML = `${task.task}<span class="buttons-task"
            ><span><i class="fa-solid fa-pencil"></i></span
            ><span><i task-id="${task.id}" class="fa-solid fa-circle-xmark"></i></span
          ></span>`
            taskList.appendChild(li);
        })
    }

    sincronizationStorage();
}

function sincronizationStorage() {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function showError(error){
    const messageError = document.createElement("p");
    messageError.textContent = error;
    messageError.classList.add("error");
    const containerInput = document.querySelector(".container-input")
    containerInput.appendChild(messageError);
    setTimeout(() => {
        messageError.remove();
    },1000);
    
}

function clearHtml() {
    taskList.innerHTML= "";
}