const express = require('express');
const http = require('http');
const socketIo = require('socket.io');


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
const ESP32_URL = "http://192.168.0.132/datos";

// Función para obtener datos del ESP32
async function obtenerDatosESP32() {
    try {
        const respuesta = await axios.get(ESP32_URL);
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
        const data = await obtenerDatosESP32();
        io.emit('data',{
            temperaturaC: data.temperaturaC,
            temperaturaF: data.temperaturaF,
            humedad: data.humedad,
            //Calidad del aire
            ppmMQ135: data.ppmMQ135,
            //Calidad del aire compensado
            ppmMQ135Compensado: data.ppmMQ135Compensado,
            //Metano
            ppmMQ4: data.ppmMQ4,
            //metano compensado
            ppmMQ4Compensado: data.ppmMQ4Compensado,
            //humedad del suelo
            humedadSuelo: data.humedadSuelo,
            //ReleEstado
            estado:data.releEstado
        });
    }catch(error){
        console.log(error);
    }
     
}, 1650);

