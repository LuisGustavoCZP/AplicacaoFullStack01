const port = 3000;
const rootPath = __dirname;
const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./modules/database.js');
const births = require('./modules/funcionarios/births.js');
const sectors = require('./modules/funcionarios/sectors.js');
const ramals = require('./modules/funcionarios/ramals.js');
const calculator = require('./modules/calculadora/calculator.js');
const calculadora = calculator();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.options('/funcionarios/newclient', cors())
app.post('/funcionarios/newclient', function(req, res){
    const b = req.body;
    console.log(b);
    res.send(database.AddClients(b));
});

app.get('/funcionarios/bybirthmount', function(req, res){
    res.send(births(req.query["n"]));
});

app.get('/funcionarios/bysector', function(req, res){
    res.send(sectors(req.query["n"]));
});

app.get('/funcionarios/ramals', function(req, res){
    res.send(ramals());
});

app.get('/calculadora/', function(req, res){
    res.send(calculadora.getResult(req.query["operand1"], req.query["operator"], req.query["operand2"]));
});

app.get('/calculadora/operators', function(req, res) 
{
    console.log(req.ip);
    res.json(calculadora.operators);
});

app.listen(port, () => {`Iniciado Backend na porta ${port}`});