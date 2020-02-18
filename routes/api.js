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
var GetData = require('../controllers/getData.js');
var getData = new GetData();

const CONNECTION_STRING = process.env.DB; 

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      var stock = req.query.stock;
      var two = Array.isArray(stock);
      var like = req.query.like || false;
      var ip = req.connection.remoteAddress;
      var stockData;
      var likes;
    
      if(!two) {
        stockData = getData.data(stock);
        likes = getData.likes(stock, like, ip);
        stockData.likes = likes;
        console.log(stockData);
        res.json(stockData);
      } else {
        console.log('twas an array')
      }

          
    });
};