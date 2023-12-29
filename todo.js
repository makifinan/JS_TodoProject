var todoInput= document.getElementById("todo");
var form=document.querySelector("#todo-form");
var firstCard = document.querySelectorAll(".card-body")[0];
var secondCard = document.querySelectorAll(".card-body")[1];
var listGroup = document.querySelector(".list-group");
form.addEventListener("submit",formSubmit)

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
        showAlert();   
    }
    
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
    showAlert("success","başarıyla eklendi");
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