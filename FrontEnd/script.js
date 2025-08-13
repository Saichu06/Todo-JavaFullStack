
// Shared script for login, register, and todos pages
const SERVER_URL = "http://localhost:8080";
const token = localStorage.getItem("token");

// Login page logic
function login() {
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    
    fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers : {"Content-Type":"application/json"},
        body: JSON.stringify({email,password})

    })
    .then(response =>{
        if(!response.ok){
            throw new Error(data.message || "Login Failed");
            }
            return response.json();
        })
        .then(data =>{
            localStorage.setItem("Token",data.token);
            window.location.href="todos.html";
        })
        .catch(error=>{
            alert(error.message);
        })
}

// Register page logic
function register() {
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    
    fetch(`${SERVER_URL}/auth/register`, {
        method: "POST",
        headers : {"Content-Type":"application/json"},
        body: JSON.stringify({email,password})

    })
    .then(response =>{
        if(response.ok){
            alert("Registration Successfull,Please Login");
            window.location.href="login.html" 
        }
        else{
            return response.json().then(data => { throw new Error(data.message || "Registration Failed"); });

        }
        }).catch(error=>{
            alert(error.message);
        })

}
// Todos page logic
function createTodoCard(todo) {
    const card=document.createElement("div");
    card.className="todo-card";
    const checkbox=document.createElement("input");
    checkbox.type="checkbox"
    checkbox.checked=todo.completed;
    checkbox.addEventListener("charge",function(){
        const updatedTodo={...todo,completed:checkbox.checked}
        updateTodoStatus(updateTodo);
    });
    const span=document.createElement("span");
    span.textContent=todo.title;

    if(todo.completed){
        span.style.textDecoration="line-through";
        span.style.color="#aaa";
    }

    const deletebtn=document.createElement("button");
    deletebtn.textContent="X";
    deletebtn.onclick=function(){deleteTodo(todo.id);};

    card.appendChild(checkbox);
    card.appendChild(span);
    card.appendChild(deletebtn);

    return card;
}

function loadTodos() {
    if(!token){
        alert("Please Login First");
        window.location.href="login.html";
        return;
    }
      fetch(`${SERVER_URL}/api/v1/todo`,{
        method: "GET",
        headers : {  
            headers : {"Content-Type":"application/json"},
            "Authorization":`Bearer ${Token}`
        },
    })
    .then(response =>{
        if(!response.ok){
            throw new Error(data.message || "Failed to get todo");
            }
            return response.json();
        })
        then((todos)=> {
            const todoList=document.getElementById("todo-list");
            todoList.innerHTML="";
            if(!todos || todos.length===0){
                todoList.innerHTML=`<p id="empty-message">No Todos Yet . Add one</p>`;

            }
            else{
                todos.array.forEach(todo => {
                    todoList.appendChild(createTodoCard(todo));
                });
            }
        })
        .catch(error=>{
            document.getElementById("todo-list").innerHTML=`<p style="color:red">Failed to load Todos!</p>`;
        }) 
}

function addTodo() {
    const input=document.getElementById("new-todo").value;
    const todoText=input.value.trim();


      fetch(`${SERVER_URL}/api/v1/todo`,{
        method: "POST",
        headers : {  
            headers : {"Content-Type":"application/json"},
            "Authorization":`Bearer ${Token}`
        },
        body: JSON.stringify({title : todoText,completed:false})

    })
    .then(response =>{
        if(!response.ok){
            throw new Error(data.message || "Failed to update todo");
            }
            return response.json();
        })
        then((newTodo)=> {
            input.value="";
            loadTodos();
})
        .catch(error=>{
            alert(error.message);
        }) 
}

function updateTodoStatus(todo) {
    fetch(`${SERVER_URL}/api/v1/todo`,{
        method: "PUT",
        headers : {  
            headers : {"Content-Type":"application/json"},
            "Authorization":`Bearer ${Token}`
        },
        body: JSON.stringify(todo)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error(data.message || "Failed to update todo");
            }
            return response.json();
        })
        then(()=> loadTodos())
        .catch(error=>{
            alert(error.message);
        }) 
}

function deleteTodo(id) { 
    fetch(`${SERVER_URL}/api/v1/todo/${id}`,{
        method: "DELETE",
        headers : {  "Authorization":`Bearer ${Token}`},
    })
    .then(response =>{
        if(!response.ok){
            throw new Error(data.message || "Failed to delete todo");
            }
            return response.text();
        })
        then(()=> loadTodos())
        .catch(error=>{
            alert(error.message);
        })
}

// Page-specific initializations
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("todo-list")) {
        loadTodos();
    }
});
