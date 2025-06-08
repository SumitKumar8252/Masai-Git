//DOM elements
const taskInput= document.getElementById('taskInput')
const addTaskBtn= document.getElementById('addTask')
const taskList= document.getElementById('taskList')
const showAllTaskButton= document.getElementById('showAllTasks')
const showCompletedTasksBtn= document.getElementById('showCompletedTasks')
const showIncompleteTasksBtn= document.getElementById('showIncompleteTasks')

//Array to store tasks
let tasks= [];

//Add a new task when the button is clicked
addTaskBtn.addEventListener('click', ()=>{
    const taskText= taskInput.value.trim();

    if(taskText !== ""){
        const newTask= {text: taskText, completed: false};
        tasks.push(newTask);
        renderTasks(tasks);
        taskInput.value= "";  //clear the input field
    }
});

//function to render tasks to the DOM
function renderTasks(taskArray){
    //clear the current task list
    taskList.innerHTML= "";

    //use map()to create a list item for each task 
    taskArray.map((task, index)=>{
        const li= document.createElement('li')
        li.className= 'task-item';

        //Task content with dynamic class for completed tasks
        li.innerHTML=`
            <span class="${task.completed ? 'completed': ''}">${task.text}</span>
            <button onclick="toggleTask(${index})">Toggle</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        //Append the task tot the DOM
        taskList.appendChild(li);
    });
}

//Toggle the completed status of a task
function toggleTask(index){
    tasks[index].completed= !tasks[index].completed;
    renderTasks(tasks);
}

//Delete a task from the list
function deleteTask(index){
    tasks.splice(index,1)
    renderTasks(tasks);
}

//filter and display completed tasks
showCompletedTasksBtn.addEventListener('click', ()=>{
    const completeTasks= tasks.filter(task=> task.completed)
    renderTasks(completeTasks);
});

//Filter and display incomplete tasks
showIncompleteTasksBtn.addEventListener('click', ()=>{
    const incompleteTaks= tasks.filter(task=> !task.completed)
    renderTasks(incompleteTaks)
});

//Display all tasks
showAllTaskButton.addEventListener('click', ()=>{
    renderTasks(tasks)
});