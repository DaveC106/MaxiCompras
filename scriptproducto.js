    
    document.addEventListener("DOMContentLoaded", function () {
    let viewers = Math.floor(Math.random() * (1000 - 10 + 1)) + 10; // valor inicial random entre 10 y 1000
    document.getElementById("viewers-number").textContent = viewers.toLocaleString();

    function getSmoothViewersChange(currentViewers) {
        // 70% prob de subir, 30% de bajar
        let goesUp = Math.random() < 0.7;

        let minChange = 15;
        let maxChange = 30;
        let changeAmount = Math.floor(Math.random() * (maxChange - minChange + 1)) + minChange;

        let newViewers;
        if (goesUp) {
            newViewers = currentViewers + changeAmount;
            if (newViewers > 1000) {
                newViewers = 1000;
                goesUp = false; // si ya está en 1000, la próxima toca bajar
            }
        } else {
            changeAmount = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
            newViewers = currentViewers - changeAmount;
            if (newViewers < 10) newViewers = 10;
        }

        return newViewers;
    }

    function updateViewers() {
        viewers = getSmoothViewersChange(viewers);
        document.getElementById("viewers-number").textContent = viewers.toLocaleString();
    }

    // actualizar normal cada 10 segundos
    setInterval(updateViewers, 10000);

    // 🔹 SALTOS BRUSCOS cada 2 minutos (120000 ms)
    setInterval(() => {
        // salto random entre 10 y 1000
        viewers = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
        document.getElementById("viewers-number").textContent = viewers.toLocaleString();
    }, 120000);

    // 🔹 Contador de unidades (simulación)
    let units = 15;
    setInterval(() => {
        const changeDirection = Math.random() < 0.8 ? -1 : 1;
        const changeAmount = Math.floor(Math.random() * 2) + 1;
        
        units += changeDirection * changeAmount;
        units = Math.max(1, Math.min(20, units));
        
        document.getElementById('units-left').textContent = units;
    }, 30000);
            // Testimonios
           const testimonios = [
    {
        texto: "Este producto es una chimba, me ahorra mucho tiempo en la cocina.",
        estrellas: 5,
        autor: "Carlos Martínez – Medellín",
        foto: "https://randomuser.me/api/portraits/men/21.jpg"
    },
    {
        texto: "Llegó rapido y funciona full, lo uso casi todos los dias.",
        estrellas: 5,
        autor: "Andrés Pineda – Bogotá",
        foto: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
        texto: "Super practico, no ocupa espacio y corta re bien. 10/10",
        estrellas: 5,
        autor: "Felipe Navarro – Bucaramanga",
        foto: "https://randomuser.me/api/portraits/men/20.jpg"
    },
    {
        texto: "Muy util, facil de limpiar y lo mejor es q no hace tanto ruido.",
        estrellas: 4,
        autor: "Julián Castro – Pereira",
        foto: "https://randomuser.me/api/portraits/men/33.jpg"
    },
    {
        texto: "Me sirvio un monton para las ensaladas, lo recomiendo sin dudar.",
        estrellas: 5,
        autor: "Esteban Rojas – Barranquilla",
        foto: "https://randomuser.me/api/portraits/men/85.jpg"
    },
    {
        texto: "Me encanto, pica todo rapido y no se traba. Estoy feliz con mi compra.",
        estrellas: 5,
        autor: "Laura Sánchez – Cartagena",
        foto: "https://randomuser.me/api/portraits/women/29.jpg"
    },
    {
        texto: "Ideal para las que cocinamos con afan jajaja, super recomendado.",
        estrellas: 5,
        autor: "Daniela Peña – Santa Marta",
        foto: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        texto: "La entrega fue rapida y el producto llego bien. Lo uso a diario.",
        estrellas: 5,
        autor: "Valentina Cruz – Montería",
        foto: "https://randomuser.me/api/portraits/women/57.jpg"
    },
    {
        texto: "Al principio dudaba, pero la verdad si sirve un monton. Cocina mas facil.",
        estrellas: 3,
        autor: "Isabella Torres – Manizales",
        foto: "https://randomuser.me/api/portraits/women/63.jpg"
    }
];


            let index = 0;

            function mostrarTestimonio() {
                const t = testimonios[index];
                document.getElementById("textoTestimonio").innerText = `"${t.texto}"`;
                document.getElementById("estrellasTestimonio").innerHTML = '★'.repeat(t.estrellas);
                document.getElementById("autorTestimonio").innerText = t.autor;
                document.getElementById("fotoCliente").src = t.foto;

                index = (index + 1) % testimonios.length;
            }

            mostrarTestimonio();
            setInterval(mostrarTestimonio, 6000);
            
            
        });


         const pedidos = [
        { nombre: "Laura Gómez", ciudad: "Cartagena" },
        { nombre: "David López", ciudad: "Montería" },
        { nombre: "Camila Ríos", ciudad: "Medellín" },
        { nombre: "Juan Torres", ciudad: "Bogotá" },
        { nombre: "Valentina Herrera", ciudad: "Barranquilla" },
        { nombre: "Andrés Ramírez", ciudad: "Bucaramanga" },
        { nombre: "Mariana Salazar", ciudad: "Pereira" },
        { nombre: "Sebastián Duarte", ciudad: "Cúcuta" },
        { nombre: "Juliana Mendoza", ciudad: "Ibagué" },
        { nombre: "Nicolás Pardo", ciudad: "Villavicencio" },
        { nombre: "Daniela Quintero", ciudad: "Neiva" },
        { nombre: "Santiago Castaño", ciudad: "Manizales" },
        { nombre: "Isabella Acosta", ciudad: "Santa Marta" },
        { nombre: "Mateo Guerrero", ciudad: "Pasto" },
        { nombre: "Paula Jiménez", ciudad: "Armenia" }
    ];

    let index = 0;

    function mostrarPedido() {
        const pedido = pedidos[index];
        const pedidoElemento = document.getElementById('pedido');
        if (pedidoElemento) {
            pedidoElemento.innerHTML = `🔥 Nuevo pedido realizado por <b>${pedido.nombre}, ${pedido.ciudad}</b> ✅ Verificado`;
        }
        index = (index + 1) % pedidos.length;
    }

    window.addEventListener('DOMContentLoaded', () => {
        mostrarPedido();
        setInterval(mostrarPedido, 5000); // Cambia cada 5 segundos
    });



  const allImages = [
    "https://randomuser.me/api/portraits/men/20.jpg",
    "https://randomuser.me/api/portraits/men/22.jpg",
    "https://randomuser.me/api/portraits/men/33.jpg",
    "https://randomuser.me/api/portraits/men/47.jpg",
    "https://randomuser.me/api/portraits/men/85.jpg",
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/women/21.jpg",
    "https://randomuser.me/api/portraits/women/29.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/57.jpg",
    "https://randomuser.me/api/portraits/women/63.jpg",
    "https://randomuser.me/api/portraits/women/65.jpg",
    "https://randomuser.me/api/portraits/women/99.jpg"
  ];

  const names = [
    "Gabby", "Moisés", "Valery", "Camila",
    "Lucas", "Roxana", "Samuel", "Camilo", "Juan", "Keiner", "David"
  ];

  function getRandomItems(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function updateContent() {
    const buyersContainer = document.getElementById('buyers-images');
    const buyersText = document.getElementById('buyers-text');

    // Fade out texto
    buyersText.classList.add('fade-out');

    setTimeout(() => {
      // Limpiar imágenes actuales
      buyersContainer.innerHTML = '';

      // Obtener 3 imágenes aleatorias
      const selectedImages = getRandomItems(allImages, 2);

      selectedImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'buyer-image active'; // usará CSS para mostrar
        buyersContainer.appendChild(img);
      });

      // Elegir nombre aleatorio
      const randomName = names[Math.floor(Math.random() * names.length)];

      // Elegir número aleatorio de compradores
      const randomCount = Math.floor(Math.random() * (200 - 80 + 1)) + 80;

      // Actualizar texto
      buyersText.innerHTML = `
        <strong>${randomName}</strong> 
        <img src="images/check.webp" class="verified-icon"> 
        y <strong>${randomCount} personas</strong> compraron
      `;

      buyersText.classList.remove('fade-out');
    }, 500);
  }

  updateContent();
  setInterval(updateContent, 5000);


    function iniciarContador() {
        function obtenerNuevoFin() {
            return new Date().getTime() + 2 * 60 * 60 * 1000; // 2 horas en ms
        }

        function actualizarContador() {
            let fin = parseInt(localStorage.getItem('contadorFin'));

            const ahora = new Date().getTime();
            let diferencia = fin - ahora;

            if (diferencia <= 0) {
                fin = obtenerNuevoFin(); // reinicia a 2h
                localStorage.setItem('contadorFin', fin);
                diferencia = fin - ahora;
            }

            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            const countdownItems = document.querySelectorAll('.countdown-number');
            countdownItems[0].textContent = horas.toString().padStart(2, '0');
            countdownItems[1].textContent = minutos.toString().padStart(2, '0');
            countdownItems[2].textContent = segundos.toString().padStart(2, '0');
        }

        // Inicializar fin si no existe
        if (!localStorage.getItem('contadorFin')) {
            localStorage.setItem('contadorFin', obtenerNuevoFin());
        }

        actualizarContador();
        setInterval(actualizarContador, 1000);
    }

    window.addEventListener('DOMContentLoaded', iniciarContador);


