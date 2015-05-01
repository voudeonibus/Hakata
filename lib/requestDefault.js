'use strict';

// Require modules
var url = require('url');

module.exports = function(req, res, services, proxy, options) {
  var target = url.parse(req.url);

  if (services.length === 0) {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end('{"message": "No service registered"}');

    return;
  }

  for (var i = 0, _len = services.length; i < _len; i++) {

    var service = services[i];

    if (options.meta_target) {

      if (target.path.indexOf(service.meta[options.meta_target]) !== -1) {
        proxy.web(req, res, {target: 'http://' + service.host + ':' + service.port });
      }

    } else {

      if (target.pathname.indexOf(service.name) !== -1) {
        proxy.web(req, res, {target: 'http://' + service.host + ':' + service.port });
      }

    }

  }
};
