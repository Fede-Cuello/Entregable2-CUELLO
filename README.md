# 📱 ISELECTBV 

El proyecto se trata de una tienda online de venta de iphones.
Se pueden encontrar modelos nuevos y usados.
Tiene una pagina principal que se muestran todos los modelos disponibles , y un apartado de carrito donde se van agregando productos.
Se simula un formulario de datos para envio y pago ofreciendo tres metodos , transferencia ,debito o credito .
Ademas , descarga un comprobante de compra en pdf .

---

## 🚀 Funcionalidad principal

Explicación simple del funcionamiento general:
En la pagina de inicio se muestran los productos, almacenados en un JSON. Se pueden agregar al carrito controlando el stock,
haciendo que cuando el stock llegue a 0 cambie el texto del boton y se desactive . Ademas tiene un contador de los productos 
en el carrito. Pasando al carro de compras se muestran los productos con sus caracteristicas , permitiendo agregar o quitar
cantidades , eliminar un producto o vaciar el carrito completo. Para finalizar la compra se abre una ventana modal con un 
formulario de datos del comprador y metodo de pago , y se crea un pdf con los datos simulando una boleta o comprobante de pago.

---

## 🛠️ Tecnologías usadas

- HTML
- CSS
- JavaScript 

---

## 📚 Librerías utilizadas

- [Bootstrap](https://getbootstrap.com/) – para estilos y responsive
- [SweetAlert2](https://sweetalert2.github.io/) – para mostrar alertas 
- [jsPDF](https://github.com/parallax/jsPDF) – para generar boletas en PDF

---


## 💾 Almacenamiento de datos

- `localStorage` – utilizado para guardar las reservas entre sesiones del usuario
- `productos.json` – archivo JSON usado como fuente de datos de los productos

---

## 📂 Estructura del proyecto


📁 proyecto/
├── 📁 html/
│   └── carro.html             # Página del carrito de compras
├── 📁 js/
│   ├── index.js               # Página principal: muestra productos y permite reservar controlando el stock disponible
│   └── carrito.js             # Página del carrito: muestra productos reservados y permite modificar cantidades o eliminar productos
├── 📁 db/
│   └── productos.json         # Datos de los iPhones (modelo, precio, stock, etc.)
├── index.html                 # Página principal
└── README.md                  # README: descripcion del proyecto