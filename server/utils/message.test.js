var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message.js');

describe('generateMesssage tests', () => {
    it('shoud generate correct message object', (done) => {
        // store result, test result
        var from = 'pete@me.com',
            text = 'here\'s a test mesage';
        var res = generateMessage(from, text);

        expect(res).toInclude({ from, text });
        expect(res.from).toBeA('string');
        expect(res.from).toBe(from);
        expect(res.text).toBeA('string');
        expect(res.text).toBe(text);
        expect(res.createdAt).toBeA('number');
        done();
    });
});

describe('generateLocationMessage tests', () => {
    it('should generate correct location object', (done) => {
        var from = 'Admin',
            lat = 35.0,
            long = -105;
        var res = generateLocationMessage(from, lat, long);

        var url = `https://www.google.com/maps/?${lat},${long}`;

        expect(res).toInclude({ from });
        expect(res.from).toBe(from);
        expect(res.createdAt).toBeA('number');
        expect(res.url).toBe(url);

        done();
    });
});