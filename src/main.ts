import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

let todos: Todo[] = [];

const todoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.querySelector("input") as HTMLInputElement;
const myForm = document.getElementById("myform") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.ceil(Math.random() * 1000)),
  };
  todos.push(todo);
  todoInput.value = "";

  renderTodo(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";
  const checkbox: HTMLInputElement = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "isCompleted";
  checkbox.checked = isCompleted;
  checkbox.onchange = () => {
    isCompleted = !isCompleted;
    todos.find((todo) => {
      if (todo.id === id) {
        todo.isCompleted = checkbox.checked;
      }
    });
    paragraph.className = isCompleted ? "textCut" : "";
  };

  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "textCut" : "";

  const deleteBtn: HTMLButtonElement = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.className = "delete";
  deleteBtn.onclick = () => {
    deleteTodo(id);
  };

  todo.append(checkbox, paragraph, deleteBtn);

  todoContainer.append(todo);
};

const renderTodo = (todos: Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach((todo) =>
    generateTodoItem(todo.title, todo.isCompleted, todo.id)
  );
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
};
