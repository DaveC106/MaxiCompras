exports.handler = async (event) => {
  try {
    const ref = event.queryStringParameters?.ref_payco;

    // Validar que exista ref_payco
    if (!ref) {
      return {
        statusCode: 302,
        headers: { Location: "https://maxicomprass.store/picador-electrico" }
      };
    }

    // HTML de respuesta
    const html = `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gracias por Comprar</title>
    <style>
        body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            background: #c4c4c4;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            text-align: center;
        }

        .container {
            background: rgba(255, 255, 255, 0.4);
            padding: 30px 40px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: fadeIn 1s ease-out;
            max-width: 400px;
            width: 90%;
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 20px;
        }

        p {
            font-size: 1rem;
            margin-bottom: 25px;
        }

        .logo {
            width: 100px;
            margin-bottom: 20px;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }

        .button {
            background: linear-gradient(180deg, #0FFF00 0%, #0AAC00 100%);
            color: #fff;
            padding: 12px 25px;
            font-size: 1rem;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: transform 0.2s, box-shadow 0.2s;
            animation: pulse-glow 1s ease-in-out infinite;
        }

        .button:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        @keyframes pulse-glow {
            0% { transform: scale(1); box-shadow: 0 0 0px #03f33b; }
            50% { transform: scale(0.97); box-shadow: 0 0 0px #099b0b; }
            100% { transform: scale(1); box-shadow: 0 0 30px 10px rgba(3, 218, 85, 0.5); }
        }

        /* Responsive */
        @media (max-width: 480px) {
            .container { padding: 20px 25px; }
            h1 { font-size: 1.5rem; }
            p { font-size: 0.9rem; }
            .logo { width: 80px; }
            .button { padding: 10px 20px; font-size: 0.9rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <img class="logo" src="https://maxicomprass.store/img/logomaxicompras.webp" alt="Logo MaxiCompras">
        <h1>¡Gracias por Comprar en MaxiCompras!</h1>
        <p>Tu pedido ha sido confirmado y recibido. Pronto lo recibirás en tu domicilio.</p>
        <a class="button" href="https://maxicomprass.store/picador-electrico">Volver a Comprar</a>
    </div>

    <script>
        // Redirigir automáticamente después de 5 segundos
        setTimeout(() => {
            window.location.href = "https://maxicomprass.store/picador-electrico";
        }, 10000);
    </script>
</body>
</html>

    `;

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Error al generar la página de respuesta: " + err.message
    };
  }
};
