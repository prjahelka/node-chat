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
    var messageBox = jQuery('#message');
    socket.emit('createMessage', {
            from: 'Pete',
            text: messageBox.val()
        },
        function() {
            messageBox.val('');
        });
});

var sendLocationButton = jQuery('#send-location');
sendLocationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by this browser');
    }

    sendLocationButton.attr('disabled', 'disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function(position) {
        sendLocationButton.removeAttr('disabled').text('Send location');

        console.log('position: ', position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        sendLocationButton.removeAttr('disabled').text('Send location');
        alert('Unable to find location');
    });
});