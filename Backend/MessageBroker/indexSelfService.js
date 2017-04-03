var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoDBHanler = require('./MongoDBHandler');
var RabbitMqHadler = require('./RabitMQHandler');
app.use(bodyParser());
app.get('/Reisen', function(req, res){
    console.log('Get/Reisen');
    MongoDBHanler.getReisen(res);

});

RabbitMqHadler.receiveQueueChanges(function(buchung){
    console.log("Objekt per Queue empfangen");
        var Reise = {"id": buchung.Kundenummer,
      "Kundenname": buchung.Kundenname,
      "Wohnort":buchung.Ort,
      "Anbieter": [
        {
          "Anbieter": "Hotel an der See",
          "Ort": "Gambrills",
          "Telefon": " +1 (909) 462-3454",
          "Beweis": {
            "id": "4 ",
            "Rechnungsnummer": 994682
          },
          "Alternative": {
            "Anbieter": "Hotel an der Küste",
            "Ort": "Tioga",
            "Telefon": " +1 (883) 495-3885"
          }
        },
        {
          "Anbieter": "Fahrradverleih",
          "Ort": "Stollings",
          "Telefon": " +1 (802) 462-2701",
          "Beweis": {
            "id": "0 ",
            "Rechnungsnummer": 927322
          },
          "Alternative": {
            "Anbieter": "Autoverleih",
            "Ort": "Eagletown",
            "Telefon": " +1 (927) 471-2662"
          }
        }
      ]
    }
    MongoDBHanler.insertReisen(Reise);
    }
  )


var port = 5000;
app.listen(port);
console.log('Listening at http://localhost:' + port)