const config = require('./dbconfig');
const sql = require('mssql');


async function isRegisteredUser(email, password) {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT EMAIL, PASSWORD FROM USERS WHERE EMAIL LIKE " + "'%" + email + "%' AND PASSWORD LIKE " + "'%" + password + "%'");
        return users.recordsets.toString() === '';
    } catch (error) {
        throw error;
    }
}

async function createNewUser(username, email, password) {
    let insertQuery = "INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES ("+ username.toString() + ", " + email.toString() + ", " + password.toString() + ")";
    try {
        let pool = await sql.connect(config);
        await pool.request().query(insertQuery, function(err, result){
            if (err) throw err;
            console.log("1 record inserted");
            return "1 record inserted";
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    isRegUser : isRegisteredUser,
    createUser : createNewUser
}
