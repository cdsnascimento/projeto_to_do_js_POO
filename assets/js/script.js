class Task {
    constructor(status, nome) {
        this.status = status;
        this.nome = nome;
    }
}

class ToDo {
    constructor() {
        this.totalTasks = document.querySelectorAll('.task').length;
    }

    addTask() {

        // adicionar tarefa no LocalStorage
        this.addLocalStorage();
    }

    defineTask(taskText, status=false) {
        let list = document.querySelector('#tasks-container');

        list.appendChild(this.createTemplateTask(taskText, status));

        this.addEvents();

        this.checkTasks('add');
    }

    createTemplateTask(text, status=false) {

        let taskTamplate = document.createElement('div');
        taskTamplate.classList.add('task');

        let taskCheck = document.createElement('i');
        taskCheck.classList.add('bi');
        taskCheck.classList.add('bi-check2-circle');

        if (status) {
            taskCheck.classList.add('done');
        }

        let taskTitle = document.createElement('span');
        taskTitle.classList.add('task-title');
        taskTitle.innerText = text;
        
        let taskTrash = document.createElement('i');
        taskTrash.classList.add('bi');
        taskTrash.classList.add('bi-trash');

        taskTamplate.appendChild(taskCheck);
        taskTamplate.appendChild(taskTitle);
        taskTamplate.appendChild(taskTrash);

        return taskTamplate;

    }

    removeTask(task) {
        let parentEl = task.parentElement;
        parentEl.remove();
        this.checkTasks('remove');
        this.addLocalStorage();
    }

    completeTask(task) {
        //adiciona a classe de done
        task.classList.add('done');
        this.addLocalStorage();
    }

    toggleCompleteTask(task) {
        
        if (task.classList.contains('done')) {
            task.classList.remove('done');
        } else {
            task.classList.add('done');
        }

        this.addLocalStorage();
    }

    addEvents() {
        let removeBtns = document.querySelectorAll('.bi-trash');
        let removeBtn = removeBtns[removeBtns.length - 1];

        let doneBtns = document.querySelectorAll('.bi-check2-circle');
        let doneBtn = doneBtns[doneBtns.length - 1]

        //adicionar o evento de remover
        removeBtn.addEventListener('click', function() {
            todo.removeTask(this);
        });

        //adicionar evento de completar tarefa
        doneBtn.addEventListener('click', function() {
            todo.toggleCompleteTask(this);
        });
    }

    checkTasks(command) {
        let msg = document.querySelector('#empty-tasks');

        if (command === 'add') {
            this.totalTasks += 1;
        } else if (command === 'remove') {
            this.totalTasks -= 1;
        }

        // checa se tem mais de uma task e adiciona ou remove a classe
        if (this.totalTasks == 0) {
            msg.classList.remove('hide');
        } else {
            msg.classList.add('hide');

        }
    }


    addLocalStorage(){
        const allTasks = document.querySelectorAll('.task-title');
        const myTaskList = [];
        let task = new Task();
        let status;
        let nome;
        let myCheck;

        allTasks.forEach(t => {
            
            myCheck = t.previousElementSibling;
            myCheck.classList.contains('done');

            status = myCheck.classList.contains('done');           
            nome = t.innerText.trim();

            myTaskList.push({nome, status});
        });

        const tJSON = JSON.stringify(myTaskList)
        
        localStorage.setItem('MyTasks', tJSON);

    }

    returnTaskList() {
        const taskList = localStorage.getItem('MyTasks');
        const tasks = JSON.parse(taskList);

        if (tasks) {
            tasks.forEach( t => {
                this.defineTask(t['nome'], t['status']);
            });
        }
    }
}

const todo = new ToDo;
todo.returnTaskList();

let addBtn = document.querySelector('#add');

addBtn.addEventListener('click', function(e) {
    e.preventDefault();

    let taskText = document.querySelector('#task');

    if(taskText.value != '') {
        todo.defineTask(taskText.value);
        todo.addTask();
    }

    taskText.value = '';

});