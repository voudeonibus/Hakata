'use strict';

// Require modules
var httpProxy = require('http-proxy');
var http = require('http');
var Tourniquet = require('tourniquet/client');
var _ = require('underscore');

module.exports = function(option) {

  option = option = {
    port: 9090,
    request: require('./requestDefaut')
  };

  // Variables
  var proxy = httpProxy.createProxyServer({});
  var servicesConf = [];
  var clientTourniquet = new Tourniquet({
    tourniquet_port: option.tourniquet_port || process.env.TOURNIQUET_PORT || undefined,
    tourniquet_host: option.tourniquet_host || process.env.TOURNIQUET_HOST || undefined
  });

  clientTourniquet.on('new service', function(service) {

    if (_.contains(servicesConf, service)) {
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

    option.request(req, res, servicesConf, proxy);

  });

  server.listen(option.port, function(){
    console.log('Server Hakata running at: %d', option.port);
  });

};
