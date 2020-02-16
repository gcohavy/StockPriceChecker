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
      var likes;
      var price = '';
      var ip = req.connection.remoteAddress;
      var stockData;
    
      var data = fetch(`https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`, (err, ret) => {
        if (err) console.log(err);
        else return ret;
      })
      Promise.resolve(data).then(result => result.json()).then(result => { 
        MongoClient.connect(CONNECTION_STRING, {useUnifiedTopology: true}, function(err, client) {
          if(err) console.log(err);
          var db = client.db('test');
          var collection = db.collection('stocks');
          if (like) {
            collection.findOneAndUpdate({stock: stock}, {$addToSet: {ips: ip}}, {upsert: true}, (err, ret)=> {
              if(err) console.log(err);
            });
          };
          collection.findOne({stock:stock}, (err, ret)=> {
            if(err) console.log(err);
            likes = ret.value.
          })
          stockData = {
            stock: result.symbol,
            price: result.latestPrice,
            likes: likes
          };
          res.json(stockData);
        });
      });
    });
};