document.addEventListener('DOMContentLoaded', function() {
    const productGallery = document.querySelector('.product-gallery');
    const images = document.querySelectorAll('.product-image');
    let currentIndex = 0;

    // Duraciones personalizadas en milisegundos para cada imagen
    // [primera, segunda, tercera, ...]
    const durations = [3000, 9000]; // 3s para la primera, 9s para la segunda
    // Si hay más imágenes, las demás serán 3s
    while (durations.length < images.length) durations.push(3000);

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
            // Para PC: solo muestra la activa
            if (window.matchMedia("(max-width: 1100px)").matches) {
                img.style.display = '';
            } else {
                img.style.display = i === index ? 'block' : 'none';
            }
        });

        // Para móvil: mueve el scroll
        if (window.matchMedia("(max-width: 1100px)").matches) {
            const imageWidth = productGallery.offsetWidth;
            productGallery.scrollTo({
                left: index * imageWidth,
                behavior: 'smooth'
            });
        }
    }

    function startSlider() {
        showImage(currentIndex);
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            startSlider();
        }, durations[currentIndex]);
    }

    if (images.length > 1) {
        startSlider();
    } else if (images.length === 1) {
        showImage(0);
    }
});



  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  // Fecha real de Colombia
  const hoy = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Bogota" }));

  const sumarDias = (fecha, dias) => {
    let nueva = new Date(fecha);
    nueva.setDate(nueva.getDate() + dias);
    return nueva;
  };

  // FECHAS
  const fechaPedido = `${hoy.getDate()} ${meses[hoy.getMonth()]}`;

  const desp1 = hoy;
  const desp2 = sumarDias(hoy, 1);
  const fechaDespacho = `${desp1.getDate()}–${desp2.getDate()} ${meses[desp2.getMonth()]}`;

  const ent1 = sumarDias(hoy, 2);
  const ent2 = sumarDias(hoy, 4); // ← ¡dos días de entrega!
  const fechaEntrega = `${ent1.getDate()}–${ent2.getDate()} ${meses[ent2.getMonth()]}`;

  // INSERTAR EN HTML
  const fechas = document.querySelectorAll(".fecha");
  if (fechas.length >= 3) {
    fechas[0].textContent = fechaPedido;
    fechas[1].textContent = fechaDespacho;
    fechas[2].textContent = fechaEntrega;
  }

