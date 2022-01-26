const port = 3000;
const rootPath = __dirname;
const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./database.js');
const births = require('./modules/births.js');
const sectors = require('./modules/sectors.js');
const ramals = require('./modules/ramals.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.options('/newclient', cors())
app.post('/newclient', function(req, res){
    const b = req.body;
    console.log(b);
    res.send(database.AddClients(b));
});

app.get('/bybirthmount', function(req, res){
    res.send(births(req.query["n"]));
});

app.get('/bysector', function(req, res){
    res.send(sectors(req.query["n"]));
});

app.get('/ramals', function(req, res){
    res.send(ramals());
});

app.listen(port, () => {`Iniciado Backend na porta ${port}`});