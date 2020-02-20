/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var fetch = require("node-fetch");
var GetData = require("../controllers/getData.js");
var getData = new GetData();

module.exports = function(app) {
  app.route("/api/stock-prices").get(function(req, res) {
    var stock = req.query.stock;
    var two = Array.isArray(stock);
    var like = req.query.like || false;
    var ip = req.connection.remoteAddress;
    var stockData = two ? [] : undefined;
    var likes;
    var rel_likes = [];
    var test;
    var callback = function(which, info) {
      if (which === 'data') {
        two ? stockData.push(info) : stockData = info;
      } else if (!two) {
        stockData.likes = info
        return res.json(stockData);
      } else {
        rel_likes.push(info);
        stockData[0].rel_likes = rel_likes[0] - rel_likes[1];
        stockData[1].rel_likes = rel_likes[1] - rel_likes[0];
        
      }
      if (stockData !== undefined && stockData !== []) {
        res.json(stockData);
      } else {
        console.log(stockData);
      } 
    };
    
    if ( !two ) {
      getData.data(stock, callback);
      getData.likes(stock, like, ip, callback);
    } else {
      getData.data(stock[0], callback);
      getData.data(stock[1], callback);
      getData.likes(stock[0], like, ip, callback);
      getData.likes(stock[1], like, ip, callback);
      console.log(stockData);
    }
  });
};
