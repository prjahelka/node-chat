const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const { generateMessage, generateLocationMessage } =
require('./utils/message.js');

const publicPath = path.join(__dirname, '../public');

const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('user connected');

    socket.emit('newMessage', generateMessage(
        'System',
        'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage(
        'System',
        'New user has joined'));

    socket.on('createMessage', (chat, callback) => {
        console.log('chat message: ', chat);

        socket.broadcast.emit('newMessage', generateMessage(
            chat.from,
            chat.text));

        callback('server callback');
    });

    socket.on('disconnect', () => {
        console.log('user connection lost');
    });

    socket.on('createLocationMessage', (position, callback) => {
        io.emit('newLocationMessage', generateLocationMessage(
            'Admin', position.latitude, position.longitude));
    });

});

// console.log('publicPath: ', publicPath);

server.listen(PORT, () => {
    console.log('app is running on port: ', PORT);
});