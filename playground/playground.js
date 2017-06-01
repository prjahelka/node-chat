const moment = require('moment');

var createdAt = 1234;
var date = moment(createdAt);

console.log('MMM now: ', date.format('MMMM Do, YYYY h:mm a'));

var timeStamp = moment().valueOf();

console.log('timestamp: ', timeStamp);