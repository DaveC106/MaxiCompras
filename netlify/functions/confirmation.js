const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const data = event.queryStringParameters;
    const referencia = data.x_id_invoice || "";
    const estado = data.x_response || "";
    const monto = data.x_amount || "";

    if (estado === "Aceptada") {
      // Configuración del transporte de Gmail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER, // tu correo Gmail
          pass: process.env.GMAIL_PASS  // tu app password
        }
      });

      // Correo a enviar solo a ti
      const mailOptions = {
        from: `"MaxiCompras" <${process.env.GMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL, // siempre tu correo
        subject: `Pago recibido - Ref: ${referencia}`,
        text: `Hola, se ha recibido un pago correctamente.\n\nReferencia: ${referencia}\nMonto: ${monto}\nEstado: ${estado}`
      };

      await transporter.sendMail(mailOptions);

      return {
        statusCode: 200,
        body: "Pago validado y correo enviado a ADMIN"
      };
    } else {
      return {
        statusCode: 200,
        body: "Pago no aceptado: " + estado
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: "Error al procesar la confirmación: " + err.message
    };
  }
};
