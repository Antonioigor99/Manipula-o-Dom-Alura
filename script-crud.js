const btnAddTask = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task");
const textAreaForm = document.querySelector(".app__form-textarea");
const ulTask = document.querySelector(".app__section-task-list");
const paragrathDescriptionTask = document.querySelector(
  ".app__section-active-task-description"
);
const btnRemoveFinish = document.querySelector("#btn-remover-concluidas");
const btnRemoveFinishAll = document.querySelector("#btn-remover-todas");

let tasks = JSON.parse(localStorage.getItem("tarefas")) || [];
let taskSelect = null;
let liTaskSelect = null;

function updateTask() {
  localStorage.setItem("tarefas", JSON.stringify(tasks));
}

function createElementTask(task) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");
  const svg = document.createElement("svg");
  svg.innerHTML = `
          <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
  `;
  const paragraph = document.createElement("p");
  paragraph.classList.add("app__section-task-list-item-description");
  paragraph.textContent = task.description;

  const button = document.createElement("button");
  button.classList.add("app_button-edit");

  button.onclick = () => {
    const newDescription = prompt("Qual nova tarefa?");
    if (newDescription) {
      paragraph.textContent = newDescription;
      task.description = newDescription;
      updateTask();
    } else {
      alert("Não tem nada escrito");
    }
  };
  const imgBtn = document.createElement("img");
  imgBtn.setAttribute("src", "/imagens/edit.png");
  button.appendChild(imgBtn);
  li.appendChild(svg);
  li.appendChild(paragraph);
  li.appendChild(button);
  if (task.complet) {
    li.classList.add("app__section-task-list-item-complete");
    button.setAttribute("disabled", "disabled");
  } else {
    li.onclick = () => {
      document
        .querySelectorAll(".app__section-task-list-item-active")
        .forEach((element) => {
          element.classList.remove("app__section-task-list-item-active");
        });
      if (taskSelect == task) {
        paragrathDescriptionTask.textContent = "";
        taskSelect = null;
        liTaskSelect = null;
        return;
      }
      taskSelect = task;
      liTaskSelect = li;
      paragrathDescriptionTask.textContent = task.description;

      li.classList.add("app__section-task-list-item-active");
    };
  }

  return li;
}

btnAddTask.addEventListener("click", () => {
  formAddTask.classList.toggle("hidden");
});
formAddTask.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const task = {
    description: textAreaForm.value,
  };
  tasks.push(task);
  const elementTask = createElementTask(task);
  ulTask.appendChild(elementTask);
  updateTask();
  textAreaForm.value = "";
  formAddTask.classList.add("hidden");
});

tasks.forEach((task) => {
  const elementTask = createElementTask(task);
  ulTask.appendChild(elementTask);
});
document.addEventListener("FocoFinalizado", () => {
  if (taskSelect && liTaskSelect) {
    liTaskSelect.classList.remove("app__section-task-list-item-active");
    liTaskSelect.classList.add("app__section-task-list-item-complete");
    liTaskSelect.querySelector("button").setAttribute("disabled", "disabled");
    taskSelect.complet = true;
    updateTask();
  }
});
const removeTasks = (tasksOnly) => {
  const selector = tasksOnly
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item";
  document.querySelectorAll(selector).forEach((element) => {
    element.remove();
  });
  tasks = tasksOnly ? tasks.filter((task) => !task.complet) : [];
  updateTask();
};
btnRemoveFinish.onclick = () => removeTasks(true);
btnRemoveFinishAll.onclick = () => removeTasks(false);
