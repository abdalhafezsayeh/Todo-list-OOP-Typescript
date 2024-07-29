namespace Opp {

    // Select elements
    const form = document.querySelector("[data-form]") as HTMLFormElement;
    const lists = document.querySelector("[data-lists]") as HTMLElement;
    const input = document.querySelector("[data-input]") as HTMLInputElement;

    // Type for Todo
    interface ITodo {
        id: number;
        todo: string;
    }

    // local Storage
    class Storage {
        static setTodoInStorage(todoArr: ITodo[]): void {
            localStorage.setItem("todo", JSON.stringify(todoArr));
        }

        static getStorage(): ITodo[] {
            const storage = localStorage.getItem("todo");
            return storage === null ? [] : JSON.parse(storage);
        }
    }

    // Empty Array Or Todo
    let todoArr: ITodo[] = Storage.getStorage();

    // Make Object Instance
    class Todo implements ITodo {
        constructor(public id: number, public todo: string) { }
    }

    // display the todo in the DOM;
    class UI {
        static displayData(): void {
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

        static clearInput(): void {
            input.value = "";
        }

        static removeTodo(): void {
            lists.addEventListener("click", (e: Event) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains("remove")) {
                    target.parentElement?.parentElement?.remove();

                    const btnId = target.dataset.id;
                    if (btnId) {
                        UI.removeArrayTodo(+btnId);
                    }
                }
            });
        }

        static removeArrayTodo(id: number): void {
            todoArr = todoArr.filter((item) => item.id !== id);
            Storage.setTodoInStorage(todoArr);
        }

        static editTodo(): void {
            let toggleButton = true;
            lists.addEventListener("click", (e: Event) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains("edit")) {
                    const p = target.parentElement?.parentElement?.firstElementChild as HTMLElement;
                    const bt = target.dataset.id;
                    if (toggleButton) {
                        target.textContent = "Save";
                        p.style.color = "blue";
                        p.setAttribute("contenteditable", "true");
                        p.focus();
                    } else {
                        target.textContent = "🖋️";
                        p.removeAttribute("contenteditable");
                        const indexTheOneTodo = todoArr.findIndex((item) => item.id === +(bt ?? -1));
                        p.style.color = "black";
                        todoArr[indexTheOneTodo].todo = p.textContent ?? '';
                        Storage.setTodoInStorage(todoArr);
                    }
                    toggleButton = !toggleButton;
                }
            });
        }
    }

    // Submit Form
    form.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        const id = Math.random() * 1000000;
        const todo = new Todo(id, input.value);
        if (!todo.todo) {
            alert('The Input Is Empty');
        } else {
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

}