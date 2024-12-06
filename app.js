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



server.listen(8080,function(){
    console.log("Servidor escuchando en http://localhost:8080");
});


const axios = require("axios"); // Asegúrate de que axios esté instalado
const { Socket } = require('dgram');

// URL del ESP32 (ajusta si cambia la dirección IP)
const ESP32_URL = "http://192.168.205.11/datos";
const ESP32_URL_1 = "http://192.168.205.149/datos";
const ESP32_URL_2 = "http://192.168.205.199/datos";

// Función para obtener datos del ESP32
async function obtenerDatosESP32(url, sensor) {
    try {
        const respuesta = await axios.get(url);
        
        console.log("Datos recibidos del ESP32: ",sensor);
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


let urls = ['url1','url2','url3'];

async function  insertData(data,sensor){

    let sql = "INSERT INTO sensores ( temperaturaC, temperaturaF,humedad,ppmMQ135,ppmMQ135Compensado, ppmMQ4,ppmMQ4Compensado,humedadSuelo,releEstado, sensor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    conexion.query(sql,[
        data.temperaturaC,
        data.temperaturaF,
        data.humedad,
        data.ppmMQ135,
        data.ppmMQ135Compensado,
        data.ppmMQ4,
        data.ppmMQ4Compensado,
        data.humedadSuelo,
        data.releEstado,
        sensor
    ], (error) => {
    if (error) {
        console.error("Error al insertar en la base de datos:", error.message);
        
    } else {
        console.log(`Datos del ${sensor} guardados correctamente`);
        
    }
});
}
// Llama a la función cada 3 segundos
let intento = 1;
setInterval(async ()=>{
    try{
        const data_sensor = await obtenerDatosESP32(ESP32_URL, "Sensor 1");
        const data_sensor_2 = await obtenerDatosESP32(ESP32_URL_1, "Sensor 2");
        const data_sensor_3 = await obtenerDatosESP32(ESP32_URL_2, "Sensor 3");

        // const data_sensor_test = await Promise.all([        
            
        //     obtenerDatosESP32(url1),
        //     obtenerDatosESP32(url2),
        //     obtenerDatosESP32(url3)

        // ]);
        
        let sensores = {
            data_sensor,
            data_sensor_2,
            data_sensor_3
        }
        
        io.emit('data_sensores',sensores);

        if(intento === 10){
            //almacenar datos
            
            if (sensores.data_sensor) {
                
                //await insertData(sensores.data_sensor,'sensor_1');
            }
            if(sensores.data_sensor_2){
                //await insertData(sensores.data_sensor,'sensor_2');
            }
            if(sensores.data_sensor_3){
                //await insertData(sensores.data_sensor,'sensor_3');
            }

            intento = 0;
        }else{
            intento++;
        }
        
        
    }catch(error){
        console.log(error);
    }
}, 3000);



















// io.on('connection', (socket) => {
//     console.log("Usuario conectado");

//     // Evento cuando el cliente solicita guardar los datos
//     socket.on('guardarDatos', async () => {
//         try {
//             // Obtén los datos del ESP32
//            // const data = await obtenerDatosESP32();

//            const data = {
//             calidad_aire: 100,
//             temperatura_c: 18,
//             temperatura_f: 77,
//             humedad_suelo: 40,
//             humedad: 50,
//             gas_metano: 100,
//             metano_compensado: 130
//             };
            

//             if (data) {
//                 // Inserta los datos en la base de datos
//                 let query = `
//                    INSERT INTO lector_01 (calidad_aire, temperatura_c, temperatura_f, humedad_suelo, humedad, gas_metano, metano_compensado)
//                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

//                 conexion.query(query, [
//                     data.calidad_aire,
//                     data.temperatura_c,
//                     data.temperatura_f,
//                     data.humedad_suelo,
//                     data.humedad,
//                     data.gas_metano,
//                     data.metano_compensado
//                 ], (error) => {
//                     if (error) {
//                         console.error("Error al insertar en la base de datos:", error.message);
//                         socket.emit('confirmacion', 'Error al guardar los datos');
//                     } else {
//                         console.log("Datos guardados correctamente");
//                         socket.emit('confirmacion', 'Datos guardados exitosamente');
//                     }
//                 });
//             } else {
//                 socket.emit('confirmacion', 'No se recibieron datos válidos');
//             }
//         } catch (error) {
//             console.error("Error al obtener datos del ESP32:", error.message);
//             socket.emit('confirmacion', 'Error al obtener datos del ESP32');
//         }
//     });
// });

