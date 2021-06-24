function clock() {
  let date = new Date();
  let hrs = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();
  let period = "AM";

  if (hrs == 0) hrs = 12;
  if (hrs > 12) {
    hrs = hrs - 12;
    period = "PM";
  }

  hrs = hrs < 10 ? `0${hrs}` : hrs;
  mins = mins < 10 ? `0${mins}` : mins;
  secs = secs < 10 ? `0${secs}` : secs;

  let time = `${hrs}:${mins}:${secs} ${period}`;
  setInterval(clock, 1000);
  document.getElementById("clock").innerText = time;
}
clock();

// **************************************************************************

function todoList(k,m) {
  const container = document.querySelector('.container');
  var inputValue = document.querySelector('.input');
  const add = document.querySelector('.add');
  if (window.localStorage.getItem("todos") == undefined) {
    var todos = [];
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }
  var todosEX = window.localStorage.getItem("todos");
  var todos = JSON.parse(todosEX);
  class item {
    constructor(name) {
      this.createItem(name);
    }
    createItem(name) {
      var itemBox = document.createElement('div');
      itemBox.classList.add('item');
      var input = document.createElement('input');
      input.type = "text";
      input.disabled = true;
      input.value = name;
      input.classList.add('item_input');

      var edit = document.createElement('button');
      edit.classList.add('edit');
      edit.innerHTML = "EDIT";
      edit.addEventListener('click', () => this.edit(input, name));

      var remove = document.createElement('button');
      remove.classList.add('remove');
      remove.innerHTML = "REMOVE";
      remove.addEventListener('click', () => this.remove(itemBox, name));

      container.appendChild(itemBox);

      itemBox.appendChild(input);
      itemBox.appendChild(edit);
      itemBox.appendChild(remove);

    }

    edit(input, name) {
      if (input.disabled == true) {
        input.disabled = !input.disabled;
      } else {
        input.disabled = !input.disabled;
        let indexof = todos.indexOf(name);
        todos[indexof] = input.value;
        window.localStorage.setItem("todos", JSON.stringify(todos));
      }
    }

    remove(itemBox, name) {
      itemBox.parentNode.removeChild(itemBox);
      let index = todos.indexOf(name);
      todos.splice(index, 1);
      window.localStorage.setItem("todos", JSON.stringify(todos));
      m.style.background="white";
    }
  }

  add.addEventListener('click', check);
  window.addEventListener('keydown', (e) => {
    if (e.which == 13) {
      check();
    }
  })

  function check() {
    pushel = clicked + " : " + inputValue.value
    if (inputValue.value != "") {
      new item(pushel);
      todos.push(pushel);
      window.localStorage.setItem("todos", JSON.stringify(todos));
      inputValue.value = "";
    }
  }
  // for (var v = 0; v < todos.length; v++) {
  //   new item(todos[v]);
  // }
    document.getElementById('ex').onclick = function() {
    document.getElementById("whole").style.display = "none";
    backDrop.style.display = 'none';
    console.log("exit");
  }
}

//***************************************************************************
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const calendar = document.getElementById('calendar');
const backDrop = document.getElementById('modalBackDrop');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date,square) {
  clicked = date;
  document.getElementById("whole").style.display = "block";
  backDrop.style.display = 'block';
  todoList(clicked,square);
  square.style.background="#FFE8E8";
  console.log(clicked);
  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText =
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${i - paddingDays}/${month + 1}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }
      daySquare.addEventListener('click', () => openModal(dayString,daySquare));
    } else {
      daySquare.classList.add('padding');
    }
    calendar.appendChild(daySquare);
  }
}
function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });
}
initButtons();
load();
