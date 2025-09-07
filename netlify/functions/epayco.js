export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body);
    console.log("=== Payload recibido del frontend ===");
    console.log(payload);

    const publicKey = process.env.EPAYCO_PUBLIC_KEY;
    const privateKey = process.env.EPAYCO_PRIVATE_KEY;

    if (!publicKey || !privateKey) {
      console.error("Error: faltan llaves de ePayco en las variables de entorno");
      return { statusCode: 500, body: "Faltan credenciales" };
    }

    console.log("=== Enviando petición a ePayco ===");
    console.log({
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
      name_billing: payload.nombre,
      mobilephone_billing: payload.telefono,
      email_billing: payload.correo,
      address_billing: payload.direccion
    });

    const response = await fetch("https://api.secure.payco.co/checkout/v1/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(publicKey + ":" + privateKey).toString("base64")
      },
      body: JSON.stringify({
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
        name_billing: payload.nombre,
        mobilephone_billing: payload.telefono,
        email_billing: payload.correo,
        address_billing: payload.direccion
      })
    });

    const result = await response.json();
    console.log("=== Respuesta de ePayco ===");
    console.log(result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        checkoutUrl: result.data?.url || result.data?.processUrl || result.data?.url_checkout || null,
        raw: result // respuesta completa para revisarla si toca
      })
    };

  } catch (err) {
    console.error("=== Error general en la función ePayco ===");
    console.error(err);
    return { statusCode: 500, body: "Error interno" };
  }
}
