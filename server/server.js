const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const { generateMessage, generateLocationMessage } =
require('./utils/message.js');
const { isRealString } =
require('./utils/validation.js');
const { Users } = require('./utils/users.js');

const publicPath = path.join(__dirname, '../public');

const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room name are required');
        }

        // io.emit (all) -> io.to('room').emit (all in a room)
        // socket.broadcast.emit (all but me) -> socket.broadcast.to('room').emit (all in room but me)
        // socket.emit - no reason to filter by room as this is a single user

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        console.log('users: ', users);
        socket.emit('newMessage', generateMessage(
            'System',
            'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage(
            'System',
            `${params.name} has joined`));

        callback();
    });

    socket.on('createMessage', (chat, callback) => {
        console.log('chat message: ', chat);

        socket.broadcast.emit('newMessage', generateMessage(
            chat.from,
            chat.text));

        callback('server callback');
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage(
                'System',
                `${user.name} has left the room`));

        }
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