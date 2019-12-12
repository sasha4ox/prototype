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
form.addEventListener('submit', function(e) {
  e.preventDefault();
  let data = new FormData(form);

  const formChild = [...form.childNodes].filter(child => child.name);
  const tr = formChild.map(x => {
    // return {
    //   [x.name]: x.value,
    // };
    return x.value;
  });
  console.warn(tr);

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
});

const formSimpleTask = document.querySelector('#formSimpleTask');
const forHomeTask = document.querySelector('#forHomeTask');
const forProjectTask = document.querySelector('#forProjectTask');

console.log(formSimpleTask);
formSimpleTask.addEventListener('submit', function(e) {
  e.preventDefault();
  newUser.createSimpleTask(this.title.value, this.status.value);
  console.log(newUser);
});
forHomeTask.addEventListener('submit', function(e) {
  e.preventDefault();
  newUser.createHomeTask(this.title.value, this.status.value, this.description.value);
  console.log(newUser);
});

////////////////
forProjectTask.addEventListener('submit', function(e) {
  e.preventDefault();
  for (let name in newUser) {
    if(name !==)
   createProjectTask createHomeTask createSimpleTask
    alert(name);
  }
  console.log(newUser.hasOwnProperty('name'));
  newUser.createProjectTask(
    this.title.value,
    this.status.value,
    this.description.value,
    this.deadlineDate.value
  );
  console.log(newUser);
});
