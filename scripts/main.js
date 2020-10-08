// Save the array todolist into local web storage
function saveToStorage() {
  localStorage.setItem('todo_list', JSON.stringify(todolist));
}

// Add items into list item element
function addItems() {
  listElement.innerHTML = '';

  // Sorting the array todolist
  todolist.sort();

  for (const item of todolist) {
    // Create a list item element
    var itemElement = document.createElement('li');
    // Set the id of list item element
    itemElement.setAttribute('id', 'listitems');

    // Create a text node in order to assign the user input
    // var textNode = document.createTextNode(item);

    // Create a link element in order to delete the item
    var linkElement = document.createElement('a');
    // Set attribute 'href' with '#' to go to nowhere :D
    linkElement.setAttribute('href', '#');
    // Set attribute 'title' in order to inform the user the purpose of click
    linkElement.setAttribute('title', 'click to delete');

    // Store the position of the item and assign the corresponding
    // function to delete it when clicked.
    var pos = todolist.indexOf(item);
    linkElement.setAttribute('onclick', 'deleteItem(' + pos + ')');

    // Create a text node in order to assign to the user input
    var linkText = document.createTextNode(item);

    // Append the input text into link element
    linkElement.appendChild(linkText);

    // Append the input text into item element
    // itemElement.appendChild(textNode);

    // Append child into item element
    itemElement.appendChild(linkElement);
    // Append child into list element
    listElement.appendChild(itemElement);

    // appElement.appendChild(listElement);
  }

  saveToStorage();
  setFocus('todo');
}

// Add item into list item element
function addItem() {
  const inputElement = document.querySelector('#app input');

  if (inputElement.value == '') {
    setFocus('todo');
    return;
  }

  var itemElement = document.createElement('li');
  var textName = document.createTextNode(inputElement.value);

  todolist.push(inputElement.value);
  inputElement.value = '';

  addItems();
  saveToStorage();
}

// Delete the item according to it's position in the array
function deleteItem(pos) {
  todolist.splice(pos, 1);
  addItems();
}

// Set focus in any element according to the corresponding id
function setFocus(id) {
  document.getElementById(id).focus();
}

// Get which key was pressed inside any input field and also the button
// that will trigger an action.
function getKeyPressed(inputId, buttonId) {
  // Get which input element will be handled
  inputElement = document.getElementById(inputId);

  // Execute a function when the user releases the 'Enter' key on the keyboard
  inputElement.addEventListener('keyup', function (event) {
    if (event.key === '13' || event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById(buttonId).click();
    }
  });
}

// const appElement = document.querySelector('#app');
// var buttonElement = document.querySelector('#app button');
// buttonElement.onclick = addItem;

// Create a list element
var listElement = document.querySelector('#list ul');
// Create an array to store the todolist
var todolist = JSON.parse(localStorage.getItem('todo_list')) || [];

setFocus('todo');
getKeyPressed('todo', 'btn_add');
addItems(); //reload the array from local web storage
