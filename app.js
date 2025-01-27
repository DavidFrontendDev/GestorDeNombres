const main = document.querySelector("main");
const agregar = document.querySelector("#nombre");
const buscador = document.querySelector("#buscador");
const botonOrdenar = document.querySelector("#ordenar");

// Cargar nombres desde localStorage o usar valores por defecto
let nombres = JSON.parse(localStorage.getItem("nombres")) || [
  "Juan",
  "María",
  "Pedro",
];

renderDefaultNames();

// Guardar en localStorage
function guardarEnLocalStorage() {
  localStorage.setItem("nombres", JSON.stringify(nombres));
}

// Renderizar nombres iniciales
function renderDefaultNames() {
  main.innerHTML = "";
  nombres.forEach((nombre) => {
    agregarNombre(nombre);
  });
}

// Crear y agregar un nombre al DOM
function agregarNombre(valorNombre) {
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
      guardarEnLocalStorage();
      h2.textContent = nuevoNombre;
      filtrarNombres();
    }
  });

  eliminar.addEventListener("click", () => {
    div.remove();
    const indice = nombres.indexOf(h2.textContent);
    nombres.splice(indice, 1);
    guardarEnLocalStorage();
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
    guardarEnLocalStorage();
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

// Ordenar nombres alfabéticamente
function ordenarAlfabeticamente() {
  nombres.sort((a, b) => a.localeCompare(b)); // metodo para ordenar alfabeticamente
  guardarEnLocalStorage();
  renderDefaultNames();
}
botonOrdenar.addEventListener("click", ordenarAlfabeticamente);
