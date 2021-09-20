// requiring the packages
// const db = require('./database/dboperations');

const users = require('./database/users');
const {log} = require("nodemon/lib/utils");
const bodyParser = require('body-parser');
const express = require('express');
const sql = require("mssql");
const config = require("./database/dbconfig");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '\\views\\signup.html');

});

app.post('/',  function (req, res) {
    res.send("Thanks for posting");

    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const x = async function isRegisteredUser() {
        console.log("hello");
        try {
            let pool = await sql.connect(config);
            let users = await pool.request().query("SELECT EMAIL FROM USERS WHERE EMAIL LIKE " + "'%" + email + "%'");

            //if user didn't exist in the users database return true else false
            // if( users.recordsets.toString() === ''){
                console.log("db_response");
                let db_response = await pool.request().query("INSERT INTO USERS VALUES (" + username + ", " + email + ", " + password + ")");
                console.log(db_response);

        } catch (error) {
            throw error;
        }
    }
    console.log(x);


});

app.listen(3000, function () {
    console.log('Server is running');
});

// let isNewUser = db.getUsers().then(result => {
//     console.log("is new user " + result);
//     return result;
// });