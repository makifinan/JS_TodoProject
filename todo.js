let todoInput= document.getElementById("todo");
let form=document.querySelector("#todo-form");
let firstCard = document.querySelectorAll(".card-body")[0];
let secondCard = document.querySelectorAll(".card-body")[1];
let listGroup = document.querySelector(".list-group");
let filterInput= document.getElementById("filter");
let clearButton = document.getElementById("clear-todos");

form.addEventListener("submit",formSubmit)
document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
secondCard.addEventListener("click",deleteTodo);
filterInput.addEventListener("keyup",filterTodo);
clearButton.addEventListener("click",deleteAll);

function deleteAll(e){
    if (confirm("Tümünü silmek istiyor musunuz ? ")) {
        while(listGroup.firstElementChild!=null){
            listGroup.removeChild(listGroup.firstElementChild);
        }
        localStorage.removeItem("todos")
    }
    
}

function filterTodo(e){
    let value = e.target.value.toLowerCase();
    let list=document.querySelectorAll(".list-group-item");
    list.forEach((item,index)=>{
        let text = item.textContent.toLowerCase();
        if (text.indexOf(value)=== -1) {
           item.setAttribute("style","display : none !important")
        }
        else{
            item.setAttribute("style","display : block")
        }
    })
}

function deleteTodo(e){
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteFromLocalStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","todo başarıyla siilindi");
    }
}

function deleteFromLocalStorage(deleteTodo){
    let todos = checkLocalStorage();
    todos.forEach((item,index)=>{
        if (item===deleteTodo) {
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));

}

function loadAllTodosToUI(){
    let todos = checkLocalStorage();
    todos.forEach(element => {
        addToTodoCartUI(element);
    });
}

function formSubmit(e){

    addToTodoCart();

    e.preventDefault();
}



function addToTodoCart(){
    let newTodo=todoInput.value.trim();
    if (newTodo === "") {
        showAlert("danger","lütfen bir todo giriniz");
    }
    else{
        addToTodoCartUI(newTodo);
        addToLocalStorage(newTodo);
        showAlert("success","başarıyla eklendi"); 
    }
    
}

function checkLocalStorage(){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addToLocalStorage(newTodo){
    let todos = checkLocalStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addToTodoCartUI(newTodo){

    let listItem = document.createElement("li");
    let link= document.createElement("a");

    listItem.className="list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    
    link.className="delete-item";
    link.href="#";
    link.innerHTML="<i class = 'fa fa-remove'></i>";

    listItem.appendChild(link);

    listGroup.appendChild(listItem);
    
    todoInput.value="";
    console.log(link)

}
function showAlert(type,message){

    const alert = document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCard.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1000)

}


// console.log(a);


//  <li class="list-group-item d-flex justify-content-between">
// Todo 1
// <a href = "#" class ="delete-item">
//     <i class = "fa fa-remove"></i>
// </a>

// </li>