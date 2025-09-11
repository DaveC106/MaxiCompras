const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    const data = event.queryStringParameters;
    const referencia = data.x_id_invoice || "";
    const estado = data.x_response || "";
    const monto = data.x_amount || "";

    if (estado === "Aceptada") {
      // Leer pedidos.json
     const pedidosPath = path.join(__dirname, "pedidos.json");
let pedidos = [];
if (fs.existsSync(pedidosPath)) {
  const pedidosRaw = fs.readFileSync(pedidosPath, "utf8");
  pedidos = pedidosRaw.trim() ? JSON.parse(pedidosRaw) : [];
}
      // Buscar pedido por invoice
      const pedido = pedidos.find(p => p.invoice === referencia);
      if (!pedido) return { statusCode: 404, body: "Pedido no encontrado" };

      // Configuración del transporte de Gmail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
        }
      });

      // Correo a enviar solo a ti con todos los datos
      const mailOptions = {
        from: `"MaxiCompras" <${process.env.GMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `Pago recibido - Ref: ${referencia}`,
        text: `Hola, se ha recibido un pago correctamente.\n\nReferencia: ${referencia}\nMonto: ${monto}\nEstado: ${estado}\n\nDatos del comprador:\nNombre: ${pedido.nombre}\nCelular: ${pedido.celular}\nCorreo: ${pedido.correo}\nDepartamento: ${pedido.departamento}\nMunicipio: ${pedido.municipio}\nDirección: ${pedido.direccion}\nOferta: ${pedido.oferta}\nProducto: ${pedido.producto}\nPrecio: ${pedido.precio}`
      };

      await transporter.sendMail(mailOptions);

      return { statusCode: 200, body: "Pago validado y correo enviado a ADMIN" };
    } else {
      return { statusCode: 200, body: "Pago no aceptado: " + estado };
    }
  } catch (err) {
    return { statusCode: 500, body: "Error al procesar la confirmación: " + err.message };
  }
};
