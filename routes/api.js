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
    
      do {
        stockData = getData
      } while(stockData===null) 

          
    });
};