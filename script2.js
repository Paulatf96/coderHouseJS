let tasks = [];
let goals = [];
alert("¡Hola! Bienvenido a imparable, el seguimiento de tus metas");

menu();

function menu() {
  let option = prompt(
    "Menu:\n 1. Ingresa a vision board\n 2.Ingresa a planeador semanal\n 3. Salir "
  );
  switch (option) {
    case "1":
      visionBoard();
      break;
    case "2":
      planning();
      break;
    case "3":
      alert("¡Vuelve pronto!");
      break; 
    default:
        alert ("Ingresa un valor correcto")
        menu()
  }
}

function visionBoard() {
  let option = prompt(
    "Menu:\n 1. Ingresa tus metas \n 2.Ver mis metas registradas"
  );
  let type = "meta";
  let time = "mes";
  switch (option) {
    case "1":
      add(type, goals, time);
      menu();
      break;
    case "2":
      listar(type, goals);
      menu();
  }
}

function planning() {
  let option = prompt(
    "Menu:\n 1. Ingresa tus tareas \n 2.Ver mis tareas registradas"
  );
  let type = "tarea";
  let time = "día";
  switch (option) {
    case "1":
      add(type, tasks, time);
      menu();
      break;
    case "2":
      listar(type, tasks);
      menu();
  }
}

function add(type, array, time) {
  alert("Vamos a ingresar tus " + type + "s");
  let number = Number(prompt("¿Cuantas deseas ingresar?"));
  for (let i = 0; i < number; i++) {
    let category = prompt(
      "Ingresa el nombre de la categoría:\n *salud\n *educacion\n *personal\n *trabajo\n "
    ).toLowerCase();

    let description = prompt("Ingresa una " + type + " en una frase corta");

    let month = Number(
      prompt(
        "Ingresa el número del " + time + " en que la quieres ver realizada"
      )
    );
    let id = array.length + 1;
    let objeto = {
      id: id,
      categoria: category,
      descripcion: description,
      fecha: month,
    };
    array.push(objeto);
  }
  console.log(array);
  return array;
}

function listar(type, array) {
  let opcion = Number(
    prompt(
      "Menu:\n 1.Ver todas mis " +
        type +
        "s\n 2.Filtrar por categoría\n 3. Buscar una " +
        type
    )
  );
  switch (opcion) {
    case 1:
      for (let element of array) {
        let text = element.id + "." + "Descripcion: " + element.descripcion;
        console.log(text);
        alert(text);
      }
      break;
    case 2:
      let word = prompt("Ingrese la categoría que desea buscar").toLowerCase();
      let filtrados = array.filter((elemento) => elemento.categoria == word);
      if (filtrados.length === 0) {
        alert("No tienes " + type + "s en esta categoría");
      }
      for (let element of filtrados) {
        let text = element.id + "." + "\n Descripcion: " + element.descripcion;
        alert(text);
      }
      break;
    case 3:
      let search = Number(
        prompt("Ingrese el id de la " + type + " que desea mostrar")
      );
      let buscado = array.find((elemento) => elemento.id == search);
      if (buscado === undefined) {
        alert("No tienes el id: " + search + " aún ingresado");
      } else {
        alert(
          buscado.id +
            "." +
            "\n Descripción: " +
            buscado.descripcion +
            "\n Categoria: " +
            buscado.categoria
        );
      }
  }
}
