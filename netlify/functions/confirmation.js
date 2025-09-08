const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const data = event.queryStringParameters;
  const referencia = data.x_id_invoice || "";
  const estado = data.x_response || "";
  const monto = data.x_amount || "";
  const nombre = data.x_customer_name || "Cliente";
  const correoCliente = data.x_customer_email || "";

  // 🔑 Configurar transporte para Gmail con App Password
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: "ventasmaxicompras@gmail.com",  // tu correo
      pass: "lsnc ezto ywyu hpac"           // tu App Password de 16 caracteres
    }
  });

  if (estado === "Aceptada" && correoCliente) {
    const asunto = "✅ Tu pedido ha sido aprobado - MaxiCompras";
    const cuerpoHTML = `
      <p>Hola <b>${nombre}</b>,</p>
      <p>Gracias por comprar en <b>MaxiCompras</b>.</p>
      <p>Tu pedido ha sido aprobado satisfactoriamente y será enviado lo más pronto posible.</p>
      <p>Si tienes alguna duda respecto a los tiempos de entrega o cualquier otra consulta, no olvides escribirnos a nuestro WhatsApp: <b>+57 305 4469490</b>.</p>
      <hr>
      <p><small>Gracias por confiar en nosotros.</small></p>
    `;
    const cuerpoTexto = `
Hola ${nombre},

Gracias por comprar en MaxiCompras.

Tu pedido ha sido aprobado satisfactoriamente y será enviado lo más pronto posible.

Si tienes alguna duda respecto a los tiempos de entrega o cualquier otra consulta, no olvides escribirnos a nuestro WhatsApp: +57 305 4469490

Gracias por confiar en nosotros.
    `;

    try {
      await transporter.sendMail({
        from: `"MaxiCompras" <ventasmaxicompras@gmail.com>`,
        to: correoCliente,
        subject: asunto,
        text: cuerpoTexto,
        html: cuerpoHTML
      });

      return {
        statusCode: 200,
        body: "Pago validado y correo enviado correctamente"
      };
    } catch (err) {
      console.error("Error enviando correo:", err);
      return {
        statusCode: 500,
        body: "Pago aprobado pero error enviando correo"
      };
    }
  } else {
    return {
      statusCode: 200,
      body: "Pago no aceptado: " + estado
    };
  }
};
