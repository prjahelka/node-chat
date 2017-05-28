var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('connecction lost');
});

socket.on('newMessage', (chatMessage) => {
    console.log('chatMessage: ', chatMessage);
    var li = jQuery('<li></li>');
    li.text(`${chatMessage.from} ${chatMessage.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(evt) {
    evt.preventDefault();
    console.log('send pressed');
    console.log('message: ', jQuery('[name=message]').val());
    socket.emit('createMessage', {
            from: 'Pete',
            text: jQuery('[name=message]').val()
        },
        function(data) {
            console.log('message received-ack: ', data)
        });
});