
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    updateChartsTheme();
}

function updateChartsTheme() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const backgroundColor = isDarkTheme ? '#333' : '#fff';
    const textColor = isDarkTheme ? '#fff' : '#333';
    if (airQualityGauge) {
        airQualityGauge.data.datasets[0].backgroundColor[1] = isDarkTheme ? '#444' : '#e5e7eb';
        airQualityGauge.update();
    }
}



const socket = io();


// socket.on('data_sensor',(data_sensor) =>{
//     console.log(data_sensor);
//    let temperature1 = document.getElementById('temperaturec');
//    temperature1.innerHTML = `${data_sensor.temperaturaC || 0}`;
// });



// socket.on('data_sensor_2',(data_sensor_2) =>{
//     console.log(data_sensor_2);
//    let temperature2 = document.getElementById('temperaturec2');
//    temperature2.innerHTML = `${data_sensor_2.temperaturaC || 0}`;
// });


// socket.on('data_sensor_3',(data_sensor_3) =>{
//     console.log(data_sensor_3);
//    let temperature3 = document.getElementById('temperaturec3');
//    temperature3.innerHTML = `${data_sensor_3.temperaturaC || 0}`;
// });









// socket.on('data_sensor',(data_sensor) =>{
//     console.log(data_sensor);
//    let temperatureF = document.getElementById('temperaturef');
//    temperatureF.innerHTML = `${data_sensor.temperaturaF || 0}`;
// });

// socket.on('data_sensor_2',(data_sensor_2) =>{
//     console.log(data_sensor_2);
//    let temperatureF = document.getElementById('temperaturef2');
//    temperatureF.innerHTML = `${data_sensor_2.temperaturaF || 0}`;
// });


// socket.on('data_sensor_3',(data_sensor_3) =>{
//     console.log(data_sensor_3);
//    let temperatureF = document.getElementById('temperaturef2');
//    temperatureF.innerHTML = `${data_sensor_2.temperaturaF || 0}`;
// });










// socket.on('data_sensor',(data_sensor) =>{
//     console.log(data_sensor);
//    let humedadSuelo = document.getElementById('humedadSuelo');
//    humedadSuelo.innerHTML = `${data_sensor.humedadSuelo || 0}`;
// });


// socket.on('data_sensor_2',(data_sensor_2) =>{
//     console.log(data_sensor_2);
//    let humedadSuelo = document.getElementById('humedadSuelo2');
//    humedadSuelo.innerHTML = `${data_sensor_2.humedadSuelo || 0}`;
// });


// socket.on('data_sensor_3',(data_sensor_3) =>{
//     console.log(data_sensor_3);
//    let humedadSuelo = document.getElementById('humedadSuelo3');
//    humedadSuelo.innerHTML = `${data_sensor_3.humedadSuelo || 0}`;
// });













// socket.on('data_sensor', (data_sensor) => {
//     console.log(data_sensor);
//    let humedad = document.getElementById('humedad');
//    humedad.innerHTML = `${data_sensor.humedad || 0}`;
// });


// socket.on('data_sensor_2', (data_sensor_2) => {
//     console.log(data_sensor_2);
//    let humedad = document.getElementById('humedad2');
//    humedad.innerHTML = `${data_sensor_2.humedad || 0}`;
// });


// socket.on('data_sensor_3', (data_sensor_3) => {
//     console.log(data_sensor_3);
//    let humedad = document.getElementById('humedad3');
//    humedad.innerHTML = `${data_sensor_3.humedad || 0}`;
// });



















// socket.on('data_sensor', (data_sensor) => {
//     console.log(data_sensor);
//    let ppmMQ4 = document.getElementById('gas');
//    ppmMQ4.innerHTML = `${data_sensor.ppmMQ4 || 0}`;
// });

// socket.on('data_sensor_2', (data_sensor_2) => {
//     console.log(data_sensor_2);
//    let ppmMQ4 = document.getElementById('gas2');
//    ppmMQ4.innerHTML = `${data_sensor_2.ppmMQ4 || 0}`;
// });

// socket.on('data_sensor_3', (data_sensor_3) => {
//     console.log(data_sensor_3);
//    let ppmMQ4 = document.getElementById('gas3');
//    ppmMQ4.innerHTML = `${data_sensor_3.ppmMQ4 || 0}`;
// });















// socket.on('data_sensor',(data_sensor) =>{
//    console.log(data_sensor);
//    let ppmMQ4Compensado = document.getElementById('gasCompensado');
//    ppmMQ4Compensado.innerHTML = `${data_sensor.ppmMQ4Compensado || 0}`;
// });



