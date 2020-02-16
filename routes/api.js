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
      var symbol;
      var price;
      var like = req.query.like || false;
      var price = '';
      var ip = req.connection.remoteAddress;
      var stockData;
    
      var data = fetch(`https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`, (err, ret) => {
        if (err) console.log(err);
        else return ret;
      })
      Promise.resolve(data).then(result => result.json()).then(result => { 
        symbol = result.symbol;
        price = result.latestPrice;
        MongoClient.connect(CONNECTION_STRING, {useUnifiedTopology: true}, function(err, client) {
          if(err) console.log(err);
          var db = client.db('test');
          var collection = db.collection('stocks');
          
          stockData = {
            stock: symbol,
            price: price,
            likes: like ? collection.findOneAndUpdate({stock: stock}, {$addToSet: {ips: ip}}, {upsert: true}, (err, ret)=> {
              if(err) console.log(err);
              console.log(ret.value.ips.length);
              return ret.value.ips.length;
            }) : collection.findOne({stock: stock}, (err, ret)=> {
              console.log(ret.ips.length);
              return ret.ips.length || 0;
          })
          };
          console.log(stockData);
          res.json(stockData);
        });
        
      });
          
    });
};