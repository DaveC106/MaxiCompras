// netlify/functions/pedido.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const { nombre, telefono, email, oferta } = body;

    const params = new URLSearchParams();
    params.append("entry.884366457", nombre);
    params.append("entry.2100004347", telefono);
    params.append("entry.1220188323", email);
    params.append("entry.1133296564", oferta);
    params.append("entry.1855797835", "Contra entrega");

    await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSdM98DnqirphOqYxkl1MLNfQyOh1gV4vTPjI9FpvIcFfuN2cw/formResponse",
      { method: "POST", body: params }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}