
var config = {
  user: '',
  pass: '',
  domain: '',
  port: 0000,
  path: ''
}
config.url = 'mongodb://'+user+':'+pass+'@'+domain+':'+port+'/'+path

exports.mongo = config;