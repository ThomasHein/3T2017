#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var rabbitMqConnection = 'amqp://agnsikoh:6TP8PcuepsueTrZPYl8ZBJW7dCF8e7Dj@penguin.rmq.cloudamqp.com/agnsikoh'
var qName = 'Test3T'



module.exports = {
  sendQueue : function(json)
  {
    amqp.connect(rabbitMqConnection, function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = qName;
      ch.assertQueue(q, {durable: true});
      // Note: on Node 6 Buffer.from(msg) should be used
      ch.sendToQueue(q, new Buffer(JSON.stringify(json)));
      console.log(" [x] Sent %s", json);
    });
    });
  },
  receiveQueueChanges : function(callBack)
  {
    amqp.connect(rabbitMqConnection, function(err, conn) {
      conn.createChannel(function(err, ch) {
        var q = qName;
        console.log("Connection startet")
        ch.assertQueue(q, {durable: true});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg) {
          callBack(JSON.parse(msg.content.toString()));
        }, {noAck: true});
      });
    });
  }
}


