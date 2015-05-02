'use strict';

// Require modules
var httpProxy = require('http-proxy');
var http = require('http');
var Tourniquet = require('tourniquet/client');
var _ = require('lodash');

module.exports = function(options) {

  options = _.assign({
    port: 9090,
    request: require('./requestDefault')
  }, options);

  // Variables
  var proxy = httpProxy.createProxyServer({});
  var servicesConf = [];
  var clientTourniquet = new Tourniquet({
    tourniquet_port: options.tourniquet_port || process.env.TOURNIQUET_PORT || undefined,
    tourniquet_host: options.tourniquet_host || process.env.TOURNIQUET_HOST || undefined
  });

  clientTourniquet.on('new service', function(service) {

    if (!_.includes(servicesConf, service.id)) {
      servicesConf.push(service);
    }

  });

  clientTourniquet.on('delete service', function(service) {
    servicesConf = _.reject(servicesConf, {id: service.id });
  });

  clientTourniquet.allServices(function(services) {

    for (var i = 0, _len = services.length; i < _len; i++) {
      var service = services[i];
      if (!_.includes(servicesConf, service.id)) {
        servicesConf.push(service);
      }
    }

  });

  // Creating server to proxy
  var server = http.createServer(function(req, res) {

    if (req.url === '/favicon.ico') {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('404 Not Found\n');
      res.end();
    } else {
      options.request(req, res, servicesConf, proxy, options);
    }

  });

  server.listen(options.port, function(){
    console.log('Server Hakata running at: %d', options.port);
  });

};
