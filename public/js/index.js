var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('connecction lost');
});

socket.on('newMessage', (chatMessage) => {
    var li = jQuery('<li></li>');
    li.text(`${chatMessage.from}: ${chatMessage.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (locMsg) => {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${locMsg.from}: `);
    a.attr('href', locMsg.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(evt) {
    evt.preventDefault();
    console.log('send pressed');
    console.log('message: ', jQuery('#message').val());
    socket.emit('createMessage', {
            from: 'Pete',
            text: jQuery('#message').val()
        },
        function(data) {
            console.log('message received-ack: ', data)
        });
});

var sendLocationButton = jQuery('#send-location');
sendLocationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by this browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log('position: ', position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to find location');
    });
});