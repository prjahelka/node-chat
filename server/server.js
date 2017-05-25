const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const publicPath = path.join(__dirname, '../public');

const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('user connected');

    socket.emit('newEmail', {
        from: 'pete@soomedomain.com',
        text: 'How\'s it going?'
    });

    socket.on('createEmail', (newEmail) => {
        console.log('new email: ', newEmail);
    });

    socket.on('createMessage', (chat) => {
        console.log('chat message: ', chat);
    });

    socket.emit('newMessage', {
        from: 'pete@soomedomain.com',
        text: 'How\'s it going?',
        createdAt: 123
    });

    socket.on('disconnect', () => {
        console.log('user connection lost');
    });

});


console.log('publicPath: ', publicPath);

server.listen(PORT, () => {
    console.log('app is running on port: ', PORT);
});