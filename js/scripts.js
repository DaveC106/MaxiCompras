// ===========================
// 🛒 CARRITO DE COMPRAS
// ===========================

// Obtener elementos
const carritoBtn = document.querySelector("#carrito-btn");
const carritoModal = document.querySelector("#carrito-modal");
const cerrarCarritoBtn = document.querySelector("#cerrar-carrito");
const contadorCarrito = document.querySelector("#contador-carrito");
const contenedorProductosCarrito = document.querySelector("#contenedor-carrito");

// Mostrar carrito
if (carritoBtn && carritoModal) {
  carritoBtn.addEventListener("click", () => {
    carritoModal.classList.add("activo");
    mostrarProductosEnCarrito();
  });
}

// Cerrar carrito
if (cerrarCarritoBtn && carritoModal) {
  cerrarCarritoBtn.addEventListener("click", () => {
    carritoModal.classList.remove("activo");
  });
}

// Mostrar productos guardados en LocalStorage
function mostrarProductosEnCarrito() {
  const productos = JSON.parse(localStorage.getItem("carrito")) || [];

  if (contenedorProductosCarrito) {
    contenedorProductosCarrito.innerHTML = ""; // Limpiar

    productos.forEach((producto, index) => {
      const div = document.createElement("div");
      div.classList.add("item-carrito");
      div.innerHTML = `
        <p>${producto.nombre} - ${producto.precio}</p>
        <button onclick="eliminarProductoCarrito(${index})">Eliminar</button>
      `;
      contenedorProductosCarrito.appendChild(div);
    });
  }

  actualizarContadorCarrito();
}

// Agregar producto (usa esto cuando agregues desde un botón)
function agregarProductoAlCarrito(producto) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

// Eliminar producto del carrito
function eliminarProductoCarrito(index) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarProductosEnCarrito();
}

// Actualizar contador (número en el icono)
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (contadorCarrito) {
    contadorCarrito.textContent = carrito.length > 0 ? carrito.length : "";
  }
}

// Llamar al cargar la página
actualizarContadorCarrito();


// ===========================
// 🔍 MODAL DE BÚSQUEDA
// ===========================

const abrirBuscador = document.querySelector("#abrir-buscador");
const cerrarBuscador = document.querySelector("#cerrar-buscador");
const modalBuscador = document.querySelector("#modal-buscador");
const inputBuscador = document.querySelector("#input-buscar");
const resultadosBusqueda = document.querySelector("#resultados-busqueda");

// Abrir el buscador
if (abrirBuscador && modalBuscador) {
  abrirBuscador.addEventListener("click", () => {
    modalBuscador.classList.add("activo");
    inputBuscador.focus();
  });
}

// Cerrar buscador
if (cerrarBuscador && modalBuscador) {
  cerrarBuscador.addEventListener("click", () => {
    modalBuscador.classList.remove("activo");
    resultadosBusqueda.innerHTML = "";
    inputBuscador.value = "";
  });
}

// Buscar productos (puedes adaptar esto a Firestore u otra fuente de datos)
if (inputBuscador) {
  inputBuscador.addEventListener("input", () => {
    const valor = inputBuscador.value.toLowerCase();
    resultadosBusqueda.innerHTML = "";

    if (valor.length >= 2) {
      // Aquí simulo búsqueda. Reemplaza con tus productos reales
      const productos = JSON.parse(localStorage.getItem("productos")) || [];
      const filtrados = productos.filter((p) =>
        p.nombre.toLowerCase().includes(valor)
      );

      if (filtrados.length === 0) {
        resultadosBusqueda.innerHTML = "<p>No se encontraron resultados</p>";
        return;
      }

      filtrados.forEach((prod) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${prod.nombre}</p>`;
        resultadosBusqueda.appendChild(div);
      });
    }
  });
}
