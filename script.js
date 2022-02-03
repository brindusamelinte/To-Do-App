
const $taskName = document.querySelector('#task-name');
const $taskButton = document.querySelector('#button-addtask');
const $taskList = document.querySelector('#task-list');
const $tasksLabel = document.querySelector('#tasks-label');

let tasksArray = [];
let localStorageTasks = JSON.parse(localStorage.getItem('taskName'));

if(localStorageTasks === null || localStorageTasks.length === 0) {
    $tasksLabel.textContent = 'There is nothing to do for the moment.';
} 

function renderTask(task) {
    const groupDiv = document.createElement('div');
    groupDiv.setAttribute('class', 'input-group mb-2');
    groupDiv.setAttribute('draggable', true);

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

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('class', 'input-group-text');

    const iconButton = document.createElement('i');
    iconButton.setAttribute('class', 'bi bi-trash');

    deleteButton.appendChild(iconButton);

    groupDiv.appendChild(checkboxDiv);
    groupDiv.appendChild(taskInput);
    groupDiv.appendChild(deleteButton);

    $taskList.appendChild(groupDiv);

    return [checkboxInput, taskInput, groupDiv];
};

function checkboxInputEvent(checkboxInput, taskInput, groupDiv) {
    checkboxInput.addEventListener('click', event => {
        event.preventDefault();

        let taskRemoved = taskInput.value;

        let taskRemovedIndex = tasksArray.indexOf(taskRemoved); 

        if(taskRemovedIndex !== -1) {
            tasksArray.splice(taskRemovedIndex, 1);
        }

        localStorage.setItem(`taskName`, JSON.stringify(tasksArray));

        groupDiv.setAttribute('class', 'd-none'); 
    }); 
};

window.addEventListener('load', event => {
    event.preventDefault();
    
    if(localStorageTasks !== null) {
        localStorageTasks.forEach(task => {
            const [checkboxInput, taskInput, groupDiv] = renderTask(task);
    
            checkboxInputEvent(checkboxInput, taskInput, groupDiv);
        }); 

        tasksArray = localStorageTasks;
    }
   
    let divsInputGroup = document.querySelectorAll('#task-list div.input-group');

    divsInputGroup.forEach((div,i) => {
        div.setAttribute('id', i);

        div.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text', event.target.id);
        });
    });

    $taskList.addEventListener('dragover', event => {
        event.preventDefault();
    });

    $taskList.addEventListener('drop', event => {
        event.preventDefault();

        let droptTask = event.dataTransfer.getData('text');
        event.target.appendChild(document.getElementById(droptTask)); 
    });
});


$taskName.addEventListener('keyup', event => {
    if(event.keyCode === 13) {
        event.preventDefault();
        $taskButton.click();
    }
    $tasksLabel.textContent = 'My Tasks:';
});

$taskButton.addEventListener('click', event => {
    event.preventDefault();

    let taskNameValue = $taskName.value;

    const [checkboxInput, taskInput, groupDiv] = renderTask(taskNameValue);

    tasksArray.push(taskNameValue);
    
    localStorage.setItem(`taskName`, JSON.stringify(tasksArray));

    $taskName.value = ''

    checkboxInputEvent(checkboxInput, taskInput, groupDiv);
});

