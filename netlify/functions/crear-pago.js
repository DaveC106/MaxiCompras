exports.handler = async (event) => {
  try {
    const { id, invoice } = JSON.parse(event.body || "{}");

    // Catálogo seguro en el backend
    const productos = {
      P1: { nombre: "Picador Eléctrico x1", precio: 64900 },
      P2: { nombre: "Picador Eléctrico x2", precio: 105900 },
      P3: { nombre: "Picador Eléctrico x3", precio: 149900 }
    };

    const producto = productos[id];
    if (!producto) {
      return { statusCode: 400, body: JSON.stringify({ error: "Producto inválido" }) };
    }

    // Config ePayco (usa testKey y publica si estás probando)
    const publicKey = "426d46ff6f33c145aa6cb638afe567be";

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
      response:  "https://maxicomprass.store/.netlify/functions/respuesta"
    };

    return {
      statusCode: 200,
      body: JSON.stringify({
        publicKey,
        testMode: false,
        checkoutData
      })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};