"use strict";
var Opp;
(function (Opp) {
    // Select elements
    const form = document.querySelector("[data-form]");
    const lists = document.querySelector("[data-lists]");
    const input = document.querySelector("[data-input]");
    // local Storage
    class Storage {
        static setTodoInStorage(todoArr) {
            localStorage.setItem("todo", JSON.stringify(todoArr));
        }
        static getStorage() {
            const storage = localStorage.getItem("todo");
            return storage === null ? [] : JSON.parse(storage);
        }
    }
    // Empty Array Or Todo
    let todoArr = Storage.getStorage();
    // Make Object Instance
    class Todo {
        constructor(id, todo) {
            this.id = id;
            this.todo = todo;
        }
    }
    // display the todo in the DOM;
    class UI {
        static displayData() {
            let displayData = todoArr.map((item) => {
                return `
                <div class="todo">
                    <p class="textContent">${item.todo}</p>
                    <div class="icons">
                        <span class="remove" data-id=${item.id}>🗑️</span>
                        <span class="edit" data-id=${item.id}>🖋️</span>
                    </div>
                </div>
            `;
            });
            lists.innerHTML = displayData.join("");
        }
        static clearInput() {
            input.value = "";
        }
        static removeTodo() {
            lists.addEventListener("click", (e) => {
                var _a, _b;
                const target = e.target;
                if (target.classList.contains("remove")) {
                    (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
                    const btnId = target.dataset.id;
                    console.log(btnId);
                    if (btnId) {
                        UI.removeArrayTodo(+btnId);
                    }
                }
            });
        }
        static removeArrayTodo(id) {
            todoArr = todoArr.filter((item) => item.id !== id);
            Storage.setTodoInStorage(todoArr);
        }
        static editTodo() {
            let toggleButton = true;
            lists.addEventListener("click", (e) => {
                var _a, _b, _c;
                const target = e.target;
                if (target.classList.contains("edit")) {
                    const p = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.firstElementChild;
                    const bt = target.dataset.id;
                    if (toggleButton) {
                        target.textContent = "Save";
                        p.style.color = "blue";
                        p.setAttribute("contenteditable", "true");
                        p.focus();
                    }
                    else {
                        target.textContent = "🖋️";
                        p.removeAttribute("contenteditable");
                        const indexTheOneTodo = todoArr.findIndex((item) => item.id === +(bt !== null && bt !== void 0 ? bt : -1));
                        p.style.color = "black";
                        todoArr[indexTheOneTodo].todo = (_c = p.textContent) !== null && _c !== void 0 ? _c : '';
                        Storage.setTodoInStorage(todoArr);
                    }
                    toggleButton = !toggleButton;
                }
            });
        }
    }
    // Submit Form
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = Math.random() * 1000000;
        const todo = new Todo(id, input.value);
        if (!todo.todo) {
            alert('The Input Is Empty');
        }
        else {
            todoArr = [...todoArr, todo];
        }
        UI.displayData();
        UI.clearInput();
        // add to storage
        Storage.setTodoInStorage(todoArr);
    });
    // once the browser is loaded
    window.addEventListener("DOMContentLoaded", () => {
        UI.displayData();
        // remove from the dom
        UI.removeTodo();
        // Edit
        UI.editTodo();
    });
    // window.addEventListener("offline", (event) => {
    //     console.log("The network connection has been lost.");
    // });
    // window.addEventListener("online", (event) => {
    //     console.log("You are now connected to the network.");
    // });
})(Opp || (Opp = {}));
