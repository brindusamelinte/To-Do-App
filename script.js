
const $taskName = document.querySelector('#task-name');
const $taskButton = document.querySelector('#button-addtask');
const $taskList = document.querySelector('#task-list');

let tasksArray = [];
let localStorageTasks = JSON.parse(localStorage.getItem('taskName'));

window.addEventListener('load', event => {
    event.preventDefault();
    
    localStorageTasks.forEach(task => {
        const groupDiv = document.createElement('div');
        groupDiv.setAttribute('class', 'input-group mb-2');

        const checkboxDiv = document.createElement('div');
        checkboxDiv.setAttribute('class', 'input-group-text')

        const checkboxInput = document.createElement('input');
        checkboxInput.setAttribute('type', 'checkbox');
        checkboxInput.setAttribute('name', 'checkbox-input')
        checkboxInput.setAttribute('value', '');
        checkboxInput.setAttribute('class', 'form-check-input');
        checkboxInput.setAttribute('aria-label', 'Checkbox for following task');

        checkboxDiv.appendChild(checkboxInput);

        const taskInput = document.createElement('input');
        taskInput.setAttribute('type', 'text');
        taskInput.setAttribute('name', 'task-text');
        taskInput.setAttribute('value', task);
        taskInput.setAttribute('class', 'form-control');
        taskInput.setAttribute('aria-label', 'Task text with checkbox');

        groupDiv.appendChild(checkboxDiv);
        groupDiv.appendChild(taskInput);

        $taskList.appendChild(groupDiv);

        checkboxInput.addEventListener('click', event => {
            event.preventDefault();
    
            let taskRemoved = groupDiv.lastElementChild.value;
            let taskRemovedIndex = tasksArray.indexOf(taskRemoved); 
          
            if(taskRemovedIndex !== -1) {
                tasksArray.splice(taskRemovedIndex, 1);
            }
    
            localStorage.setItem(`taskName`, JSON.stringify(tasksArray));
    
            groupDiv.setAttribute('class', 'd-none'); 
        });
    }); 

    tasksArray = localStorageTasks;
});


$taskButton.addEventListener('click', event => {
    event.preventDefault();

    let taskNameValue = $taskName.value;

    const groupDiv = document.createElement('div');
    groupDiv.setAttribute('class', 'input-group mb-2');

    const checkboxDiv = document.createElement('div');
    checkboxDiv.setAttribute('class', 'input-group-text')

    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.setAttribute('name', 'checkbox-input')
    checkboxInput.setAttribute('value', '');
    checkboxInput.setAttribute('class', 'form-check-input');
    checkboxInput.setAttribute('aria-label', 'Checkbox for following task');

    checkboxDiv.appendChild(checkboxInput);

    const taskInput = document.createElement('input');
    taskInput.setAttribute('type', 'text');
    taskInput.setAttribute('name', 'task-text');
    taskInput.setAttribute('value', taskNameValue);
    taskInput.setAttribute('class', 'form-control');
    taskInput.setAttribute('aria-label', 'Task text with checkbox');

    groupDiv.appendChild(checkboxDiv);
    groupDiv.appendChild(taskInput);

    $taskList.appendChild(groupDiv);

    tasksArray.push(taskNameValue);
    
    localStorage.setItem(`taskName`, JSON.stringify(tasksArray));

    $taskName.value = ''

    checkboxInput.addEventListener('click', event => {
        event.preventDefault();

        let taskRemoved = groupDiv.lastElementChild.value;
        let taskRemovedIndex = tasksArray.indexOf(taskRemoved); 
      
        if(taskRemovedIndex !== -1) {
            tasksArray.splice(taskRemovedIndex, 1);
        }

        localStorage.setItem(`taskName`, JSON.stringify(tasksArray));

        groupDiv.setAttribute('class', 'd-none'); 
    });

});


