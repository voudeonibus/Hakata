'use strict';

// Require modules
var httpProxy = require('http-proxy');
var http = require('http');
var Tourniquet = require('tourniquet/client');
var _ = require('underscore');

module.exports = function(option) {

  // Variables
  var proxy = httpProxy.createProxyServer({});
  var servicesConf = [];
  var clientTourniquet = new Tourniquet();

  option = option = {
    port: 9090,
    request: require('./requestDefaut')
  };

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
