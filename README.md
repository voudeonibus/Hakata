# Hakata

[![npm version](https://img.shields.io/npm/v/hakata.svg?style=flat)](https://www.npmjs.com/package/hakata)
[![dependency Status](https://img.shields.io/david/voudeonibus/hakata.svg?style=flat)](https://david-dm.org/voudeonibus/hakata#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/voudeonibus/hakata.svg?style=flat)](https://david-dm.org/voudeonibus/hakata#info=devDependencies)
![download github](https://img.shields.io/github/downloads/voudeonibus/Hakata/latest/total.svg)
![download npm month](https://img.shields.io/npm/dm/hakata.svg)
![license](https://img.shields.io/npm/l/hakata.svg)

Hakata is a service registry build primarily on [Node.js](http://nodejs.org/)/[io.js](https://iojs.org/en/index.html), integrated with [Tourniquet](https://github.com/voudeonibus/Tourniquet).

Reverse Proxy with Registry Service by Vou de Ônibus.

## Table of contents

- [Quick start](#quick-start)
- [Starting](#starting)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [License](#license)

## Quick start

Several quick start options are available:

- Clone the repo: `git clone https://github.com/voudeonibus/Hakata.git`.
- Install with [npm](https://www.npmjs.com): `npm install hakata`.

## Starting

```javascript
var Hakata = require('hakata');

Hakata({
  port: 9090,
  tourniquet_port: 5000,
  tourniquet_host: '127.0.0.1'
});
```

### Options

- **port:** Hakata port | **default:** 9090
- **tourniquet_port:** port of tourniquet | **default:** 5000
- **tourniquet_host:** host of tourniquet | **default:** 127.0.0.1
- **request:** function to customize rule of proxy | optinal

### Note

You can configure all options as environment variables in UpperCase(eg: TOURNIQUET_PORT), except the parameter **port** and **request**, that as environment variables
should be **TOURNIQUET_HOST**


## Bugs and feature requests

Have a bug or a feature request? Please first search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/voudeonibus/Hakata/issues/new).

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, Hakata is maintained under [the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.

## License

[MIT](https://github.com/voudeonibus/Hakata/blob/master/LICENSE)