// socket.on('data_sensor_2',() =>{
//     console.log(data_sensor_2);
//     let ppmMQ4Compensado = document.getElementById('gasCompensado2');
//     ppmMQ4Compensado.innerHTML = `${data_sensor_2.ppmMQ4Compensado || 0}`;
// });



// socket.on('data_sensor_3',(data_sensor_3) =>{
//     console.log(data_sensor_3);
//     let ppmMQ4Compensado = document.getElementById('gasCompensado3');
//     ppmMQ4Compensado.innerHTML = `${data_sensor_3.ppmMQ4Compensado || 0}`;
// });
















socket.on('data_sensores',(sensor) =>{
    
    if(sensor.data_sensor !== undefined){
        console.log("SENSOR: 1 ",sensor.data_sensor);
        let data = sensor.data_sensor;
        let temperature = document.getElementById('ppmcalidadeaire');
        temperature.innerHTML = `${data.ppmMQ135Compensado || 0}PPM`;

        let humedad = document.getElementById('humedad');
        humedad.innerHTML = `${data.humedad || 0}%`;

        let temperaturaC = document.getElementById('temperaturaC');
        temperaturaC.innerHTML = `${data.temperaturaC || 0}`;

        let temperaturaF = document.getElementById('temperaturaF'); 
        temperaturaF.innerHTML = `${data.temperaturaF || 0}`;

        let humedadSuelo = document.getElementById('humedadSuelo');
        humedadSuelo.innerHTML = `${data.humedadSuelo || 0}`;

        let gas =document.getElementById('gas');
        gas.innerHTML = `${data.gas || 0}`;

        let gasCompensado = document.getElementById('gasCompensado');
        gasCompensado.innerHTML = `${data.gasCompensado || 0}`;

        
        let ppmMQ135Value = data.ppmMQ135 || 0;
        let airQualityPercentage = ((ppmMQ135Value / 10000) * 100).toFixed(1);
        if(airQualityPercentage > 100){
            airQualityPercentage = 100;
        }
        let ppmMQ135Element = document.getElementById('ppmMQ135');
        ppmMQ135Element.innerHTML = `${airQualityPercentage}%`;
        if(!airQualityGauge){
            initCharts();
        }else{
            actualizarChart(airQualityPercentage || 0);
        }

    }else{
        console.log("SENSOR: 1: Fallo al recibir la data",);
    }

    if(sensor.data_sensor_2 !== undefined){
        let data_2 = sensor.data_sensor_2;
        console.log("SENSOR: 2 ",sensor.data_sensor);

        let ppmcalidadeaire2 = document.getElementById('ppmcalidadeaire2');
        ppmcalidadeaire2.innerHTML = `${data_2.ppmMQ135Compensado || 0}PPM`;

        let temperatura = document.getElementById('temperaturec');
        temperatura.innerHTML = `${data_2.temperaturaC || 0}`;

        let temperaturaF = document.getElementById('temperaturef');
        temperaturaF.innerHTML = `${data_2.temperaturaF || 0}`;

        let humedad2 = document.getElementById('humedad2');
        humedad2.innerHTML = `${data_2.humedad || 0}`;

        let humedadSuelo2 = document.getElementById('humedadSuelo2');
        humedadSuelo2.innerHTML = `${data_2.humedadSuelo || 0}`;


        let gas2 = document.getElementById('gas2');
        gas2.innerHTML = `${data_2.gas || 0}`;

        let gasCompensado2 = document.getElementById('gasCompensado2');
        gasCompensado2.innerHTML = `${data_2.gasCompensado || 0}`;

        let ppmMQ135Value = data_2.ppmMQ135 || 0;
        let airQualityPercentage = ((ppmMQ135Value / 10000) * 100).toFixed(1);
        if(airQualityPercentage > 100){
            airQualityPercentage = 100;
        }
        let ppmMQ135Element = document.getElementById('ppmMQ1352');
        ppmMQ135Element.innerHTML = `${airQualityPercentage}%`;
        if(!airQualityGauge2){
            initCharts2();
        }else{
            actualizarChart2(airQualityPercentage || 0);
        }

    }else{
        console.log("SENSOR: 2: Fallo al recibir la data",);
    }

    if(sensor.data_sensor_3 !== undefined){
        let data_3 = sensor.data_sensor_3;
        console.log("SENSOR 3 :",data_3);   
        
        let ppmcalidadeaire3 = document.getElementById('ppmcalidadeaire3');
        ppmcalidadeaire3.innerHTML = `${data_3.ppmMQ135Compensado || 0}PPM`;

        let temperaturaC3 = document.getElementById('temperaturaC3');
        temperaturaC3.innerHTML = `${data_3.temperaturaC || 0}`;

        let temperaturaF3 = document.getElementById('temperaturaF3');
        temperaturaF3.innerHTML = `${data_3.temperaturaF || 0}`;

        let humedad3 = document.getElementById('humedad3');
        humedad3.innerHTML = `${data_3.humedad || 0}`;

        let humedadSuelo3 = document.getElementById('humedadSuelo3');
        humedadSuelo3.innerHTML = `${data_3.humedadSuelo || 0}`;


        let gas3 = document.getElementById('gas3');
        gas3.innerHTML = `${data_3.gas || 0}`;

        let gasCompensado3 = document.getElementById('gasCompensado3');
        gasCompensado3.innerHTML = `${data_3.gasCompensado || 0}`;

        let ppmMQ135Value = data_3.ppmMQ135 || 0;
        let airQualityPercentage = ((ppmMQ135Value / 10000) * 100).toFixed(1);
        if(airQualityPercentage > 100){
            airQualityPercentage = 100;
        }
        let ppmMQ135Element = document.getElementById('ppmMQ1353');
        ppmMQ135Element.innerHTML = `${airQualityPercentage}%`;
        if(!airQualityGauge3){
            initCharts3();
        }else{
            actualizarChart3(airQualityPercentage || 0);
        }
    }

   
});


