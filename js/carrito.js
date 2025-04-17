let carroIphones = localStorage.getItem("carroIphones")
carroIphones = JSON.parse(carroIphones)

if (carroIphones === null) {
  carroIphones = []
}
let contenedorCarro = document.getElementById("contenedor-carro")

function mostrarCarro(iphonesCarro) {
    
     if (iphonesCarro.length === 0) {
        const mensajeVacio = document.createElement("h3")
        mensajeVacio.textContent = "Tu carrito esta vacio"
        contenedorCarro.appendChild(mensajeVacio)
        return
    }
    
    iphonesCarro.forEach ((iphone) => {
        const cardCarro = document.createElement("div")
        cardCarro.classList.add("col-md-2", "mb-4")
        cardCarro.innerHTML = `
                            <div class="card">
                            <img src="${iphone.imagen}" class="card-img-top" alt="${iphone.modelo}">
                            <div class="card-carro-body">
                            <h3 class="card-carro-title">${iphone.modelo}</h3>
                            <p class="card-carro-text">Precio: ${iphone.precio}</p>
                            <p class="card-carro-text">Almacenamiento: ${iphone.almacenamiento}</p>
                            <p class="card-carro-text">Color: ${iphone.color}</p>
                            <p class="card-carro-text">Estado: ${iphone.estado}</p>
                            <p class="card-carro-text">Batería: ${iphone.bateria}%</p>
                            <p class="card-carro-text">Cantidad: ${iphone.cantidad}</p>
                            </div>
                            </div>`;
    contenedorCarro.appendChild(cardCarro);
    });
    
    const botonVaciar = document.createElement("button")
    botonVaciar.textContent = "Vaciar carrito"
    botonVaciar.classList.add("vaciar-carrito")
    botonVaciar.onclick = vaciarCarrito
    contenedorCarro.appendChild(botonVaciar)

  const sumaPrecios = iphonesCarro.reduce((contador, iphone) => contador +(iphone.precio * iphone.cantidad),0 )

  const precioTotal = document.createElement("h3")
  precioTotal.textContent = `Total de la compra: ${sumaPrecios} USD`

  contenedorCarro.appendChild(precioTotal);
}


function vaciarCarrito() {
    localStorage.removeItem("carroIphones")
    carroIphones = []
    contenedorCarro.innerHTML = ""
    mostrarCarro(carroIphones);
}

mostrarCarro(carroIphones);