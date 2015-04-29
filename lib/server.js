'use strict';

// Require modules
var httpProxy = require('http-proxy');
var http = require('http');
var Tourniquet = require('tourniquet/client');
var _ = require('lodash');

module.exports = function(options) {

  options = options || {
    port: 9090,
    request: require('./requestDefault')
  };

  // Variables
  var proxy = httpProxy.createProxyServer({});
  var servicesConf = [];
  var clientTourniquet = new Tourniquet({
    tourniquet_port: options.tourniquet_port || process.env.TOURNIQUET_PORT || undefined,
    tourniquet_host: options.tourniquet_host || process.env.TOURNIQUET_HOST || undefined
  });

  clientTourniquet.on('new service', function(service) {

    if (_.includes(servicesConf, service)) {
      servicesConf.push(service);
    }

  });

  clientTourniquet.on('delete service', function(service) {

    var index = _.indexOf(servicesConf, service);

    if (index > -1) {
      servicesConf.splice(index, 1);
    }

  });

  clientTourniquet.allServices(function(services) {

    for (var i = 0, _len = services.length; i < _len; i++) {
      var service = services[i];
      var index = _.indexOf(servicesConf, service);

      if (index === -1) {
        servicesConf.push(service);
      }
    }

  });

  // Creating server to proxy
  var server = http.createServer(function(req, res) {

    options.request(req, res, servicesConf, proxy, options);

  });

  server.listen(options.port, function(){
    console.log('Server Hakata running at: %d', options.port);
  });

};