socket.on('data_sensor_2',(data_sensor_2) =>{
    console.log(data_sensor_2);
   let temperature = document.getElementById('ppmcalidadeaire2');
   temperature.innerHTML = `${data_sensor_2.ppmMQ135Compensado || 0}PPM`;
});


socket.on('data_sensor_3',(data_sensor_3) =>{
    console.log(data_sensor_3);
   let temperature = document.getElementById('ppmcalidadeaire3');
   temperature.innerHTML = `${data_sensor_3.ppmMQ135Compensado || 0}PPM`;

   let ppmMQ135Value = data.ppmMQ135 || 0;
        let airQualityPercentage = ((ppmMQ135Value / 10000) * 100).toFixed(1);
        if(airQualityPercentage > 100){
            airQualityPercentage = 100;
        }
        let ppmMQ135Element = document.getElementById('ppmMQ135');
        ppmMQ135Element.innerHTML = `${airQualityPercentage}%`;
        actualizarChart(airQualityPercentage || 0, 'airQualityGauge3');
});
















let airQualityGauge = null; // Variable global

function initCharts() {
    const ctx = document.getElementById('airQualityGauge');
    airQualityGauge = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [0, 500], // Valores iniciales
                backgroundColor: ['#22c55e', '#e5e7eb'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '80%',
            responsive: true,
            maintainAspectRatio: false,
            circumference: 180,
            rotation: 270,
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            },
            animation: false
        }
    });
}

function actualizarChart(valor) {
    if (airQualityGauge) {
        airQualityGauge.destroy();
    }

    airQualityGauge = new Chart(document.getElementById('airQualityGauge'), {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [valor, 100 - valor],
                backgroundColor: ['#22c55e', '#e5e7eb'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '80%',
            responsive: true,
            maintainAspectRatio: false,
            circumference: 180,
            rotation: 270,
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            },
            animation: false
        }
    });
}

let airQualityGauge2 = null

function initCharts2() {
    airQualityGauge2 = new Chart(document.getElementById('airQualityGauge2'), {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [0, 500],
                backgroundColor: ['#22c55e', '#e5e7eb'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '80%',
            responsive: true,
            maintainAspectRatio: false,
            circumference: 180,
            rotation: 270,
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            }
        }
    });

}
function actualizarChart2(valor) {
    if (airQualityGauge2) {
        airQualityGauge2.destroy();
    }

    airQualityGauge2 = new Chart(document.getElementById('airQualityGauge2'), {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [valor, 100 - valor],
                backgroundColor: ['#22c55e', '#e5e7eb'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '80%',
            responsive: true,
            maintainAspectRatio: false,
            circumference: 180,
            rotation: 270,
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            },
            animation: false
        }
    });
}

let airQualityGauge3 = null;

function initCharts3() {
    airQualityGauge3 = new Chart(document.getElementById('airQualityGauge3'), {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [0, 500],
                backgroundColor: ['#22c55e', '#e5e7eb'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '80%',
            responsive: true,
            maintainAspectRatio: false,
            circumference: 180,
            rotation: 270,
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            }
        }
    });

}
function actualizarChart3(valor) {
    if (airQualityGauge3) {
        airQualityGauge3.destroy();
    }

    airQualityGauge3 = new Chart(document.getElementById('airQualityGauge3'), {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [valor, 100 - valor],
                backgroundColor: ['#22c55e', '#e5e7eb'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '80%',
            responsive: true,
            maintainAspectRatio: false,
            circumference: 180,
            rotation: 270,
            plugins: {
                tooltip: { enabled: false },
                legend: { display: false }
            },
            animation: false
        }
    });
}

