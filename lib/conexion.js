const conf = require('./conf.js');
const mysql = require('mysql');

let conexion = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database
});

conexion.connect(function(err) {
    if (err) {
        console.log('Error al conectar con la base de datos');
        console.log(err);
    } else {
        console.log('Conexión establecida con éxito');
    }
});

conexion.end();

module.exports = conexion;