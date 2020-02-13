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

var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    let status = xhr.status;
    
  }
}

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      var stock = req.query.stock;
      var like = req.query.like || false;

      var data = new XMLHttpRequest().open('GET', `https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`, false)
        .send(null);
      console.log(data);
      var price = JSON.parse(data).latestPrice;
      console.log(price);
      
      
        MongoClient.connect(CONNECTION_STRING, {useUnifiedTopology: true}, function(err, client) {
          if(err) console.log(err);
          var db = client.db('test');
          var collection = db.collection('stocks');
          
      
        });
    });
};
