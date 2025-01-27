const main = document.querySelector("main");
const agregar = document.querySelector("#nombre");
const buscador = document.querySelector("#buscador");
const botonOrdenar = document.querySelector("#ordenar");
let nombres = ["Juan", "María", "Pedro"]; // Nombres iniciales por defecto

renderDefaultNames();
// Renderizar nombres iniciales
function renderDefaultNames() {
  nombres.forEach((nombre) => {
    agregarNombre(nombre);
  });
}

// Crear y agregar un nombre al DOM
function agregarNombre(valorNombre) {
  // Crear nodos
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const divBotones = document.createElement("div");
  const editar = document.createElement("button");
  const eliminar = document.createElement("button");

  // Texto a insertar
  h2.textContent = valorNombre;
  editar.textContent = "Editar";
  eliminar.textContent = "Eliminar";

  // Estilos
  div.setAttribute("class", "divNombre");
  editar.setAttribute("class", "botonDiv");
  eliminar.setAttribute("class", "botonDiv");
  editar.style.backgroundColor = "green";
  eliminar.style.backgroundColor = "red";
  editar.style.marginRight = "5px";
  h2.style.backgroundColor = "rgb(20, 20, 20)";
  h2.style.marginTop = "10px";

  // Eventos de los botones
  editar.addEventListener("click", () => {
    let nuevoNombre = prompt("Dime el nuevo nombre", "");
    const indice = nombres.indexOf(h2.textContent);
    if (nuevoNombre) {
      nombres[indice] = nuevoNombre;
      h2.textContent = nuevoNombre;
      filtrarNombres(); // si estamos buscando y editamos o eliminamos un Div llamaremos a filtrar para que se actualize los elementos que mostramos!!
    }
  });

  eliminar.addEventListener("click", () => {
    div.remove();
    const indice = nombres.indexOf(h2.textContent);
    nombres.splice(indice, 1);
    filtrarNombres();
  });

  // Agregar al DOM
  div.appendChild(h2);
  divBotones.appendChild(editar);
  divBotones.appendChild(eliminar);
  div.appendChild(divBotones);
  main.appendChild(div);
}

// Crear nombre al presionar el btn
function crearNombre() {
  const valorNombre = agregar.value.trim().toLowerCase();
  if (valorNombre === "") {
    alert("No puedes no poner un nombre!");
  } else if (nombres.some((nombre) => nombre.toLowerCase() === valorNombre)) {
    alert("Ese nombre ya existe!");
    agregar.value = "";
  } else {
    nombres.push(valorNombre);
    agregarNombre(valorNombre);
    agregar.value = "";
  }
}

// Filtrar nombres en tiempo real
function filtrarNombres() {
  const textoBusqueda = buscador.value.toLowerCase();
  const divs = document.querySelectorAll(".divNombre");

  nombres.forEach((nombre, index) => {
    const div = divs[index];
    if (nombre.toLowerCase().includes(textoBusqueda)) {
      div.style.display = "block"; // Mostrar si coincide
    } else {
      div.style.display = "none"; // Ocultar si no coincide
    }
  });
}
buscador.addEventListener("input", filtrarNombres);

function ordenarAlfabeticamente() {
  nombres.sort((a, b) => a.localeCompare(b)); // metodo para ordenar alfabeticamente
  main.innerHTML = "";
  renderDefaultNames();
}
botonOrdenar.addEventListener("click", ordenarAlfabeticamente);
