var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoDBHanler = require('./MongoDBHandler');
var RabbitMqHadler = require('./RabitMQHandler');
app.use(bodyParser());
app.get("/Kunden",function(req,res){
    var Kunden = require('../Mocks/Kundenverwaltung.json').Kunden;
    res.send(Kunden)
});
app.get("/Events",function(req,res){
    var Events = require('../Mocks/Kundenverwaltung.json').Events;
    res.send(Events)
});
app.get("/Equipment",function(req,res){
    var Equipment = require('../Mocks/Kundenverwaltung.json').Equipment;
    res.send(Equipment)
});

app.post('/Buchungen', function(req, res){
    console.log('POST/Buchungen');
    console.log(req.body);
    var buchungen = req.body.Buchungen;
    MongoDBHanler.insertBuchungen(buchungen);
    RabbitMqHadler.sendQueue(buchungen);
    console.log("buchungen wurden gespeichert und an die Message Queue übergeben")
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
});

var port = 4000;
app.listen(port);
console.log('Listening at http://localhost:' + port)