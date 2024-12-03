const socket = io();


socket.on('data',(data) =>{
    console.log(data);
   let temperature = document.getElementById('temperaturec');
   temperature.innerHTML = `${data.temperaturaC || 0}`;
});



socket.on('data',(data) =>{
    console.log(data);
   let temperatureF = document.getElementById('temperaturef');
   temperatureF.innerHTML = `${data.temperaturaF || 0}`;
});


socket.on('data',(data) =>{
    console.log(data);
   let humedadSuelo = document.getElementById('humedadSuelo');
   humedadSuelo.innerHTML = `${data.humedadSuelo || 0}`;
});

socket.on('data',(data) =>{
    console.log(data);
   let humedad = document.getElementById('humedad');
   humedad.innerHTML = `${data.humedad || 0}`;
});


socket.on('data',(data) =>{
    console.log(data);
   let ppmMQ4 = document.getElementById('gas');
   ppmMQ4.innerHTML = `${data.ppmMQ4 || 0}`;
});

socket.on('data',(data) =>{
   console.log(data);
   let ppmMQ4Compensado = document.getElementById('gasCompensado');
   ppmMQ4Compensado.innerHTML = `${data.ppmMQ4Compensado || 0}`;
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



socket.on('data',(data) =>{
    console.log(data);
   let humedad = document.getElementById('humedad');
   humedad.innerHTML = `${data.humedad || 0}`;
});

socket.on('data',(data) =>{
    console.log(data);
    initCharts();
    const ppmMQ135Value = data.ppmMQ135 || 0;
    const airQualityPercentage = ((ppmMQ135Value / 10000) * 100).toFixed(1);
    const ppmMQ135Element = document.getElementById('ppmMQ135');
    ppmMQ135Element.innerHTML = `${airQualityPercentage}%`;

    airQualityGauge.data.datasets[0].data[1] = 100 - airQualityPercentage;
    airQualityGauge.data.datasets[0].data[0] = airQualityPercentage;
    airQualityGauge.update();


});

socket.on('data',(data) =>{
    console.log(data);
   let temperature = document.getElementById('ppmcalidadeaire');
   temperature.innerHTML = `${data.ppmMQ135Compensado || 0}PPM`;
});