document.addEventListener('DOMContentLoaded', function() {
  const marqueeText = document.querySelector('.marquee-text');
  const originalText = '🚚 ENVÍO GRATIS A TODA COLOMBIA · 📦 PAGO CONTRA ENTREGA · ✅ PRODUCTOS 100% GARANTIZADOS';

  // Lo repetimos 2 veces seguidas
  marqueeText.textContent = originalText + ' · ' + originalText + ' · ' + originalText+ ' · ' + originalText+ ' · ' + originalText+ ' · ' + originalText;
});



document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".oferta-card");
  const inputCantidad = document.getElementById("cantidad");
  const btnMas = document.querySelector(".btn-mas");
  const btnMenos = document.querySelector(".btn-menos");

  // El primero, con clase diferente
  const precioPrimero = document.querySelectorAll(".resumen-precioprimero");
  // Los demás
  const subtotales = document.querySelectorAll(".resumen-compra .resumen-row:first-child .resumen-precio");
  const totales = document.querySelectorAll(".resumen-compra .resumen-row.total .resumen-precio");

  const precioUnitario = 64900;

  // Función para actualizar resumen
  const actualizarResumen = (cantidad) => {
    let precioFinal;

    if (cantidad === 1) {
      precioFinal = 64900;
    } else if (cantidad === 2) {
      precioFinal = 105900;
    } else if (cantidad === 3) {
      precioFinal = 149900;
    } else {
      precioFinal = precioUnitario * cantidad;
    }

    const texto = `$${precioFinal.toLocaleString("es-CO")}`;
    precioPrimero.forEach(el => el.textContent = texto);
    subtotales.forEach(el => el.textContent = texto);
    totales.forEach(el => el.textContent = texto);
  };

  // Función para sincronizar selección de cards con cantidad
  const sincronizarSeleccion = (cantidad) => {
    cards.forEach(c => c.classList.remove("active"));
    if (cantidad >= 1 && cantidad <= 3) {
      cards[cantidad - 1].classList.add("active");
    }
    actualizarResumen(cantidad);
  };

  // Función para seleccionar tarjeta manualmente
  const seleccionarCard = (card, cantidad) => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    inputCantidad.value = cantidad;
    actualizarResumen(cantidad);
  };

  // Click en las cards
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      seleccionarCard(card, index + 1);
    });
  });

  // Botón +
  btnMas.addEventListener("click", () => {
    let val = parseInt(inputCantidad.value);
    if (val < parseInt(inputCantidad.max)) {
      val++;
      inputCantidad.value = val;
      sincronizarSeleccion(val);
    }
  });

  // Botón -
  btnMenos.addEventListener("click", () => {
    let val = parseInt(inputCantidad.value);
    if (val > parseInt(inputCantidad.min)) {
      val--;
      inputCantidad.value = val;
      sincronizarSeleccion(val);
    }
  });

  // Cambio manual en el input (por si el usuario escribe)
  inputCantidad.addEventListener("input", () => {
    let val = parseInt(inputCantidad.value);
    if (isNaN(val) || val < parseInt(inputCantidad.min)) {
      val = parseInt(inputCantidad.min);
    }
    if (val > parseInt(inputCantidad.max)) {
      val = parseInt(inputCantidad.max);
    }
    inputCantidad.value = val;
    sincronizarSeleccion(val);
  });

  // Inicializar en 1 con $64.900
  seleccionarCard(cards[0], 1);
});





