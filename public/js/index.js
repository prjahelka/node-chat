var socket = io();

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('connecction lost');
});

socket.on('newMessage', (msg) => {
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var snippet = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(snippet);
});

socket.on('newLocationMessage', (msg) => {
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var snippet = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        mapurl: msg.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(snippet);
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