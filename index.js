const express = require('express');
const index = require('./routes/index');
const player = require('./routes/player');
const mysql = require('mysql');
const hostname = "127.0.0.1";
const port = 3000;
const dbConfig = {
host: 'localhost',
user: 'root',
password: 'TLHcoding',
database: 'soccer'

};
const db = mysql.createConnection(dbConfig);

function connectCallback(error){
    if (error){
        throw error;
    }

    console.log("connection was sucessful!");

    db.query('SELECT * FROM players', function(error, results) { 
        console.log(results);
    });
}

db.connect(connectCallback);
global.db = db;
let app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
 app.use(express.json());
 app.post('/add', player.addPlayer);
app.get('/', index.getHomePage);
app.get('/add', player.addPlayerPage);
app.get('/edit/:id', player.editPlayerPage);
app.get('/delete/:id', player.deletePlayer);
app.post('/edit/:id', player.editPlayer);




function listenCallback(){
    console.log(`Listening on http://${hostname}:${port}`);
}

app.listen(port, hostname, listenCallback);
