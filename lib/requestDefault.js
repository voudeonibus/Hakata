'use strict';

// Require modules
var url = require('url');

module.exports = function(req, res, services, proxy) {
  var target = url.parse(req.url);

  for (var i = 0, _len = services.length; i < _len; i++) {

    var service = services[i];

    if (target.pathname.indexOf(service.name) !== -1) {
      proxy.web(req, res, {target: 'http://' + service.host + ':' + service.port });
    }

  }
};
