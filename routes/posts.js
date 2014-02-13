
var db = require('../db');



exports.all = function(req, res) {
  db.findAll().then(res.json)
};