// netlify/functions/pedido.js
import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);

    // Aquí validas campos del pedido
    const { nombre, telefono, correo, oferta, cantidad, precio, tipoPago } = body;

    if (!nombre || !telefono || !correo || !oferta) {
      return { statusCode: 400, body: "Faltan datos obligatorios" };
    }

    // Validaciones adicionales
    if (!/^3\d{9}$/.test(telefono)) {
      return { statusCode: 400, body: "Teléfono inválido" };
    }
    if (!/@/.test(correo)) {
      return { statusCode: 400, body: "Correo inválido" };
    }

    // Enviar a Google Form
    const formData = new URLSearchParams();
    formData.append("entry.884366457", nombre);
    formData.append("entry.1133296564", oferta);
    formData.append("entry.2100004347", telefono);
    formData.append("entry.1220188323", correo);
    formData.append("entry.1855797835", tipoPago);

    await fetch("https://docs.google.com/forms/d/e/1FAIpQLSdM98DnqirphOqYxkl1MLNfQyOh1gV4vTPjI9FpvIcFfuN2cw/formResponse", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: "Error interno" };
  }
}