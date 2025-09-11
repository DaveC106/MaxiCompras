const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    const { id, invoice, nombre, celular, correo, departamento, municipio, direccion, oferta } = JSON.parse(event.body || "{}");

    const productos = {
      P1: { nombre: "Picador Eléctrico x1", precio: 64900 },
      P2: { nombre: "Picador Eléctrico x2", precio: 105900 },
      P3: { nombre: "Picador Eléctrico x3", precio: 149900 }
    };

    const producto = productos[id];
    if (!producto) return { statusCode: 400, body: JSON.stringify({ error: "Producto inválido" }) };

    const checkoutData = {
      name: producto.nombre,
      description: producto.nombre,
      invoice: invoice,
      currency: "cop",
      amount: producto.precio,
      country: "co",
      lang: "es",
      external: "true",
      confirmation: "https://maxicomprass.store/.netlify/functions/confirmation",
      response: "https://maxicomprass.store/respuesta.html"
    };

    // Guardar datos en pedidos.json
    const pedidosPath = path.join(__dirname, "pedidos.json");
    const pedidos = JSON.parse(fs.readFileSync(pedidosPath, "utf8") || "[]");

    pedidos.push({ invoice, id, producto: producto.nombre, precio: producto.precio, nombre, celular, correo, departamento, municipio, direccion, oferta });
    fs.writeFileSync(pedidosPath, JSON.stringify(pedidos, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ publicKey: "426d46ff6f33c145aa6cb638afe567be", testMode: true, checkoutData })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
