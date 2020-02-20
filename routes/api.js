/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var fetch = require('node-fetch');
var GetData = require('../controllers/getData.js');
var getData = new GetData();

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      var stock = req.query.stock;
      var two = Array.isArray(stock);
      var like = req.query.like || false;
      var ip = req.connection.remoteAddress;
      var stockData;
      var likes;
      var test;
      
      stockData = fetch(`https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`, (err, ret) => {
        if (err) console.log(err);
        console.log('defining data');
        return ret;
      });
    Promise.resolve(stockData).then(result => result.json()).then(result => {
      return console.log({
        stock: result.symbol,
        price: result.latestPrice
      })
    });
      return 0;

      

          
    });
};