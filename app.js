const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

//realisamos la conexion a la base de datos
const conexion = require('./lib/conexion.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);




//esta carpeta va hacer enviada a todos nuestros clientes
//que se conecten a nuestro servidor
app.use(express.static(__dirname + '/public'));



server.listen(80,function(){
    console.log("Servidor escuchando en http://localhost:80");
});


const axios = require("axios"); // Asegúrate de que axios esté instalado
const { Socket } = require('dgram');

// URL del ESP32 (ajusta si cambia la dirección IP)
const ESP32_URL = "http://192.168.205.11/datos";
const ESP32_URL_1 = "http://192.168.0.133/datos";
const ESP32_URL_2 = "http://192.168.0.134/datos";

// Función para obtener datos del ESP32
async function obtenerDatosESP32(url) {
    try {
        const respuesta = await axios.get(url);
        
        console.log("Datos recibidos del ESP32:");
        //console.log("Temperatura:", respuesta.data.temperatura);
       // console.log("Humedad:", respuesta.data.humedad);
       console.log(JSON.stringify(respuesta.data));

        
        //document.getElementById(respuesta.data.humedad);
        return respuesta.data;
    } catch (error) {
        console.error("Error al obtener datos del ESP32:", error.message);
    }
}
io.on('connection',(socket)=>{
    console.log("connected");

    socket.on('data',(msg)=>{
        io.emit(data, msg);
    })
})



// Llama a la función cada 5 segundos
setInterval(async ()=>{
    try{
        const data_sensor = await obtenerDatosESP32(ESP32_URL);
        //const data_sensor_2 = await obtenerDatosESP32(ESP32_URL_1);
        //const data_sensor_3 = await obtenerDatosESP32(ESP32_URL_2);
    
        if(data_sensor){
            
            io.emit('data_sensor',{
                temperaturaC: data_sensor.temperaturaC,
                temperaturaF: data_sensor.temperaturaF,
                humedad: data_sensor.humedad,
                //Calidad del aire
                ppmMQ135: data_sensor.ppmMQ135,
                //Calidad del aire compensado
                ppmMQ135Compensado: data_sensor.ppmMQ135Compensado,
                //Metano
                ppmMQ4: data_sensor.ppmMQ4,
                //metano compensado
                ppmMQ4Compensado: data_sensor.ppmMQ4Compensado,
                //humedad del suelo
                humedadSuelo: data_sensor.humedadSuelo,
                //ReleEstado
                estado:data_sensor.releEstado
            });
            
        }
        
        
    }catch(error){
        console.log(error);
    }
}, 3000);



















io.on('connection', (socket) => {
    console.log("Usuario conectado");

    // Evento cuando el cliente solicita guardar los datos
    socket.on('guardarDatos', async () => {
        try {
            // Obtén los datos del ESP32
           // const data = await obtenerDatosESP32();

           const data = {
            calidad_aire: 100,
            temperatura_c: 18,
            temperatura_f: 77,
            humedad_suelo: 40,
            humedad: 50,
            gas_metano: 100,
            metano_compensado: 130
            };
            

            if (data) {
                // Inserta los datos en la base de datos
                let query = `
                   INSERT INTO lector_01 (calidad_aire, temperatura_c, temperatura_f, humedad_suelo, humedad, gas_metano, metano_compensado)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;

                conexion.query(query, [
                    data.calidad_aire,
                    data.temperatura_c,
                    data.temperatura_f,
                    data.humedad_suelo,
                    data.humedad,
                    data.gas_metano,
                    data.metano_compensado
                ], (error) => {
                    if (error) {
                        console.error("Error al insertar en la base de datos:", error.message);
                        socket.emit('confirmacion', 'Error al guardar los datos');
                    } else {
                        console.log("Datos guardados correctamente");
                        socket.emit('confirmacion', 'Datos guardados exitosamente');
                    }
                });
            } else {
                socket.emit('confirmacion', 'No se recibieron datos válidos');
            }
        } catch (error) {
            console.error("Error al obtener datos del ESP32:", error.message);
            socket.emit('confirmacion', 'Error al obtener datos del ESP32');
        }
    });
});

