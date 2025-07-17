document.addEventListener("DOMContentLoaded", function () {
  // ===========================
  // 🛒 CARRITO DE COMPRAS
  // ===========================

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

  function mostrarProductosEnCarrito() {
    const productos = JSON.parse(localStorage.getItem("carrito")) || [];

    if (contenedorProductosCarrito) {
      contenedorProductosCarrito.innerHTML = "";

      productos.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
          <p>${producto.nombre} - ${producto.precio}</p>
          <button class="eliminar-btn" data-index="${index}">Eliminar</button>
        `;
        contenedorProductosCarrito.appendChild(div);
      });

      // Agregar eventos a los botones de eliminar
      const botonesEliminar = contenedorProductosCarrito.querySelectorAll(".eliminar-btn");
      botonesEliminar.forEach((btn) => {
        btn.addEventListener("click", () => {
          const index = parseInt(btn.getAttribute("data-index"));
          eliminarProductoCarrito(index);
        });
      });
    }

    actualizarContadorCarrito();
  }

  function agregarProductoAlCarrito(producto) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
  }

  function eliminarProductoCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarProductosEnCarrito();
  }

  function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (contadorCarrito) {
      contadorCarrito.textContent = carrito.length > 0 ? carrito.length : "";
    }
  }

  actualizarContadorCarrito();

  // ===========================
  // 🔍 MODAL DE BÚSQUEDA
  // ===========================

  const abrirBuscador = document.querySelector("#abrir-buscador");
  const cerrarBuscador = document.querySelector("#cerrar-buscador");
  const modalBuscador = document.querySelector("#modal-buscador");
  const inputBuscador = document.querySelector("#input-buscar");
  const resultadosBusqueda = document.querySelector("#resultados-busqueda");

  if (abrirBuscador && modalBuscador) {
    abrirBuscador.addEventListener("click", () => {
      modalBuscador.classList.add("activo");
      inputBuscador.focus();
    });
  }

  if (cerrarBuscador && modalBuscador) {
    cerrarBuscador.addEventListener("click", () => {
      modalBuscador.classList.remove("activo");
      resultadosBusqueda.innerHTML = "";
      inputBuscador.value = "";
    });
  }

  if (inputBuscador) {
    inputBuscador.addEventListener("input", () => {
      const valor = inputBuscador.value.toLowerCase();
      resultadosBusqueda.innerHTML = "";

      if (valor.length >= 2) {
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
});
