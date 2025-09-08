exports.handler = async (event) => {
  const data = event.queryStringParameters;
  const referencia = data.x_id_invoice || "";
  const estado = data.x_response || "";
  const monto = data.x_amount || "";

  // Validamos pago
  if (estado === "Aceptada") {
    return {
      statusCode: 200,
      body: "Pago validado correctamente"
    };
  } else {
    return {
      statusCode: 200,
      body: "Pago no aceptado: " + estado
    };
  }
};