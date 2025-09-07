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

    // Construir el body en formato x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append("name", payload.oferta);
    params.append("description", "Compra en mi tienda");
    params.append("invoice", "ORD_" + Date.now());
    params.append("currency", "COP");
    params.append("amount", payload.total);
    params.append("tax_base", "0");
    params.append("tax", "0");
    params.append("country", "CO");
    params.append("lang", "es");
    params.append("external", "false");
    params.append("response", "https://maxicomprass.store/gracias-pedido.html");
    params.append("name_billing", payload.nombre);
    params.append("mobilephone_billing", payload.telefono);
    params.append("email_billing", payload.correo);
    params.append("address_billing", payload.direccion);

    console.log("=== Enviando petición a ePayco ===");
    console.log(params.toString());

    const response = await fetch("https://secure.epayco.co/checkout/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":
          "Basic " +
          Buffer.from(publicKey + ":" + privateKey).toString("base64"),
      },
      body: params.toString(),
    });

    const text = await response.text();
    console.log("=== Respuesta RAW de ePayco ===");
    console.log(text);

    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("Respuesta no es JSON, devolviendo texto crudo");
      return { statusCode: 200, body: JSON.stringify({ raw: text }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        checkoutUrl:
          result.data?.url ||
          result.data?.processUrl ||
          result.data?.url_checkout ||
          null,
        raw: result,
      }),
    };
  } catch (err) {
    console.error("=== Error general en la función ePayco ===");
    console.error(err);
    return { statusCode: 500, body: "Error interno" };
  }
}
