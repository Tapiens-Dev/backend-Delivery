const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kiarla.2020',
    database: 'app_delivery'
});

db.connect(function(err) {
    if(err) throw err;
    console.log('DATABASE CONNECTED...');
});

module.exports = db;