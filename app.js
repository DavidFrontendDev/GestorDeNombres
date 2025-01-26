const main = document.querySelector("main");
const agregar = document.querySelector("#nombre");
let nombres = [];

function crearNombre() {
  // Creacion de nodos
  const valorNombre = agregar.value;
  if (agregar.value === "") {
    alert("No puedes no poner un nombre!");
  } else {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const divBotones = document.createElement("div");
    const editar = document.createElement("button");
    const eliminar = document.createElement("button");
    // Texto a meter
    h2.textContent = valorNombre;
    nombres.push(valorNombre);
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
    // Eventos
    editar.addEventListener("click", () => {
      let nuevoNombre = prompt("Dime el nuevo nombre", "");
      const indice = nombres.indexOf(h2.textContent);
      nombres[indice] = nuevoNombre;
      h2.textContent = nuevoNombre;
    });
    eliminar.addEventListener("click", () => {
      div.remove();
      const indice = nombres.indexOf(h2.textContent);
      nombres.splice(indice, 1);
    });
    // Introduccion al html
    div.appendChild(h2);
    divBotones.appendChild(editar);
    divBotones.appendChild(eliminar);
    div.appendChild(divBotones);
    main.appendChild(div);
    agregar.value = "";
  }
}
