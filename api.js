const db = require('./database/dboperations');
const users = require('./database/users');

let isNewUser = db.getUsers().then(result => {
    console.log("is new user " + result);
    return result;
});