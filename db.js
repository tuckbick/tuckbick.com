var mongo = require('mongodb');
var q = require('q');
var config = require('./config').mongo;
 

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server(config.domain, config.port, {auto_reconnect: true});
db = new Db(config.db, server);

db.open(function(err, db) {
  db.authenticate(config.user, config.pass, function(err, result) {
    if(!err) {
      console.log("Connected to '"+config.db+"' database");
      db.collection('posts', {strict:true}, function(err, collection) {
        if (err) {
          console.log("The 'posts' collection doesn't exist.");
        } else {
          // save local copy of db
        }
      })
    }
  })
});

exports.findAll = function(req, res) {
  var d = q.defer();
  db.collection(config.db, function(err, collection) {
    collection.find().toArray(function(err, items) {
      q.resolve(items);
    });
  });
  return d.promise;
};