const modal = document.getElementById('formModal');
const closeModal = document.querySelector('.close-button');

// Selecciona todos los botones que tengan la clase .buy-button
const buyButtons = document.querySelectorAll('.buy-button');

// A cada botón le asigna el evento de abrir el modal
buyButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'block';
  });
});

// Botón de cerrar
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Si haces click fuera del modal también se cierra
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});




fetch('colombia.min.json')
  .then(res => res.json())
  .then(data => {
    const ciudadSelect = document.getElementById('ciudad');
    const municipioSelect = document.getElementById('municipio');

    // Llenar departamentos
    data.forEach(dep => {
      let option = document.createElement('option');
      option.value = dep.departamento;
      option.textContent = dep.departamento;
      ciudadSelect.appendChild(option);
    });

    // Cuando cambia el departamento, llenar municipios
    ciudadSelect.addEventListener('change', function() {
      municipioSelect.innerHTML = '<option value="">Selecciona</option>';
      let selected = data.find(dep => dep.departamento === this.value);
      if (selected) {
        selected.ciudades.forEach(mun => {
          let option = document.createElement('option');
          option.value = mun;
          option.textContent = mun;
          municipioSelect.appendChild(option);
        });
      }
    });
  });



document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los items de FAQ
    const items = document.querySelectorAll('.faq_questioners_item');

    items.forEach(item => {
        const question = item.querySelector('.faq_questioners_q');

        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});

