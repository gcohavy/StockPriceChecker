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
var fetch = require('node-fetch');

const CONNECTION_STRING = process.env.DB; 

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      var stock = req.query.stock;
      var like = req.query.like || false;
      var price = '';
      var ip = req.connection.remoteAddress;
      var stockData;
    
      var data = fetch(`https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`, (err, ret) => {
        if (err) console.log(err);
        else return ret;
      })
      Promise.resolve(data).then(result => result.json()).then(result => {
        stockData = {
          stock: result.symbol,
          price: result.latestPrice,
          likes: like ? 1 : 0
        }        
        
          MongoClient.connect(CONNECTION_STRING, {useUnifiedTopology: true}, function(err, client) {
            if(err) console.log(err);
            var db = client.db('test');
            var collection = db.collection('stocks');
            
      
        });
        

        res.json(stockData);
      });
      
    });
};
