var expect = require('expect');
const { Users } = require('./users.js');

describe('Users tests', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            { id: '1', name: 'Pete', room: 'Node Course' },
            { id: '2', name: 'Joan', room: 'React Course' },
            { id: '3', name: 'Phil', room: 'Node Course' }
        ]
    });
    it('shoud add a new user', () => {
        users = new Users();
        var user = {
            id: '123',
            name: 'Pete',
            room: 'My Room'
        };
        var res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
        expect(users.users.length).toEqual(1);
    });
    it('should return a list of user names for node course', () => {
        var res = users.getUserList('Node Course');
        expect(res).toEqual(['Pete', 'Phil']);
    });
    it('should return a list of user names for react course', () => {
        var res = users.getUserList('React Course');
        expect(res).toEqual(['Joan']);
    });
    it('should get the specified user', () => {
        var user = users.getUser('1');
        expect(user.name).toBe('Pete');
    });
    it('should not get an unknown user', () => {
        var user = users.getUser('111');

        expect(user).toNotExist();
    });
    it('should remove the specified user', () => {
        var user = users.removeUser('1');
        expect(users.users.length).toBe(2);
        expect(user).toExist();
    });
    it('should not remove an unknown user', () => {
        var user = users.removeUser('111');
        expect(users.users.length).toBe(3);
        expect(user).toNotExist();
    });
});