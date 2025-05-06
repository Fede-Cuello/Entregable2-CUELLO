let carroIphones = JSON.parse(localStorage.getItem("carroIphones")) || [];
let iphones = JSON.parse(localStorage.getItem("iphones")) || [];
let contenedorCarro = document.getElementById("contenedor-carro");

function mostrarCarro(iphonesCarro) {
  contenedorCarro.innerHTML = ""
  if (iphonesCarro.length === 0) {
    const mensajeVacio = document.createElement("h3");
    mensajeVacio.textContent = "Tu carrito esta vacio"
    contenedorCarro.appendChild(mensajeVacio)
    return
  }

  iphonesCarro.forEach((iphone) => {

    let botonEstado = ""

    if (iphone.stock <= 0) {
      botonEstado = "disabled"
    }

    const cardCarro = document.createElement("div");
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
                            <p class="card-carro-text">Subtotal: ${iphone.cantidad * iphone.precio} USD </p>
                            <button class="restar-cantidad" id="${iphone.id}">-</button>
                            <p class="card-carro-text">Cantidad: ${iphone.cantidad}</p>
                            <button class="sumar-cantidad" id="${iphone.id}" ${botonEstado}>+</button>
                            <button class="eliminar-producto" id="${iphone.id}">Eliminar Producto</button>
                            </div>
                            </div>`;
    contenedorCarro.appendChild(cardCarro)
  })

  const contenedorFinal = document.createElement("div");
  contenedorFinal.classList.add ("contenedor-final")

  const botonVaciar = document.createElement("button");
  botonVaciar.textContent = "Vaciar carrito"
  botonVaciar.classList.add("vaciar-carrito")
  botonVaciar.onclick = vaciarCarrito
  
  const sumaPrecios = iphonesCarro.reduce((contador, iphone) => contador + iphone.precio * iphone.cantidad,0);

  const precioTotal = document.createElement("h3");
  precioTotal.textContent = `Total de la compra: ${sumaPrecios} USD`

  const botonFinalizar = document.createElement("button");
  botonFinalizar.textContent = "Finalizar Compra"
  botonFinalizar.classList.add("boton-finalizar")
  botonFinalizar.id = "finalizarCompra"

  contenedorFinal.appendChild(precioTotal)
  contenedorFinal.appendChild(botonVaciar)
  contenedorFinal.appendChild(botonFinalizar)


  contenedorCarro.appendChild(contenedorFinal)

  document.getElementById("finalizarCompra").addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Confirmar compra",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Si,terminar compra",
        cancelButtonText: "No,seguir buscando",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Listo",
            text: "Compra exitosa",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "No finalizaste tu compra",
            text: "Vuelve a ver mas productos",
            icon: "info",
          });
        }
      });
  });

  agregarEventosBotonesCarrito(); 
}

function vaciarCarrito() {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción vaciará todo el carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      carroIphones.forEach((iphonesEnCarro) => {const stockInicial = iphones.find((iphone) => iphone.id === iphonesEnCarro.id)
        if (stockInicial) {
          stockInicial.stock += iphonesEnCarro.cantidad
        }
      })

      localStorage.removeItem("carroIphones")
      carroIphones = []
      contenedorCarro.innerHTML = ""

     localStorage.setItem("iphones", JSON.stringify(iphones))

      mostrarCarro(carroIphones)

      Swal.fire({
        icon: "success",
        title: "Carrito vaciado",
        text: "Todos los productos fueron eliminados.",
        confirmButtonColor: "#178582",
      })
    }
  })
}

mostrarCarro(carroIphones)

//contenedorCarro.addEventListener("click", botonesCarrito);

//function botonesCarrito(e) {
 // const id = parseInt(e.target.id);
//}


function agregarEventosBotonesCarrito() {
 const botonesSumar = document.querySelectorAll(".sumar-cantidad");
  botonesSumar.forEach((boton) => {boton.addEventListener("click", (e) => {
      const id = parseInt(e.target.id);
      const productoElegido = carroIphones.find((iphone) => iphone.id === id);
      const stockOriginal = iphones.find((iphone) => iphone.id === id);

      if (productoElegido && stockOriginal && stockOriginal.stock > 0) {
        productoElegido.cantidad++
        stockOriginal.stock--

        localStorage.setItem("carroIphones", JSON.stringify(carroIphones))
        localStorage.setItem("iphones", JSON.stringify(iphones))
        mostrarCarro(carroIphones)
        
      }
    })
  })

  const botonesRestar = document.querySelectorAll(".restar-cantidad");
  botonesRestar.forEach((boton) => {boton.addEventListener("click", (e) => {
      const id = parseInt(e.target.id);
      const productoElegido = carroIphones.find((iphone) => iphone.id === id);
      const stockOriginal = iphones.find((iphone) => iphone.id === id);

      //console.log("producto antes de restar:", productoElegido);

      if (productoElegido && stockOriginal) {
        if (productoElegido.cantidad > 1) {
          //console.log("Restando 1 a la cantidad");
          productoElegido.cantidad--
          stockOriginal.stock++
        } else {
          //console.log("eliminando producto del carrito");
          carroIphones = carroIphones.filter((iphone) => iphone.id !== id)
          stockOriginal.stock++ 
        }

        //console.log("despues de restar:", productoElegido);
        localStorage.setItem("carroIphones", JSON.stringify(carroIphones))
        localStorage.setItem("iphones", JSON.stringify(iphones))

       mostrarCarro(carroIphones)
        
      }
    })
  })

  const botonesEliminar = document.querySelectorAll(".eliminar-producto");
  botonesEliminar.forEach((boton) => {boton.addEventListener("click", (e) => {
      const id = parseInt(e.target.id);
      const productoElegido = carroIphones.find((iphone) => iphone.id === id);
      const stockOriginal = iphones.find((iphone) => iphone.id === id);

      if (productoElegido && stockOriginal) {
        stockOriginal.stock += productoElegido.cantidad
        carroIphones = carroIphones.filter((iphone) => iphone.id !== id)

        localStorage.setItem("carroIphones", JSON.stringify(carroIphones))
        localStorage.setItem("iphones", JSON.stringify(iphones))
        mostrarCarro(carroIphones)
        
      }
    })
  })
}