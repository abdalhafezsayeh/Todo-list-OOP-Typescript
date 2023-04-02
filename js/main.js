// Select elements 
const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");

// local Storage
class Storage {
    static setTodoInStorage(todoArr){
        let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    }

    static getStorage(){
        let storage = localStorage.getItem("todo") === null ? 
        [] : JSON.parse(localStorage.getItem("todo"));
        return storage
    }
}
// Empty Array Or Todo
let todoArr = Storage.getStorage();

// Make Object Instance 
class Todo {
    constructor(id, todo){
        this.id = id;
        this.todo = todo;
    }
}

// Submit Form  
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.random() * 1000000;
    const todo = new Todo(id, input.value);
    if(!todo.todo) {
        alert('The Input Is Empty')
    } else {
        todoArr = [...todoArr, todo];
    }

    UI.displayData();
    UI.clearInput();
    //add to storage
    Storage.setTodoInStorage(todoArr);
});



// display the todo in the DOM;
class UI{
    static displayData(){
        let displayData = todoArr.map((item) => {
                return `
                    <div class="todo">
                        <p class="textContent">${item?.todo}</p>
                        <div class="icons">
                            <span class="remove" data-id=${item?.id}>🗑️</span>
                            <span class="edite" data-id=${item?.id}>🖋️</span>
                        </div>
                    </div>
                `   
        });
        lists.innerHTML = displayData.join("");
    }

    static clearInput(){
        input.value = "";
    }

    static removeTodo(){
        lists.addEventListener("click", (e) => {
            if(e.target.classList.contains("remove")){
                e.target.parentElement.parentElement.remove();

                let btnId = e.target.dataset.id;
                UI.removeArrayTodo(btnId);
            }
        });
    }
    
    static removeArrayTodo(id){
        todoArr = todoArr.filter((item) => item.id !== +id);
        Storage.setTodoInStorage(todoArr);
    }

    static editeTodo() {
        let toggleButton = true;
        lists.addEventListener('click', (e) =>{
            if(e.target.classList.contains('edite')) {
                let p = e.target.parentElement.parentElement.firstElementChild;
                let bt = e.target.dataset.id;
                if(toggleButton) {
                    e.target.textContent = "Save";
                    p.setAttribute("contenteditable", "true");
                    p.focus();

                } else {
                    e.target.textContent = "🖋️";
                    p.removeAttribute("contenteditable");
                    let indexTheOneTodo = todoArr.findIndex((item)=> item.id === +bt)
                    todoArr[indexTheOneTodo].todo = p.textContent;
                    Storage.setTodoInStorage(todoArr);
                }

            }
            toggleButton = !toggleButton
        });
    }

}

// once the browser is loaded
window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    //remove from the dom
    UI.removeTodo();
    // Edite 
    UI.editeTodo();
});





// window.addEventListener("offline", (event) => {
//     console.log("The network connection has been lost.");
// });
  
// window.addEventListener("online", (event) => {
//     console.log("You are now connected to the network.");
// });

