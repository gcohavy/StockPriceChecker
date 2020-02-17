var MongoClient = require('mongodb');
var fetch = require('node-fetch');

const CONNECTION_STRING = process.env.DB; 

function GetData () {
  this.stockData = function(stock) {
    var data = fetch(`https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`, (err, ret) => {
        if (err) console.log(err);
        else return ret;
      })
  }
  
  this.likes = function(stock) {
    
  }
}

module.exports = GetData;