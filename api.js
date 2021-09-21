// requiring the packages
const db = require('./database/dboperations');
const users = require('./database/users');
const {log} = require("nodemon/lib/utils");
const bodyParser = require('body-parser');
const express = require('express');
const sql = require("mssql");
const config = require("./database/dbconfig");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//lOGIN PAGE
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '\\views\\login.html');

});
app.post('/login', function (req, res) {


    const email = req.body.email;
    const password = req.body.password;
    if(email === '' || password === '' ){
        res.post('email and password are required to login');
    }


    db.isRegUser(email, password).then(result => {
        console.log("in" + result);
        if(result){
            res.send("login failed, user not found");
        } else {
            res.send("login successful");
        }
    });

});

//SIGNUP PAGE
app.get('/signup', function (req, res) {
    res.sendFile(__dirname + '\\views\\signup.html');

});
app.post('/signup', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    if(email === '' || password === '' || username === '' ){
        res.post('username email and password are required to login');
    }


    db.isRegUser(email, password).then(result => {

        if(result){
            db.createUser(username, email, password).then(result => {
                console.log(result);
            });
        } else {
            res.send("Creation of new user failed, user found in database");
        }
    });

});

app.listen(3000, function () {
    console.log('Server is running');
});
