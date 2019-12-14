function User(name, surname) {
  this.name = name;
  this.surname = surname;
}
User.prototype.createSimpleTask = function(title, status) {
  let newTask = {
    title: title,
    status: status,
  };
  if (this.task) {
    this.task.push(newTask);
  } else {
    this.task = [
      {
        title: title,
        status: status,
      },
    ];
  }
  return this.task;
};

function Student(name, surname, specialization) {
  User.call(this, name, surname);
  this.specialization = specialization;
}
Student.prototype = Object.create(User.prototype);
// Student.prototype.constructor = User;
Student.prototype.createHomeTask = function(title, status, description) {
  const newHomeWork = {
    title: title,
    status: status,
    description: description,
  };
  if (this.homeTask) {
    this.homeTask.push(newHomeWork);
  } else {
    this.homeTask = [
      {
        title: title,
        status: status,
        description: description,
      },
    ];
  }
  return this.homeTask;
};

function Developer(name, surname, specialization, jobTitle) {
  Student.call(this, name, surname, specialization);
  this.jobTitle = jobTitle;
}
Developer.prototype = Object.create(Student.prototype);
// Developer.prototype.constructor = Student;
Developer.prototype.createProjectTask = function(title, status, description, deadlineDate) {
  const newProject = {
    title,
    status,
    description,
    deadlineDate,
  };
  if (this.projectTask) {
    this.projectTask.push(newProject);
  } else {
    this.projectTask = [
      {
        title,
        status,
        description,
        deadlineDate,
      },
    ];
  }
  return this.projectTask;
};
const valera = new Student('Valera', 'Djeday', 'Math');
const alex = new User('Alex', 'Fox');

alex.createSimpleTask('did it', false);
alex.createSimpleTask('done it', true);
valera.createSimpleTask('did it', false);
const bor = new User('bor', 'alee');
bor.createSimpleTask('did it absolutly', true);
valera.createHomeTask('Math', 'false', 'learn all about circle');
valera.createHomeTask('History', 'true', 'learn all about Napoleon');
const alexDev = new Developer('Alex', 'Fox', 'Front-end', 'Make Ukraine great again');
alexDev.createProjectTask('Make a site', false, 'make a site for McDonalds', '>><<,>');
alexDev.createHomeTask('dsds', false, 'dsdsds');
console.log(alex, bor, valera, alexDev);
const form = document.getElementById('form');
form.addEventListener('change', function() {
  switch (form.select.value) {
    case 'user':
      form.specialization.disabled = true;
      form.jobTitile.disabled = true;
      break;
    case 'student':
      form.specialization.disabled = false;
      form.jobTitile.disabled = true;
      break;
    case 'developer':
      form.specialization.disabled = false;
      form.jobTitile.disabled = false;
      break;
  }

  console.log(form.select.value);
});
let newUser;
const createListener = function(e) {
  e.preventDefault();
  // let data = new FormData(form);

  const formChild = [...form.childNodes].filter(child => child.name);
  const tr = formChild.map(x => {
    // return {
    //   [x.name]: x.value,
    // };
    return x.value;
  });
  // console.warn(tr);

  switch (form.select.value) {
    case 'user':
      newUser = new User(...tr);
      form.specialization.disabled = true;
      form.jobTitile.disabled = true;
      break;
    case 'student':
      newUser = new Student(...tr);
      form.specialization.disabled = false;
      form.jobTitile.disabled = true;
      break;
    case 'developer':
      newUser = new Developer(...tr);
      form.specialization.disabled = false;
      form.jobTitile.disabled = false;
      break;
  }
  console.log(newUser);
  form.removeEventListener('submit', createListener);
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  });
};
form.addEventListener('submit', createListener);

const formSimpleTask = document.querySelector('#formSimpleTask');
const forHomeTask = document.querySelector('#forHomeTask');
const forProjectTask = document.querySelector('#forProjectTask');

console.log(formSimpleTask);
formSimpleTask.addEventListener('submit', function(e) {
  e.preventDefault();
  if (hasPropertyInPrototype(newUser, 'createSimpleTask')) {
    newUser.createSimpleTask(this.title.value, this.status.value);
    createrTodo(newUser, 'task');
  } else {
    alert("Sory, you don't have permision");
  }
  console.log(newUser);
});
forHomeTask.addEventListener('submit', function(e) {
  e.preventDefault();
  if (hasPropertyInPrototype(newUser, 'createHomeTask')) {
    newUser.createHomeTask(this.title.value, this.status.value, this.description.value);
    createrTodo(newUser, 'homeTask');
  } else {
    alert("Sory, you don't have permision");
  }

  console.log(newUser);
});
function hasPropertyInPrototype(obj, property) {
  for (var name in obj) {
    if (name === property) {
      return true;
    }
  }
}
// function (param) {  }
////////////////
Array.prototype.remove = function(index) {
  this.splice(index, 1);
};
// function render(arr){

// }
function createrTodo(obj, props) {
  const todoEl = document.querySelector('#todo');
  // console.log([...todoEl.childNodes].length - 1);
  for (let prop in obj) {
    if (prop === props) {
      const div = document.createElement('div');
      const p = document.createElement('p');
      const del = document.createElement('button');
      const lenthOfProps = obj[props].length - 1;
      del.setAttribute('id', lenthOfProps);
      del.onclick = function() {
        // obj[props].remove(this.id);
        delete obj[props][this.id];
        // console.warn();
        this.parentNode.parentNode.remove(this);
        // console.log(this.id);
      };
      const lastAddedProps = obj[props].filter((item, i) => {
        if (i === lenthOfProps) return item;
      });
      console.log(props);
      switch (props) {
        case 'homeTask':
          p.innerHTML = `Type: Simple Task; Title: ${lastAddedProps[0].title} Status: ${lastAddedProps[0].status} Description: ${lastAddedProps[0].description}`;
          break;
        case 'projectTask':
          p.innerHTML = `Type: Project Task; Title: ${lastAddedProps[0].title} Status: ${lastAddedProps[0].status} Description: ${lastAddedProps[0].description} Deadline: ${lastAddedProps[0].deadlineDate}`;
          break;
        case 'task':
          p.innerHTML = `Type: Simple Task; Title: ${lastAddedProps[0].title} Status: ${lastAddedProps[0].status}`;
          break;
      }

      todoEl.appendChild(div);
      div.appendChild(p);
      p.appendChild(del);
      // console.log(obj[props]);
      // console.log(lastAddedProps);
    }
  }
  // console.log(obj);
}
forProjectTask.addEventListener('submit', function(e) {
  e.preventDefault();

  //  createProjectTask createHomeTask createSimpleTask
  // alert(name);
  if (hasPropertyInPrototype(newUser, 'createProjectTask')) {
    newUser.createProjectTask(
      this.title.value,
      this.status.value,
      this.description.value,
      this.deadlineDate.value
    );
    createrTodo(newUser, 'projectTask');
  } else {
    alert("Sory, you don't have permision");
  }

  console.log(newUser);
  // console.log(newUser.hasOwnProperty('name'));
});
