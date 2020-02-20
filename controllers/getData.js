var MongoClient = require('mongodb');
var fetch = require('node-fetch');

const CONNECTION_STRING = process.env.DB; 

function GetData () {
  this.data = function(stock, callback) {
    var data = fetch(`https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`, (err, ret) => {
        if (err) console.log(err);
        return ret;
      });
    Promise.resolve(data).then(result => result.json()).then(result => {
      callback ('data', {
        stock: result.symbol,
        price: result.latestPrice
      });
    }); 
  }
  
  this.likes = function(stock, like, ip, callback) {
    MongoClient.connect(CONNECTION_STRING, {useUnifiedTopology: true}, function(err, client) {
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection('likes');
      like ? collection.findOneAndUpdate({stock: stock}, {$addToSet: {ips: ip}}, {upsert: true}, (err, ret)=>{
        if(err) console.log(err);
        callback('', {stock:stock, likes: ret.value.ips.length});
      }) : collection.findOne({stock: stock}, (err, ret) => {
        if(err) console.log(err);
        callback('',{ stock: stock, likes: ret.ips.length ? ret.ips.length : 0});
      });
    });
  }
}

module.exports = GetData;;