//script del formulario para escoger el producto
const hidden = document.getElementById("ofertaSeleccionada");

function setOferta(card) {
  // Quitar selección anterior
  document.querySelectorAll(".oferta-card").forEach(c => c.classList.remove("seleccionada"));
  card.classList.add("seleccionada");

  const nombre = card.dataset.nombre;
  const precio = card.dataset.precio;

  // ✅ Guardamos SOLO el nombre en el hidden (sin precio)
  hidden.value = nombre;

  // ✅ Mostrar el precio formateado en el resumen (si existe)
  const resumenPrecio = document.querySelector(".resumen-row.total .resumen-precio");
  if (resumenPrecio) {
    resumenPrecio.innerText = `$${parseInt(precio).toLocaleString("es-CO")}`;
  }
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const def = document.querySelector(".oferta-card.seleccionada") || document.querySelector(".oferta-card");
  if (def) setOferta(def);
});

// Al hacer clic
document.querySelectorAll(".oferta-card").forEach(card => {
  card.addEventListener("click", () => setOferta(card));
});

// Si cierras y reabres el modal, llama a init otra vez
function initOfertaModal() {
  const def = document.querySelector(".oferta-card.seleccionada") || document.querySelector(".oferta-card");
  if (def) setOferta(def);
}
// Llama initOfertaModal() cuando abras el modal



//script logica del boton de pago contra entrega
document.querySelector("#compraForm").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;

  // 1️⃣ Validar campos obligatorios
  const requiredFields = form.querySelectorAll("[required]");
  let allValid = true;

  requiredFields.forEach(field => {
    const value = (field.value || "").trim();
    field.classList.remove("input-error");

    if (!value) {
      allValid = false;
      field.classList.add("input-error");
    } else if (field.name === "entry.2100004347") {
      // Validar teléfono: 10 dígitos y empieza con 3
      if (!/^[3]\d{9}$/.test(value)) {
        allValid = false;
        field.classList.add("input-error");
      }
    } else if (field.name === "entry.1220188323") {
      // Validar correo con @
      if (!/@/.test(value)) {
        allValid = false;
        field.classList.add("input-error");
      }
    }
  });

  if (!allValid) {
    alert("⚠️ Por favor completa todos los campos obligatorios correctamente antes de continuar. Asegúrate que el teléfono tenga 10 dígitos y el correo incluya '@'.");
    return; // Detiene ejecución si falla validación
  }

  // 2️⃣ Asignar tipo de pago
  const tipoPagoInput = form.querySelector('input[name="entry.1855797835"]');
  if (tipoPagoInput) tipoPagoInput.value = "Contra entrega";

  // 3️⃣ Enviar datos al Google Form
  const data = new FormData(form);
  const query = new URLSearchParams(data).toString();

  document.getElementById("loader").style.display = "flex";

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSdM98DnqirphOqYxkl1MLNfQyOh1gV4vTPjI9FpvIcFfuN2cw/formResponse", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: query
  }).then(() => {
    setTimeout(() => {
      try {
        const nombre = (form.querySelector('input[name="entry.884366457"]')?.value || "").trim();
        const ofertaRaw = (document.getElementById("ofertaSeleccionada")?.value || "").trim();

        let cantidad = 1;
        let nombreBase = ofertaRaw;
        const match = ofertaRaw.match(/x(\d+)/i);
        if (match) {
          cantidad = parseInt(match[1]);
          nombreBase = ofertaRaw.replace(/x\d+/i, "").trim();
        }

        const precioEl = document.querySelector('.resumen-row.total .resumen-precio');
        const precio = (precioEl ? precioEl.innerText.trim() : "");
        const telefono = (form.querySelector('input[name="entry.2100004347"]')?.value || "").trim();
        const tipoPago = (form.querySelector('input[name="entry.1855797835"]')?.value || "").trim();

        localStorage.setItem('pedido_nombre', nombre);
        localStorage.setItem('pedido_producto', nombreBase);
        localStorage.setItem('pedido_cantidad', cantidad);
        localStorage.setItem('pedido_precio', precio);
        localStorage.setItem('pedido_telefono', telefono);
        localStorage.setItem('pedido_tipo_pago', tipoPago);
      } catch (err) {
        console.warn('No fue posible guardar datos en localStorage', err);
      }

      window.location.href = "gracias-pedido.html";
    }, 1500);
  }).catch(() => {
    alert("❌ Error al enviar el pedido");
    document.getElementById("loader").style.display = "none";
  });
});


