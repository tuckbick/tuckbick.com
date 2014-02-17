var mongo = require('mongodb');
var q = require('q');
var config = require('../config').mongo;
 

var MongoClient = mongo.MongoClient,
    db = null,
    posts = null;

MongoClient.connect(config.url, {
  db: { w: 1 }
}, function(err, database) {

  if (err) {
    console.log("Connection to '"+config.db+"' database failed");
  }

  else {
    console.log("Connected to '"+config.db+"' database");
    db = database;

    getCollection('posts')
      .then(function(collection) {
        posts = collection;
      })
  }

});


var getCollection = function(name) {
  var d = q.defer()
  db.collection(name, {strict:true}, function(err, collection) {
    if (err) {
      db.createCollection(name,{strict:true}, function(err, collection) {
        if (err) {
          d.reject()
        } else {
          d.resolve(collection)
        }
      })
    } else {
      d.resolve(collection)
    }
  })
  return d.promise
}


exports.findAll = function(req, res) {
  var d = q.defer();
  posts.find().toArray(function(err, items) {
    if (err) {
      d.reject()
    }
    else {
      d.resolve(items);
    }
  });
  return d.promise;
};