document.addEventListener('DOMContentLoaded', function () {
  loadTasks();

  
  document.getElementById('addTaskButton').addEventListener('click', function () {
      var task = prompt('Введіть завдання:');
      if (task) {
          var dueDate = prompt('Введіть термін виконання dd.mm.yyyy:');
          saveTask({ task: task, dueDate: dueDate, completed: false });
          loadTasks();
      }
  });

  
  var taskList = document.getElementById('taskList');
  taskList.addEventListener('click', function (event) {
      var listItem = event.target.closest('li');
      if (listItem) {
          toggleTask(listItem);
      }
  });
});
document.getElementById('closeButton').addEventListener('click', function () {
  window.close(); 
});

document.getElementById('clearButton').addEventListener('click', function () {
  clearCompletedTasks(function () {
      loadTasks(); 
  });
});

function clearCompletedTasks(callback) {
  chrome.storage.sync.get(['tasks'], function (result) {
      var tasks = result.tasks || [];
      var remainingTasks = tasks.filter(task => !task.completed);
      chrome.storage.sync.set({ tasks: remainingTasks }, function () {
          if (callback && typeof callback === 'function') {
              callback();
          }
      });
  });
}
function loadTasks() {
  var taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  chrome.storage.sync.get(['tasks'], function (result) {
      var tasks = result.tasks || [];
      tasks.forEach(function (task) {
          var listItem = document.createElement('li');
          listItem.textContent = task.task + ' (до ' + task.dueDate + ')';
          if (task.completed) {
              listItem.classList.add('completed');
          }
          taskList.appendChild(listItem);
      });
  });
}

function saveTask(task) {
  chrome.storage.sync.get(['tasks'], function (result) {
    var tasks = result.tasks || [];
    tasks.push(task);
    chrome.storage.sync.set({ tasks: tasks }, function () {
      
      loadTasks();
    });
  });
}
function toggleTask(element) {
  element.classList.toggle('completed');
  var index = Array.from(element.parentNode.children).indexOf(element);
  chrome.storage.sync.get(['tasks'], function (result) {
      var tasks = result.tasks || [];
      tasks[index].completed = !tasks[index].completed;
      chrome.storage.sync.set({ tasks: tasks });
  });
}
