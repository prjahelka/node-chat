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

    socket.on('createMessage', (chat) => {
        console.log('chat message: ', chat);
        io.emit('newMessage', {
            from: chat.from,
            text: chat.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('user connection lost');
    });

});


console.log('publicPath: ', publicPath);

server.listen(PORT, () => {
    console.log('app is running on port: ', PORT);
});