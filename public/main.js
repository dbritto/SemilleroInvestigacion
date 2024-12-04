const socket = io();


socket.on('data_sensor',(data_sensor) =>{
    console.log(data_sensor);
   let temperature1 = document.getElementById('temperaturec');
   temperature1.innerHTML = `${data_sensor.temperaturaC || 0}`;
});



socket.on('data_sensor_2',(data_sensor_2) =>{
    console.log(data_sensor_2);
   let temperature2 = document.getElementById('temperaturec2');
   temperature2.innerHTML = `${data_sensor_2.temperaturaC || 0}`;
});


socket.on('data_sensor_3',(data_sensor_3) =>{
    console.log(data_sensor_3);
   let temperature3 = document.getElementById('temperaturec3');
   temperature3.innerHTML = `${data_sensor_3.temperaturaC || 0}`;
});









socket.on('data_sensor',(data_sensor) =>{
    console.log(data_sensor);
   let temperatureF = document.getElementById('temperaturef');
   temperatureF.innerHTML = `${data_sensor.temperaturaF || 0}`;
});

socket.on('data_sensor_2',(data_sensor_2) =>{
    console.log(data_sensor_2);
   let temperatureF = document.getElementById('temperaturef2');
   temperatureF.innerHTML = `${data_sensor_2.temperaturaF || 0}`;
});


socket.on('data_sensor_3',(data_sensor_3) =>{
    console.log(data_sensor_3);
   let temperatureF = document.getElementById('temperaturef2');
   temperatureF.innerHTML = `${data_sensor_2.temperaturaF || 0}`;
});










socket.on('data_sensor',(data_sensor) =>{
    console.log(data_sensor);
   let humedadSuelo = document.getElementById('humedadSuelo');
   humedadSuelo.innerHTML = `${data_sensor.humedadSuelo || 0}`;
});


socket.on('data_sensor_2',(data_sensor_2) =>{
    console.log(data_sensor_2);
   let humedadSuelo = document.getElementById('humedadSuelo2');
   humedadSuelo.innerHTML = `${data_sensor_2.humedadSuelo || 0}`;
});


socket.on('data_sensor_3',(data_sensor_3) =>{
    console.log(data_sensor_3);
   let humedadSuelo = document.getElementById('humedadSuelo3');
   humedadSuelo.innerHTML = `${data_sensor_3.humedadSuelo || 0}`;
});













socket.on('data_sensor', (data_sensor) => {
    console.log(data_sensor);
   let humedad = document.getElementById('humedad');
   humedad.innerHTML = `${data_sensor.humedad || 0}`;
});


socket.on('data_sensor_2', (data_sensor_2) => {
    console.log(data_sensor_2);
   let humedad = document.getElementById('humedad2');
   humedad.innerHTML = `${data_sensor_2.humedad || 0}`;
});


socket.on('data_sensor_3', (data_sensor_3) => {
    console.log(data_sensor_3);
   let humedad = document.getElementById('humedad3');
   humedad.innerHTML = `${data_sensor_3.humedad || 0}`;
});



















socket.on('data_sensor', (data_sensor) => {
    console.log(data_sensor);
   let ppmMQ4 = document.getElementById('gas');
   ppmMQ4.innerHTML = `${data_sensor.ppmMQ4 || 0}`;
});

socket.on('data_sensor_2', (data_sensor_2) => {
    console.log(data_sensor_2);
   let ppmMQ4 = document.getElementById('gas2');
   ppmMQ4.innerHTML = `${data_sensor_2.ppmMQ4 || 0}`;
});

socket.on('data_sensor_3', (data_sensor_3) => {
    console.log(data_sensor_3);
   let ppmMQ4 = document.getElementById('gas3');
   ppmMQ4.innerHTML = `${data_sensor_3.ppmMQ4 || 0}`;
});















socket.on('data_sensor',(data_sensor) =>{
   console.log(data_sensor);
   let ppmMQ4Compensado = document.getElementById('gasCompensado');
   ppmMQ4Compensado.innerHTML = `${data_sensor.ppmMQ4Compensado || 0}`;
});



socket.on('data_sensor_2',(data_sensor_2) =>{
    console.log(data_sensor_2);
    let ppmMQ4Compensado = document.getElementById('gasCompensado2');
    ppmMQ4Compensado.innerHTML = `${data_sensor_2.ppmMQ4Compensado || 0}`;
});



socket.on('data_sensor_3',(data_sensor_3) =>{
    console.log(data_sensor_3);
    let ppmMQ4Compensado = document.getElementById('gasCompensado3');
    ppmMQ4Compensado.innerHTML = `${data_sensor_3.ppmMQ4Compensado || 0}`;
});
















socket.on('data_sensor',(data_sensor) =>{
    console.log(data_sensor);
   let temperature = document.getElementById('ppmcalidadeaire');
   temperature.innerHTML = `${data_sensor.ppmMQ135Compensado || 0}PPM`;
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
});

















function initCharts() {
    airQualityGauge = new Chart(document.getElementById('airQualityGauge'), {
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

socket.on('data_sensor',(data_sensor) =>{
    console.log(data_sensor);
    initCharts();
    const ppmMQ135Value = data_sensor.ppmMQ1351 || 0;
    const airQualityPercentage = ((ppmMQ135Value / 10000) * 100).toFixed(1);
    const ppmMQ135Element = document.getElementById('ppmMQ135');
    ppmMQ135Element.innerHTML = `${airQualityPercentage}%`;

    airQualityGauge.data.datasets[0].data[1] = 100 - airQualityPercentage;
    airQualityGauge.data.datasets[0].data[0] = airQualityPercentage;
    airQualityGauge.update();


});




function initCharts2() {
    airQualityGauge = new Chart(document.getElementById('airQualityGauge2'), {
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

socket.on('data_sensor_2',(data_sensor_2) =>{
    console.log(data_sensor_2);
    initCharts();
    const ppmMQ135Value = data_sensor_2.ppmMQ1351 || 0;
    const airQualityPercentage = ((ppmMQ135Value / 10000) * 100).toFixed(1);
    const ppmMQ135Element = document.getElementById('ppmMQ1352');
    ppmMQ135Element.innerHTML = `${airQualityPercentage}%`;

    airQualityGauge.data.datasets[0].data[1] = 100 - airQualityPercentage;
    airQualityGauge.data.datasets[0].data[0] = airQualityPercentage;
    airQualityGauge.update();


});


function initCharts3() {
    airQualityGauge = new Chart(document.getElementById('airQualityGauge3'), {
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

socket.on('data_sensor_3',(data_sensor_3) =>{
    console.log(data_sensor_3);
    initCharts();
    const ppmMQ135Value = data_sensor_3.ppmMQ1351 || 0;
    const airQualityPercentage = ((ppmMQ135Value / 10000) * 100).toFixed(1);
    const ppmMQ135Element = document.getElementById('ppmMQ1353');
    ppmMQ135Element.innerHTML = `${airQualityPercentage}%`;

    airQualityGauge.data.datasets[0].data[1] = 100 - airQualityPercentage;
    airQualityGauge.data.datasets[0].data[0] = airQualityPercentage;
    airQualityGauge.update();


});