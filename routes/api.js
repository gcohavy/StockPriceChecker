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
    var likes = [];
    
    var callback = function(which, info) {
      if (which === 'data') {
        two ? stockData.push(info) : stockData = info;
      } else if (!two) {
        stockData.likes = info.likes
        return res.json(stockData);
      } else {
        likes.push(info);
        if(likes.length==2) {
          if (stockData[0].stock == likes[0].stock) {
            stockData[0].rel_likes = likes[0] - likes[1];
            stockData[1].rel_likes = likes[1] - likes[0];
          } else {
            stockData[1].rel_likes = likes[0] - likes[1];
            stockData[0].rel_likes = likes[1] - likes[0];
          }
          return res.json(stockData);
        }
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
    }
  });
};
