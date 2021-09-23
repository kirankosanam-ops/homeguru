const config = require('./dbconfig');
const sql = require('mssql');


async function isRegisteredUser(email, password) {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT EMAIL FROM USERS WHERE EMAIL LIKE " + "'%" + email + "%'" );
        return users.recordsets.toString() === '';
    } catch (error) {
        throw error;
    }
}

async function getProfile(email) {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * FROM USERS WHERE EMAIL LIKE " + "'%" + email + "%'");
        return users.recordsets;
    } catch (error) {
        throw error;
    }
}

async function getUserCollection() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT DISTINCT EMAIL, USERNAME FROM USERS");
        return users.recordsets;
    } catch (error) {
        throw error;
    }
}


async function createNewUser(username, email, password) {
    // let insertQuery = "INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES ("+ username + ", " + email+ ", " + password + ")";
    let insertQuery_1 = `INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES ('${username}', '${email}', '${password}')`;
    try {
        let pool = await sql.connect(config);
        await pool.request().query(insertQuery_1, function(err, result){
            if (err){
                throw err;
            }
            return "1 record inserted";
        });
    } catch (error) {
        throw error;
    }
}



module.exports = {
    isRegUser : isRegisteredUser,
    createUser : createNewUser,
    getProfile : getProfile,
    getUserCollection:getUserCollection
}
