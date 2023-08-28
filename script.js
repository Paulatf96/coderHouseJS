alert("Bienvenido a su programa de cálculo de nómina");
let active = true;
let option = menu();
console.log(option)
while (active) { 
  let secondOption;
  switch (option) {
    case 1:
      alert(
        "ATENCIÓN: En el cálculo de su nómina se discriminarán deducciones del 8% correspondientes a aportes de salud y pensión"
      );
      let subOption = Number(
        prompt(
          "Menu: \n 1. Cálcular nómina simple \n 2. Cálcular nómina con horas extras"
        )
      );
      switch (subOption) {
        case 1:
          let numA = prompt(
            "¿Para cuantos empleados desea calcular la nómina?"
          );
          alert(
            "Iniciemos su cálculo de nómina, le solicitaré valor de salario mensual y número de días trabajados"
          );
          nominaSimple(numA);
          secondOption = Number(
            prompt(
              "Seleccione una opción:\n 1. Volver al menú principal \n2. Salir  "
            )
          );

          if (secondOption === 1) {
            option=menu();
          } else {
            active = false;
          }

          break;
        case 2:
          let numB = prompt(
            "¿Para cuantos empleados desea calcular la nómina?"
          );
          alert(
            "Iniciemos su cálculo de nómina, le solicitaré valor de salario mensual, número de días trabajados y horas extras laboradas"
          );
          nominaExtras(numB);
          secondOption = Number(
            prompt(
              "Seleccione una opción:\n 1. Volver al menú principal \n2. Salir  "
            )
          );

          if (secondOption === 1) {
           option= menu();
          } else {
            active = false;
          }

          break;
        default:
          alert("No ingresaste una opción válida, saldrás del programa");
          break;
      }
      break;
    case 2:
      active = false;
      break;
  }
}

alert("Hasta pronto, si quieres volver a ingresar al menú recarga la página");
function menu() {
  let option = Number(
    prompt(
      "Menu: \n Ingrese una de las siguientes opciones:\n 1. Cálcular nómina\n 2. Salir del programa"
    )
  );
  return option;
}
function nominaSimple(empleados) {
  for (let i = 0; i < empleados; i++) {
    let salario = Number(
      prompt("Ingrese el salario mensual del empleado " + (i + 1))
    );
    let dias = Number(
      prompt(
        "Ingrese el número de días trabajados en el mes del empleado " + (i + 1)
      )
    );

    salario = salario / 30;
    let pagoNeto = Math.floor(salario * dias);
    let deducciones = Math.floor((pagoNeto * 8) / 100);
    let valorPago = Math.floor(pagoNeto - deducciones);

    alert(
      "El total devengado del empleado " +
        (i + 1) +
        " es::\n " +
        pagoNeto +
        " \ny el valor de sus deducciones es de::\n " +
        deducciones
    );
    alert("El valor a pagar al empleado es " + valorPago);
    salario = 0;
  }
}

function nominaExtras(empleados) {
  for (let i = 0; i < empleados; i++) {
    let salario = Number(
      prompt("Ingrese el salario mensual del empleado " + (i + 1))
    );
    let dias = Number(
      prompt(
        "Ingrese el número de días trabajados en el mes del empleado " + (i + 1)
      )
    );
    let hExtras = Number(
      prompt(
        "Ingrese el número de horas extras laboradas en el mes del empleado " +
          (i + 1)
      )
    );

    salario = salario / 30;
    let valorHora = salario / 8;
    let pagoHoras = valorHora * hExtras;
    let pagoNeto = Math.floor(salario * dias + pagoHoras);
    let deducciones = Math.floor((pagoNeto * 8) / 100);
    let valorPago = Math.floor(pagoNeto - deducciones);

    alert(
      "El total devengado incluido horas extras del empleado " +
        (i + 1) +
        " es::\n " +
        pagoNeto +
        " \ny el valor de sus deducciones es de::\n " +
        deducciones
    );
    alert("El valor a pagar al empleado es " + valorPago);
    salario = 0;
  }
}
