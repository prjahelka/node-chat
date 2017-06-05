// use an ES6 class

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        // return added user
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        })
        var namesArray = users.map((user) => {
            return user.name;
        })
        return namesArray;
    }
};

module.exports = {
    Users
}