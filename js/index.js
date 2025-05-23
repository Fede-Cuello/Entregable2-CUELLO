let iphones = JSON.parse(localStorage.getItem("iphones"));
let carroIphones = JSON.parse(localStorage.getItem("carroIphones")) || [];


async function cargarProductos() {
  try {
    const response = await fetch("./db/productos.json");
    const data = await response.json();
    iphones = data

    localStorage.setItem("iphones", JSON.stringify(iphones))

    iphonesCards(iphones)
    contadorCarro()
  } catch (err) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML ="<h3>Error al cargar los productos. Intentalo mas tarde.</h3>"
  }
}

if (!iphones) {
  cargarProductos();
} else {
  iphonesCards(iphones);
  contadorCarro();
}


function iphonesCards(iphones) {
  const contenedor = document.getElementById("contenedor-productos");

  iphones.forEach((iphone) => {

    
    let botonTexto = "RESERVAR"
    let botonEstado = ""

    if (iphone.stock <= 0) {
      botonTexto = "SIN STOCK"
      botonEstado = "disabled"
    }

    const card = document.createElement("div");
    card.classList.add("col-md-3", "mb-4");
    card.innerHTML = `
      <div class="card">
        <img src="${iphone.imagen}" class="card-img-top" alt="${iphone.modelo}">
        <div class="card-body">
          <h3 class="card-title">${iphone.modelo}</h3>
          <p class="card-text">Precio: ${iphone.precio}usd</p>
          <p class="card-text">Almacenamiento: ${iphone.almacenamiento}</p>
          <p class="card-text">Color: ${iphone.color}</p>
          <p class="card-text">Estado: ${iphone.estado}</p>
          <p class="card-text">Batería: ${iphone.bateria}%</p>
          <button class="reservarIphone" id="${iphone.id}" ${botonEstado}>${botonTexto}</button>
        </div>
      </div>
    `

    contenedor.appendChild(card)
  })
  reservarIphone();
}


function reservarIphone() {
  const btnComprar = document.querySelectorAll(".reservarIphone");
  btnComprar.forEach((button) => {button.onclick = (e) => {
      const iphoneId = parseInt(e.currentTarget.id); 
      const iphoneElegido = iphones.find((iphone) => iphone.id === iphoneId);
      const boton = e.currentTarget;
     
      if (iphoneElegido.stock === 0) {
       boton.textContent = "AGOTADO"
       boton.disabled = true
       return
      }
      
      const iphoneEnCarro = carroIphones.find((iphone) => iphone.id === iphoneId);

      if (iphoneEnCarro) {
        iphoneEnCarro.cantidad++
        iphoneElegido.stock--
      
        
      } else {
        const nuevoIphone = {
          id: iphoneElegido.id,
          modelo: iphoneElegido.modelo,
          precio: iphoneElegido.precio,
          imagen: iphoneElegido.imagen,
          color: iphoneElegido.color,
          almacenamiento: iphoneElegido.almacenamiento,
          estado: iphoneElegido.estado,
          bateria: iphoneElegido.bateria,
          cantidad: 1,
          
        }

        carroIphones.push(nuevoIphone)
        iphoneElegido.stock--
        
      }

      
      if (iphoneElegido.stock === 0) {
        boton.textContent = "SIN STOCK"
        boton.disabled = true
      }
      
      localStorage.setItem("iphones", JSON.stringify(iphones))
      localStorage.setItem("carroIphones", JSON.stringify(carroIphones))
      contadorCarro()
    }
  })
}




function contadorCarro() {
  const numeroCarro = document.getElementById("numeroCarro");
  let cantidadCarro = carroIphones.reduce((contador, iphone) => contador + iphone.cantidad, 0)
  numeroCarro.innerText = cantidadCarro
}


//buscador
const inputBuscador = document.getElementById("buscador");
const btnBuscar = document.getElementById("btn-buscar");

function buscarIphones() {
  const texto = inputBuscador.value.toLowerCase();
  const buscados = iphones.filter((iphone) =>iphone.modelo.toLowerCase().includes(texto) ||iphone.estado.toLowerCase().includes(texto));
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = ""

  iphonesCards(buscados)
}

inputBuscador.addEventListener("input", buscarIphones)
btnBuscar.addEventListener("click", buscarIphones)

