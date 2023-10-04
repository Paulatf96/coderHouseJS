let today = new Date();
let initId = 0;
let saveInitId = localStorage.getItem("id");
if (saveInitId) {
  initId = JSON.parse(saveInitId);
}
let currentGoal = {};
let currentTask = {};
let goals = [];
let saveGoals = localStorage.getItem("save");

if (saveGoals && JSON.parse(saveGoals).length) {
  goals = JSON.parse(saveGoals);
  print(goals);
}
let tasks = [];
let saveTasks = localStorage.getItem("saveTasks");
if (saveTasks && saveTask.length > 0) {
  tasks = JSON.parse(saveTasks);
  printTask(tasks, true);
}
// Obtener inputs de goals
let textGoal = document
  .getElementById("valueVision")
  .addEventListener("change", function () {
    currentGoal["valueVision"] = this.value;
  });
let imgGoal = document
  .getElementById("imgVision")
  .addEventListener("change", function () {
    imgGoal = this.value;

    let urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;

    // validar URL de goals
    if (urlPattern.test(imgGoal)) {
      currentGoal["imgVision"] = this.value;
    } else {
      alert("No es una URL válida para tu imagen, ingrésala nuevamente");
    }
  });

let inputsCategories = document.querySelectorAll(".categoria");

for (const input of inputsCategories) {
  input.addEventListener("click", {});
}

let saveButon = document
  .getElementById("saveGoal")
  .addEventListener("click", (e) => recorrer(e, inputsCategories, true));
// obtener valores de input de planner
let textTask = document
  .getElementById("valueTask")
  .addEventListener("change", function () {
    currentTask["valueTask"] = this.value;
  });

let inputsCategoriesT = document.querySelectorAll(".categoriaT");

for (const input of inputsCategoriesT) {
  input.addEventListener("click", {});
}

let saveButonTask = document
  .getElementById("saveTask")
  .addEventListener("click", (e) => recorrer(e, inputsCategoriesT, false));

//Función que recorre los input de las categorias  para tomar el valor y se va a la función save ya sea de goal o de task
function recorrer(e, inputsCategories, validation) {
  e.preventDefault();
  inputsCategories.forEach((input) => {
    if (input.checked) {
      if (validation) {
        currentGoal["tittle"] = input.defaultValue;
        currentGoal["category"] = input.id;
        saveGoal();
      } else {
        currentTask["tittle"] = input.defaultValue;
        currentTask["category"] = input.id;
        saveTask();
      }
    }
  });
}
//Función que guarda goals
function saveGoal() {
  if (
    currentGoal["valueVision"] &&
    currentGoal["imgVision"] &&
    currentGoal["category"]
  ) {
    goals.push(currentGoal);
    currentGoal = {};
  } else {
    alert("No ingresaste todos los datos requeridos");
  }
  saveInLocalStorage(goals, "save");
  print(goals);
}
//Función que guarda task
function saveTask() {
  if (currentTask["valueTask"] && currentTask["category"]) {
    let exist = tasks.some(
      (elemento) => elemento.category === currentTask["category"]
    );
    currentTask["id"] = initId;
    currentTask["check"] = false;
    tasks.push(currentTask);
    initId++;
    currentTask = {};
    printTask(tasks, exist);
    console.log("finished 2");
    saveInLocalStorage(tasks, "saveTasks");
    saveInLocalStorage(initId, "id");
  } else {
    alert("No ingresaste todos los datos requeridos");
  }
}
function saveInLocalStorage(array, name) {
  let saveInfo = JSON.stringify(array);
  localStorage.setItem(name, saveInfo);
}
//Imprimir goals
function print(array) {
  let board = document.getElementById("board");
  board.innerHTML = "";
  let theYear = document.createElement("h3");
  theYear.innerHTML = `Estas son tus metas para el ${today.getFullYear()}`;
  board.appendChild(theYear);

  array.forEach(function (elemento) {
    let box = document.createElement("div");
    box.id = "boxGoals";
    box.className="col"
    box.innerHTML = `<div class="card col" style="width: 18rem">
    <img src=${elemento.imgVision} class="card-img-top" alt=${elemento.valueVision}>
    <div class="card-body">
      <h5 class="card-title">${elemento.valueVision}</h5>
      <p class="card-text">Categoria: ${elemento.tittle}</p>
    </div>
  </div>`;
    board.appendChild(box);
  });

  let divButton = document.createElement("div");
  divButton.innerHTML = `<button id="deleteVisionBoard" class="btn btn-primary">Limpiar Vision Board</button>`;
  divButton.className = "container-button";
  board.appendChild(divButton);
  
  let deleteVisionBoard =document.getElementById("deleteVisionBoard").addEventListener("click", () => deleteBoard());
  document.getElementById("goalsForm").reset();
}

