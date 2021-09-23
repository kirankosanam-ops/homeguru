// requiring the packages
const db = require('./database/dboperations');
const users = require('./database/users');
const {log} = require("nodemon/lib/utils");
const bodyParser = require('body-parser');
const express = require('express');
const sql = require("mssql");
const table = require("table");
const config = require("./database/dbconfig");
const {getProfile} = require("./database/dboperations");
const app = express();
let em = '';
app.use(bodyParser.urlencoded({extended: true}));

let tabConfig = {
    border: table.getBorderCharacters("ramac"),
}

//lOGIN PAGE
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '\\views\\login.html');
});
app.post('/login', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (email === '' || password === '') {
        res.post('email and password are required to login');
    }


    db.isRegUser(email, password).then(result => {
        console.log("in" + result);

        if (result) {
            res.send("login failed, user not found");
        } else {
            em = email;
            res.sendFile(__dirname + '\\views\\profile.html');
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
    if (email === '' || password === '' || username === '') {
        res.post('username email and password are required to login');
    }


    db.isRegUser(email, password).then(result => {

        if (result) {
            db.createUser(username, email, password).then(c_result => {
                res.send("User Created Successfully, PLEASE LOGIN!!");
            });

        } else {
            res.send("Creation of new user failed, user found in database");
        }
    });

});

// Profile API
app.get('/profile', function (req, res) {
    res.sendFile(__dirname + '\\views\\profile.html');
})
app.post('/profile', function (req, res) {
    if (req.body.hasOwnProperty("getDetails")) {
        if (em === '') {
            res.send("please log in");
        } else {
            getProfile(em).then(result => {
                let uname = result[0][0].USERNAME;
                let eml = result[0][0].EMAIL;
                res.send("Username is " + uname + "\nemail is " + eml);
            });
        }
    } else {
        em = '';
        res.send('logged Out');
    }

})


// USER COLLECTION API
app.get('/usercollection', function (req, res) {
    res.sendFile(__dirname + '\\views\\usercollection.html');
})
app.post('/usercollection', function (req, res) {
    if (req.body.hasOwnProperty("getCollection")) {
        db.getUserCollection().then(result => {
            let data = [['USERNAME', 'EMAIL']];
            for(let i=0;i < result[0].length;i++){
                console.log(result[0][i]);
                data.push([result[0][i].USERNAME, result[0][i].EMAIL])
            }
            console.log(data);
            let x = table.table(data, tabConfig);
            console.log(x);
            res.send(data);

        });
    }

})


app.listen(3000, function () {
    console.log('Server is running');
});
