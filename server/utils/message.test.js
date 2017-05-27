var expect = require('expect');
var { generateMessage } = require('./message.js');

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