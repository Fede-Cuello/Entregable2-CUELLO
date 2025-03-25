const iphones = [
  {
    modelo: "iPhone 12",
    precio: "700usd",
    almacenamiento: "128GB",
    color: "Negro",
    estado: "Usado",
    bateria: 80,
  },
  {
    modelo: "iPhone 12 PRO",
    precio: "800usd",
    almacenamiento: "258GB",
    color: "Azul",
    estado: "Usado",
    bateria: 80,
  },
  {
    modelo: "iPhone 13",
    precio: "850usd",
    almacenamiento: "128GB",
    color: "Blanco",
    estado: "Nuevo",
    bateria: 100,
  },
  {
    modelo: "iPhone 13 PRO",
    precio: "850usd",
    almacenamiento: "128GB",
    color: "Gris",
    estado: "Usado",
    bateria: 95,
  },
  {
    modelo: "iPhone 14",
    precio: "950usd",
    almacenamiento: "256GB",
    color: "Rojo",
    estado: "Nuevo",
    bateria: 100,
  },
  {
    modelo: "iPhone 14 PRO",
    precio: "1050usd",
    almacenamiento: "512GB",
    color: "Negro",
    estado: "Nuevo",
    bateria: 100,
  },
  {
    modelo: "iPhone 14 PRO",
    precio: "900usd",
    almacenamiento: "512GB",
    color: "Rojo",
    estado: "Usado",
    bateria: 85,
  },
  {
    modelo: "iPhone 15",
    precio: "1000usd",
    almacenamiento: "512GB",
    color: "Azul",
    estado: "Usado",
    bateria: 90,
  },
  {
    modelo: "iPhone 15 PRO",
    precio: "1200usd",
    almacenamiento: "512GB",
    color: "Verde",
    estado: "Nuevo",
    bateria: 100,
  },
];

const alertGracias = () => alert("Gracias por visitarnos. Vuelve pronto!");

const mostrarTodosLosIphones = () => {
  console.log("Todos los modelos disponibles:");
  for (const iphone of iphones) {
    console.log(
      `Modelo: ${iphone.modelo} | Precio: ${iphone.precio} | Color: ${iphone.color} | Estado: ${iphone.estado} | Batería: ${iphone.bateria}`
    );
  }
};

const buscarIphone = () => {
  let modeloBuscado;

  do {
    modeloBuscado = prompt(
      "Ingresa el modelo de iPhone que buscas (Escribe 'salir' para terminar)"
    );

    if (modeloBuscado === null || modeloBuscado.toLowerCase() === "salir") {
      alertGracias();
      break;
    }

    const iphonesEncontrados = iphones.filter(
      (iphone) => iphone.modelo.toLowerCase() === modeloBuscado.toLowerCase()
    );

    if (iphonesEncontrados.length > 0) {
      console.log("iPhones encontrados:");
      for (let iphone of iphonesEncontrados) {
        console.log(
          `iPhone encontrado:\nModelo: ${iphone.modelo}\nPrecio: ${iphone.precio}\nAlmacenamiento: ${iphone.almacenamiento}\nColor: ${iphone.color}\nEstado: ${iphone.estado}\nBatería: ${iphone.bateria}`
        );
      }
    } else {
      console.log("Disculpe, ese modelo no está disponible.");
    }
  } while (modeloBuscado !== null && modeloBuscado.toLowerCase() !== "salir");
};

let opcionInicial;

while (opcionInicial !== "salir") {
  opcionInicial = prompt(
    "Deseas ver todos los modelos disponibles o buscar un modelo en particular? Escribe 'ver todos', 'buscar' o 'salir' para terminar."
  );

  if (opcionInicial === null) {
    opcionInicial = "salir";
  }

  opcionInicial = opcionInicial.toLowerCase();

  switch (opcionInicial) {
    case "ver todos":
      mostrarTodosLosIphones();
      if (confirm("Quieres buscar algún modelo en particular ahora?")) {
        buscarIphone();
      }
      break;

    case "buscar":
      buscarIphone();
      break;

    case "salir":
      alertGracias();
      break;

    default:
      alert(
        "Opción no válida. Por favor escribe 'ver todos', 'buscar' o 'salir'."
      );
      break;
  }
}
