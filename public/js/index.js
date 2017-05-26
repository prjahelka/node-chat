var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('connecction lost');
});

socket.on('newMessage', (chatMessage) => {
    console.log('newMessage: ', chatMessage);
});