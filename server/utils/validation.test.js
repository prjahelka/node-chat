var expect = require('expect');
var { isRealString } = require('./validation.js');

describe('validation tests', () => {
    it('shoud reject non string value', (done) => {
        var test = 5;
        var res = isRealString(test);
        expect(res).toBeA('boolean');
        expect(res).toBe(false);
        done();
    });

    it('shoud reject purely blank string value', (done) => {
        var test = '         ';
        var res = isRealString(test);
        expect(res).toBeA('boolean');
        expect(res).toBe(false);
        done();
    });

    it('shoud accept non blank string value', (done) => {
        var test = '    a padded string     ';
        var res = isRealString(test);
        expect(res).toBeA('boolean');
        expect(res).toBe(true);
        done();
    });
});