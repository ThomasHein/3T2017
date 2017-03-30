//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = "mongodb://localhost:27017/exampleDb";

// Use connect method to connect to the Server
var insertBuchungen = function(Buchung)
{
  console.log("Insert Buchungen gestartet");
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.
     var collection = db.collection('KundenverwaltungBuchungen');

    //Create some users

    // Insert some users
    collection.insert(Buchung, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
    //Close connection
    db.close();
  });
}});
}


var insertReisen = function(Reisen)
{
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.
     var collection = db.collection('HelpServiceReisen');

    //Create some users

    // Insert some users
    collection.insert(Reisen, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
    //Close connection
    db.close();
  });
}});
}

var getReisen = function(res)
{
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);

      // do some work here with the database.
      var collection = db.collection('HelpServiceReisen');
      var reisen = collection.find().toArray(function(err,results){
        db.close();
        res.send(results);
      }
      );
      
    }
  });
};

module.exports = {
  insertBuchungen : insertBuchungen,
  insertReisen : insertReisen,
  getReisen : getReisen
};
