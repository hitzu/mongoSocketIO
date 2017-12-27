/*var io = require('socket.io');
var socket = io.listen(3002);
socket.on('connection', function (client) {
    console.log('a user connected');

    client.on('send message', function (event) {
        console.log('Mensaje recibido del cliente! ', event);
        client.send(event);
    });

    client.on('chat', function (data) {
        client.broadcast.in('laneros').emit('LALOS', data);
        client.in('laneros').emit('LALOS', data);
    });

    client.on('disconnect', function () {
        console.log('El servidor fue desconectado');
    });
});*/


'use strict'
const config = require("./config/config");
const mongoose = require('mongoose');
const app = require("./app");
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

const port = process.env.PORT || 3002;

mongoose.connect(config.DBStringConnection, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log(`Conexion a la base de datos en: ${config.DBStringConnection}`)

    server.listen(port, () => {
        console.log(`API REST corriendo en ${config.urlServer}`)
    });
});

io.sockets.on('connection', function(clientSocket){
    console.log('a user connected');

    clientSocket.on('send message', function(data){
        console.log(data);
        clientSocket.emit('new message', data);
    });


});