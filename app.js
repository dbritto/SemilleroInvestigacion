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
const ESP32_URL = "http://192.168.0.105/datos";
const ESP32_URL_1 = "http://192.168.76.149/datos";
const ESP32_URL_2 = "http://192.168.76.11/datos";

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

function generarDatos() {
    return {
        temperaturaC: (Math.random() * 15 + 20).toFixed(2), // Temperatura entre 20 y 35
        temperaturaF: (Math.random() * 27 + 68).toFixed(2), // Temperatura entre 68 y 95
        humedad: (Math.random() * 30 + 40).toFixed(2),      // Humedad entre 40% y 70%
        ppmMQ135: Math.floor(Math.random() * 6000 + 6500),    // PPM entre 150 y 250
        ppmMQ135Compensado: Math.floor(Math.random() * 800 + 1400), // PPM entre 140 y 220
        ppmMQ4: Math.floor(Math.random() * 50 + 80),        // PPM entre 80 y 130
        ppmMQ4Compensado: Math.floor(Math.random() * 40 + 70), // PPM entre 70 y 110
        humedadSuelo: Math.floor(Math.random() * 50 + 20),  // Humedad entre 20% y 70%
        releEstado: Math.random() > 0.5 ? 1 : 0,           // Estado ON/OFF aleatorio
        sensor: "SensorSimulado"
    };
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
        let data_sensor = await generarDatos();
        //let data_sensor = await obtenerDatosESP32(ESP32_URL, "Sensor 1");
        let data_sensor_2 = await obtenerDatosESP32(ESP32_URL_1, "Sensor 2");
        let data_sensor_3 = await obtenerDatosESP32(ESP32_URL_2, "Sensor 3");

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

        if(intento === 5){
            //almacenar datos
            
            if (sensores.data_sensor) {
                
                //await insertData(sensores.data_sensor,'sensor_1');
                console.log("Datos a insertar:", sensores.data_sensor);
                console.log("Sensor:", sensores.data_sensor.sensor);

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
}, 1000);



















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



setInterval(consultData, 3000);

async function consultData() {
    const sql = `
        SELECT
        ROUND(AVG(sensores.ppmMQ135), 2) AS promedio_ppmMQ135, 
        ROUND(AVG(sensores.ppmMQ135Compensado), 2) AS promedio_ppmMQ135Compensado, 
        ROUND(AVG(sensores.temperaturaC), 2) AS promedio_temperaturaC, 
        ROUND(AVG(sensores.temperaturaF), 2) AS promedio_temperaturaF, 
        ROUND(AVG(sensores.humedad), 2) AS promedio_humedad, 
        ROUND(AVG(sensores.humedadSuelo), 2) AS promedio_humedadSuelo, 
        ROUND(AVG(sensores.ppmMQ4), 2) AS promedio_ppmMQ4, 
        ROUND(AVG(sensores.ppmMQ4Compensado), 2) AS promedio_ppmMQ4Compensado, 
        sensores.fecha AS fecha, sensores.sensor
        FROM sensores 
        WHERE sensores.fecha < current_timestamp() 
        GROUP BY DATE(sensores.fecha), sensores.sensor 
        ORDER BY sensores.sensor ASC, fecha
    `;

    conexion.query(sql, (error, result) => {
        if (error) {
            console.error("Error en la consulta Backend: ", error.message);
        }

        //Convertir el resultado en formato JSON
        let jsonFileName = './resultData.json';
        let jsonData = JSON.stringify(result, null, 2); // JSON bien formateado

        //Guardar los datos en un archivo JSON
        // fs.writeFile(jsonFileName, jsonData, 'utf8', (err) => {
            // if (err) {
            //     console.error("Error al guardar el archivo JSON:", err.message);
            // } else {
            //     console.log(`Datos guardados exitosamente en ${jsonFileName}`);
                // Emitir los datos JSON a través de Socket.IO
        io.emit('data_sql', result);
        console.log("Consulta exitosa Backend");
            // }
    });
};
