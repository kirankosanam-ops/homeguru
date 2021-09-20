const config = require('./dbconfig');
const sql = require('mssql');


async function isRegisteredUser(){
    try{
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT EMAIL FROM USERS WHERE EMAIL LIKE '%kirankosanam1@gmail.com%'");
        if (users.recordsets.toString() === ''){
            // console.log('user not found');
            return false;
        }
        return true;

    } catch (error){
        console.log(error);
    }
}

module.exports = {
    getUsers : isRegisteredUser
}
