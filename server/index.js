const axios = require("axios");

// URL del ESP32 (asegúrate de estar conectado a la red Wi-Fi del ESP32)
const url = "http://192.168.4.1/datos";

async function obtenerDatos() {
    try {
        // Realiza una solicitud GET al ESP32
        const respuesta = await axios.get(url);

        // Procesa los datos JSON
        const datos = respuesta.data;
        console.log("Datos recibidos:");
        console.log("Temperatura:", datos.temperatura);
        console.log("Humedad:", datos.humedad);
    } catch (error) {
        console.error("Error al conectar con el ESP32:", error.message);
    }
}

// Llama a la función periódicamente
setInterval(obtenerDatos, 5000); // Cada 5 segundos
