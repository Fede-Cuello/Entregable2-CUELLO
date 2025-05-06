let iphones = JSON.parse(localStorage.getItem("iphones"));

if (!iphones) {
  iphones = [
    {
      modelo: "iPhone 12",
      precio: 700,
      almacenamiento: "128GB",
      color: "Negro",
      estado: "Usado",
      bateria: 80,
      imagen: "../assets/iphone12negro.webp",
      id: 1,
      stock: 5,
    },
    {
      modelo: "iPhone 12 PRO",
      precio: 800,
      almacenamiento: "258GB",
      color: "Azul",
      estado: "Usado",
      bateria: 80,
      imagen: "../assets/iphone12proazul.webp",
      id: 2,
      stock: 6,
    },
    {
      modelo: "iPhone 13",
      precio: 850,
      almacenamiento: "128GB",
      color: "Blanco",
      estado: "Nuevo",
      bateria: 100,
      imagen: "../assets/iphone13blanco.webp",
      id: 3,
      stock: 3,
    },
    {
      modelo: "iPhone 13 PRO",
      precio: 850,
      almacenamiento: "128GB",
      color: "Gris",
      estado: "Usado",
      bateria: 95,
      imagen: "../assets/iphone13progris.png",
      id: 4,
      stock: 4,
    },
    {
      modelo: "iPhone 14",
      precio: 950,
      almacenamiento: "256GB",
      color: "Rojo",
      estado: "Nuevo",
      bateria: 100,
      imagen: "../assets/iphone14rojo.png",
      id: 5,
      stock: 2,
    },
    {
      modelo: "iPhone 14 PRO",
      precio: 1050,
      almacenamiento: "512GB",
      color: "Negro",
      estado: "Nuevo",
      bateria: 100,
      imagen: "../assets/iphone14pronegro.webp",
      id: 6,
      stock: 3,
    },
    {
      modelo: "iPhone 14 PRO",
      precio: 900,
      almacenamiento: "512GB",
      color: "Morado",
      estado: "Usado",
      bateria: 85,
      imagen: "../assets/iphone14promorado.jpg",
      id: 7,
      stock: 5,
    },
    {
      modelo: "iPhone 15",
      precio: 1000,
      almacenamiento: "512GB",
      color: "Rosa",
      estado: "Usado",
      bateria: 90,
      imagen: "../assets/iphone15rosa.webp",
      id: 8,
      stock: 4,
    },
    {
      modelo: "iPhone 15 PRO",
      precio: 1200,
      almacenamiento: "512GB",
      color: "Titanium",
      estado: "Nuevo",
      bateria: 100,
      imagen: "../assets/iphone15protitanio.webp",
      id: 9,
      stock: 2,
    },
  ]

  localStorage.setItem("iphones", JSON.stringify(iphones))
}

let carroIphones = JSON.parse(localStorage.getItem("carroIphones")) || [];

//mostrar las card de iphones

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

iphonesCards(iphones);
contadorCarro();

//reservar con boton

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

