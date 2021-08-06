//  SECLECT ITEMS
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".gocery-list");
const clearBtn = document.querySelector(".clear-btn");
//edit option
let editElemet;
let editFlag = false;
let editId = "";

//EVENT LISTENERS
//submit form
form.addEventListener("submit", addItem);
//clear items
clearBtn.addEventListener("click", clearItems);
//set up item
window.addEventListener("DOMContentLoaded", setupItem);
// FUNCTIONS
//add item
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    const element = document.createElement("article");
    let atrr = document.createAttribute("data-id");
    atrr.value = id;
    element.setAttributeNode(atrr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <!-- edit btn -->
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <!-- delete btn -->
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
    const editBtn = element.querySelector(".edit-btn");
    const deleteBtn = element.querySelector(".delete-btn");
    editBtn.addEventListener("click", editItem);
    deleteBtn.addEventListener("click", deleteItem);
    //appendchild
    list.appendChild(element);
    //show container
    container.classList.add("show-container");
    //add local storage
    addLocalStorage(id, value);
    //set back to default
    setBackToDeFault();
  } else if (value && editFlag) {
    editElemet.innerHTML = value;
    displayAlert("value changed", "success");
    editItemLocalStorage(editId, value);
    setBackToDeFault();
  } else {
    dislpayAlert("plese enter value", "danger");
  }
}
//  display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

//clear all items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDeFault();
  localStorage.removeItem("list");
}
//delete item
function deleteItem(e) {
  // console.log("delete");
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  //display alert
  displayAlert("remove item", "danger");
  //delete item local storage
  deleteLocaStorage(id);
  //set back to defaut
  setBackToDeFault();
}
// edit item
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //set element
  editElemet = e.currentTarget.parentElement.previousElementSibling;
  //set form value
  grocery.value = editElemet.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "edit";
}
//set back to defaut
function setBackToDeFault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}
//LOCAL STORAGE
// add localstorage
function addLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
//edit item local storage
function editItemLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
//delete item local storage
function deleteLocaStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}
//get LocalStorage
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
// localStorage.setItem("list", JSON.stringify(["item", "item2"]));
// const lists = JSON.parse(localStorage.getItem("list"))
// console.log(lists)
// SETUP ITEM
function setupItem() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items = items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}
function createListItem(id, value) {
  const element = document.createElement("article");
  let atrr = document.createAttribute("data-id");
  atrr.value = id;
  element.setAttributeNode(atrr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <!-- edit btn -->
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <!-- delete btn -->
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
  const editBtn = element.querySelector(".edit-btn");
  const deleteBtn = element.querySelector(".delete-btn");
  editBtn.addEventListener("click", editItem);
  deleteBtn.addEventListener("click", deleteItem);
  //appendchild
  list.appendChild(element);
}
