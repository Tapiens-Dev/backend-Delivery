const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

/**
 * Importar una ruta
*/

const usersRoute = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.disable('x-powered-by');
app.set('port', port);

// LLAMADO DE LAS RUTAS

usersRoute(app);


server.listen(3000, '127.0.0.0' || 'localhost', function() {
    console.log("Server Node Js Corriendo...");
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del Backend');
});

app.get('/login', (req, res) => {
    res.send('LOGIN INICIADO CON EXITO....');
});


// ERROR HANDLER

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});