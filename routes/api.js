/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');

const CONNECTION_STRING = process.env.DB; 

module.exports = function (app) {
  MongoClient.connect(CONNECTION_STRING, {useUnifiedTopology: true}, function(err, client) {
    if(err) console.log(err);
    var db = client.db('test');
    var collection = db.collection('stocks');
    console.log('Connetion successful');
    
    app.route('/api/stock-prices')
      .get(function (req, res){
        console.log('We are in the get function');
      });
  });
};
