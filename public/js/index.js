var socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'pete@me.com',
        text: 'all\s well'
    });
    console.log('email sent');
});

socket.on('disconnect', () => {
    console.log('connecction lost');
});

socket.on('newMessage', (chatMessage) => {
    console.log('newMessage: ', chatMessage);
});