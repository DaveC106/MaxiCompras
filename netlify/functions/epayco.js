// netlify/functions/epayco.js
import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body);

    // 1. Configuración de tus llaves (guardarás en variables de entorno en Netlify)
    const publicKey = process.env.EPAYCO_PUBLIC_KEY;
    const privateKey = process.env.EPAYCO_PRIVATE_KEY;

    // 2. Crear la petición a ePayco (checkout onpage estándar)
    const response = await fetch("https://api.secure.payco.co/checkout/v1/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(publicKey + ":" + privateKey).toString("base64")
      },
      body: JSON.stringify({
        // Datos mínimos del pago
        name: payload.oferta,
        description: "Compra en mi tienda",
        invoice: "ORD_" + Date.now(), // número único de orden
        currency: "COP",
        amount: payload.total,
        tax_base: "0",
        tax: "0",
        country: "CO",
        lang: "es",
        external: "false", // si quieres que cargue onpage
        response: "https://maxicomprass.store/gracias-pedido.html", // redirección después del pago
        // Cliente
        name_billing: payload.nombre,
        mobilephone_billing: payload.telefono,
        email_billing: payload.correo,
        address_billing: payload.direccion
      })
    });

    const result = await response.json();

    // 3. Responder al frontend con la URL del checkout
    return {
      statusCode: 200,
      body: JSON.stringify({
        checkoutUrl: result.data?.url
      })
    };

  } catch (err) {
    console.error("Error ePayco:", err);
    return { statusCode: 500, body: "Error interno" };
  }
}