src="https://checkout.epayco.co/checkout.js"


document.addEventListener("DOMContentLoaded", () => {
  const defaultBtn = document.querySelector(".epayco-button-render");
  if (defaultBtn) defaultBtn.remove();
});

document.querySelector("#btnEpayco").addEventListener("click", async function() {
  const form = document.querySelector("#compraForm");

  // 1️⃣ Validar campos obligatorios
  const requiredFields = form.querySelectorAll("[required]");
  let allValid = true;
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      allValid = false;
      field.classList.add("input-error");
    } else {
      field.classList.remove("input-error");
    }
  });
  if (!allValid) {
    alert("⚠️ Completa todos los campos obligatorios.");
    return;
  }

  // 2️⃣ Validar teléfono
  const telField = form.querySelector('input[name="entry.2100004347"]');
  if (!/^3\d{9}$/.test(telField.value.trim())) {
    alert("⚠️ El teléfono debe tener 10 dígitos y empezar con 3.");
    return;
  }

  // 3️⃣ Validar correo
  const emailField = form.querySelector('input[name="entry.1220188323"]');
  if (!/.+@.+\..+/.test(emailField.value.trim())) {
    alert("⚠️ Ingresa un correo válido.");
    return;
  }

  // 4️⃣ Generar invoice único
  const invoice = "FAC-" + Date.now();
  localStorage.setItem("pedido_invoice", invoice);

  // 5️⃣ Guardar campos del formulario
  const formData = new FormData(form);
  formData.forEach((valor, campo) => localStorage.setItem(campo, valor));

  // 6️⃣ Guardar oferta seleccionada (solo ID)
  const oferta = document.querySelector(".oferta-card.seleccionada");
  if (!oferta) {
    alert("⚠️ Selecciona una oferta.");
    return;
  }
  const productoId = oferta.dataset.id;
  localStorage.setItem("pedido_producto_id", productoId);
  localStorage.setItem("pedido_tipo_pago", "Epayco");

 // 7️⃣ Enviar datos al Google Form (sin precio)
const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdM98DnqirphOqYxkl1MLNfQyOh1gV4vTPjI9FpvIcFfuN2cw/formResponse";
const params = new URLSearchParams();

formData.forEach((valor, campo) => {
  if (campo !== "entry.1133296564" && campo !== "entry.1855797835") {
    params.append(campo, valor);
  }
});
params.append("entry.1133296564", productoId);
params.append("entry.1855797835", "Epayco");
params.append("entry.263702996", invoice);

fetch(googleFormUrl, {
  method: "POST",
  mode: "no-cors",
  headers: { "Content-Type": "application/x-www-form-urlencoded" }, // 🔑 este faltaba
  body: params.toString()
});

  // 8️⃣ Llamar a backend para crear la orden segura
  const response = await fetch("/.netlify/functions/crear-pago", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: productoId, invoice })
  });

  const data = await response.json();
  if (data.error) {
    alert("Error al crear el pago: " + data.error);
    return;
  }

  // 9️⃣ Abrir pasarela con los datos correctos desde backend
  const handler = ePayco.checkout.configure({
    key: data.publicKey,
    test: data.testMode
  });
  handler.open(data.checkoutData);
});