//Borrar todo el tablero
function deleteBoard() {
  let board = document.getElementById("board");
  board.innerHTML = "";
  goals = [];
  saveInLocalStorage(goals, "save");
}
//Imprimir tareas en pantalla
function printTask(array, exist) {
  let board = document.getElementById("plannerBoard");
  board.innerHTML = "";
  let thedate = document.createElement("h3");
  thedate.innerHTML = `Estas son tus tareas para: ${new Date()
    .toISOString()
    .substring(0, 10)}`;
  board.appendChild(thedate);
  if (!exist) {
    array.forEach(function (elemento) {
      let box = document.createElement("div");
      box.classList="col boxPlanner"
      box.innerHTML = `<div class="card col" id="box-${elemento.category}" style="max-width: 18rem;">
      <div class="card-header">> ${elemento.tittle} </div>
      <div class="card-body">
        <p class="card-text" id="${elemento.id}">${elemento.valueTask} </p>
        <input class="checkTask" id="${elemento.id}" type="checkbox"/>
      </div> `;

      board.appendChild(box);
      
      document.getElementById("plannerForm").reset();
    });
    let inputsTask = document.getElementsByClassName("checkTask");
    for (input of inputsTask) {
      console.log(input);
      input.addEventListener("click", (e) => checkTask(e));
    }
  } else {
    let arraySocial = array.filter(
      (elemento) => elemento.category == "socialT"
    );

    if (arraySocial.length) {
      printCategoryTask(arraySocial);
    }

    let arrayLaboral = array.filter(
      (elemento) => elemento.category == "laboralT"
    );

    if (arrayLaboral.length) {
      printCategoryTask(arrayLaboral);
    }
    let arrayCrecimiento = array.filter(
      (elemento) => elemento.category == "crecimientoPersonalT"
    );
    if (arrayCrecimiento.length) {
      printCategoryTask(arrayCrecimiento);
    }
    let arrayEconomia = array.filter(
      (elemento) => elemento.category == "economiaT"
    );
    if (arrayEconomia.length) {
      printCategoryTask(arrayEconomia);
    }
    seeCheckbox();
  }
  
  let divButton = document.createElement("div");
  divButton.innerHTML = `<button id="buttonDelete" class="btn btn-primary">Borrar tareas terminadas</button>`;
  divButton.className = "container-button";
  board.appendChild(divButton);
  
  let buttonDelete =document.getElementById("buttonDelete").addEventListener("click", () => deleteCompleted());
  document.getElementById("plannerForm").reset();
}
//Eliminar las tareas completadas
function deleteCompleted() {
  let w = 0;
  let i = 0;
  let stoper = true;
  while (stoper) {
    console.log(tasks[i]);
    if (tasks[i].check) {
      console.log("hola");
      tasks.splice(w, 1);
    } else {
      i++;
      w++;
    }
    if (tasks.length == i) {
      stoper = false;
    }
    console.log(w);
  }

  console.log(tasks);
  printTask(tasks);
  saveInLocalStorage(tasks, "saveTasks");
  saveInLocalStorage(initId, "id");
}
//Imprime en tarjetas por categoría
function printCategoryTask(array) {
  let divId = `box-${array[0].category}`;

  let card = `<div class="card" id="${divId}" style="max-width: 18rem;">
  <div class="card-header">> ${array[0].tittle} </div>
  <div class="card-body">
    <p class="card-text">${array[0].valueTask} </p>
    <input id="${array[0].id}" class="checkTask" type="checkbox"/>
  </div> `;

  let divCard = document.createElement("div");
  divCard.innerHTML = card;
  divCard.classList="col boxPlanner"

  let board = document.getElementById("plannerBoard");
  board.appendChild(divCard);

  /*  if (array[0].check){
  document.getElementById("0").checked=true
  } */
  let findBox = document.getElementById(`${divId}`);

  for (let i = 1; i < array.length; i++) {
    let newTask = document.createElement("div");
    newTask.classList="card-body"
    newTask.innerHTML = `<p class="card-text">${array[i].valueTask} </p>
    <input id="${array[i].id}"  class="checkTask" type="checkbox"/>`;
    findBox.appendChild(newTask);
  }
  let inputsTask = document.getElementsByClassName("checkTask");
  for (let input of inputsTask) {
    input.addEventListener("click", (e) => checkTask(e));
  }
}
//Verificar los checkbox de las tareas completadas 
function seeCheckbox() {
  let inputsTask = document.getElementsByClassName("checkTask");
  for (let i = 0; i < inputsTask.length; i++) {
    let findedTask = tasks.find((elemento) => elemento.id == inputsTask[i].id);
    if (findedTask.check) {
      inputsTask[i].checked = true;
    }
  }
}

const filtro = document.getElementById("floatingSelect");
filtro.addEventListener("change", function (option) {
  console.log(option.target.value);

  if (option.target.value == "todos") {
    print(goals);
  } else {
    let filtrados = goals.filter(
      (elemento) => elemento.category == option.target.value
    );
    if (filtrados.length === 0) {
      alert("No hay elementos aún en esta categoría");
    }
    print(filtrados);
  }
});
//Guardar valor check en el objeto tarea
function checkTask(e) {
  console.dir(e);
  if (e.target.checked) {
    tasks.forEach((elemento) => {
      if (elemento.id == e.target.id) {
        elemento["check"] = true;
      }
    });
    saveInLocalStorage(tasks, "saveTasks");
  }
}

//Ver Ocultar vision board y planner container
 let grupoVerOcultar = document.getElementsByClassName("verOcultar")
for(let elemento of grupoVerOcultar){
  elemento.addEventListener("click", () => verOcultar())
}

function verOcultar() {
  let board1 = document.getElementById("goalsContainer")
  let board2 = document.getElementById("plannerContainer")
  board1.classList.toggle("oculta")
  board2.classList.toggle("oculta")
  let saveTasks2 = localStorage.getItem("saveTasks");
if (saveTasks2 && JSON.parse(saveTasks2).length) {
  tasks = JSON.parse(saveTasks2);
  printTask(tasks, true);
}
} 
