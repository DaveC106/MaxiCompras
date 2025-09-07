export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body);
    console.log("=== Payload recibido del frontend ===", payload);

    const publicKey = process.env.EPAYCO_PUBLIC_KEY;
    const privateKey = process.env.EPAYCO_PRIVATE_KEY;

    if (!publicKey || !privateKey) {
      console.error("Error: faltan llaves de ePayco en las variables de entorno");
      return { statusCode: 500, body: JSON.stringify({ error: "Faltan credenciales" }) };
    }

    // Datos para crear el checkout
    const checkoutData = {
      name: payload.oferta,
      description: "Compra en mi tienda",
      invoice: "ORD_" + Date.now(),
      currency: "COP",
      amount: payload.total,
      tax_base: "0",
      tax: "0",
      country: "CO",
      lang: "es",
      external: "false",
      response: "https://maxicomprass.store/gracias-pedido.html",
      confirmation: "https://maxicomprass.store/.netlify/functions/confirmacion",
      name_billing: payload.nombre,
      mobilephone_billing: payload.telefono,
      email_billing: payload.correo,
      address_billing: payload.direccion,
      test: "true" // Cambia a "false" en producción
    };

    console.log("=== Enviando a ePayco ===", checkoutData);

    const response = await fetch("https://apify.epayco.co/checkout/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + privateKey
      },
      body: JSON.stringify(checkoutData)
    });

    const text = await response.text();
    console.log("=== Respuesta RAW de ePayco ===", text);

    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("Respuesta no es JSON");
      return { statusCode: 500, body: JSON.stringify({ error: "Respuesta inválida de ePayco", raw: text }) };
    }

    if (result && result.data && (result.data.url || result.data.processUrl)) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          checkoutUrl: result.data.url || result.data.processUrl,
          raw: result
        })
      };
    } else {
      console.error("Error en respuesta de ePayco", result);
      return { statusCode: 500, body: JSON.stringify({ error: "No se pudo generar el checkout", raw: result }) };
    }

  } catch (err) {
    console.error("=== Error general en la función ePayco ===", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno" }) };
  }
}
