const socket = io();


socket.on('data',(data) =>{
    console.log(data);
   let temperature1 = document.getElementById('temperaturec1');
   temperature1.innerHTML = `${data.temperaturaC1 || 0}`;
});



socket.on('data',(data) =>{
    console.log(data);
   let temperatureF1 = document.getElementById('temperaturef1');
   temperatureF1.innerHTML = `${data.temperaturaF1 || 0}`;
});


socket.on('data',(data) =>{
    console.log(data);
   let humedadSuelo1 = document.getElementById('humedadSuelo1');
   humedadSuelo1.innerHTML = `${data.humedadSuelo1 || 0}`;
});

socket.on('data',(data) =>{
    console.log(data);
   let humedad1 = document.getElementById('humedad1');
   humedad1.innerHTML = `${data.humedad1 || 0}`;
});


socket.on('data',(data) =>{
    console.log(data);
   let ppmMQ41 = document.getElementById('gas1');
   ppmMQ41.innerHTML = `${data.ppmMQ41 || 0}`;
});

socket.on('data',(data) =>{
   console.log(data);
   let ppmMQ4Compensado1 = document.getElementById('gasCompensado1');
   ppmMQ4Compensado1.innerHTML = `${data.ppmMQ4Compensado1 || 0}`;
});














function initCharts() {
    airQualityGauge = new Chart(document.getElementById('airQualityGauge1'), {
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
    initCharts();
    const ppmMQ135Value = data.ppmMQ1351 || 0;
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
