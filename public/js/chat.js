var socket = io();

socket.on('connect', () => {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error');
        }
    });
});

socket.on('disconnect', () => {
    console.log('connecction lost');
});

function scrollToBottom() {
    var msgs = jQuery('#messages');
    var newMsg = msgs.children('li:last-child');
    var cliHt = msgs.prop('clientHeight');
    var scrlTop = msgs.prop('scrollTop');
    var scrlHt = msgs.prop('scrollHeight');
    var newMsgHt = newMsg.innerHeight();
    var lastMsgHt = newMsg.prev().innerHeight();

    if (cliHt + scrlTop + newMsgHt + lastMsgHt >= scrlHt) {
        console.log('should scroll clh, stop, sht, newMsgHt, lastMsgHt: ',
            cliHt, scrlTop, scrlHt, newMsgHt, lastMsgHt);
        msgs.scrollTop(scrlHt);
    } else {
        console.log('should not scroll clh, stop, sht, newMsgHt, lastMsgHt: ',
            cliHt, scrlTop, scrlHt, newMsgHt, lastMsgHt);
    }
};

socket.on('newMessage', (msg) => {
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var snippet = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(snippet);
    scrollToBottom();
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
    scrollToBottom();
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