var MongoClient = require('mongodb');
var fetch = require('node-fetch');

const CONNECTION_STRING = process.env.DB; 

function GetData () {
  this.stockData = function(stock) {
    var data = fetch(`https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`, (err, ret) => {
        if (err) console.log(err);
        else ret;
      });
    Promise.resolve(data).then(result => result.json()).then(result => {
      return {
        stock: result.symbol,
        price: result.latestPrice
      };
    }); 
  }
  
  this.likes = function(stock, like, ip) {
    MongoClient.connect(CONNECTION_STRING, {useUnifiedTopology: true}, function(err, client) {
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection('likes');
      like ? collection.findOneAndUpdate({stock: stock}, {$addToSet: {ips: ip}}, {upsert: true}, (err, ret)=>{
        if(err) console.log(err);
        return ret.value.ips.length;
      }) : collection.findOne({stock: stock}, (err, ret) => {
        if(err) console.log(err);
        return ret.ips.length || 0
      });
    });
  }
}

module.exports = GetData;;