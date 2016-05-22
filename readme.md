# javascript-proxy-aop [![Build Status](https://travis-ci.org/DanielMSchmidt/javascript-proxy-aop.svg?branch=master)](https://travis-ci.org/DanielMSchmidt/javascript-proxy-aop) [![Coverage Status](https://coveralls.io/repos/github/DanielMSchmidt/javascript-proxy-aop/badge.svg?branch=master)](https://coveralls.io/github/DanielMSchmidt/javascript-proxy-aop?branch=master)

> Uses ES6 Proxy to instrument JS in an (unfortunately too verbose) aspect-oriented way


## Install

```
$ npm install --save javascript-proxy-aop
```


## Usage

```js
const javascriptProxyAop = require('javascript-proxy-aop');

// pubSub may be any object that supports trigger
const instrument = javascriptProxyAop(pubSub);

const obj = instrument({
	method: function() {},
	anotherMethod: function fooBar() {}
});

obj.method(['hello', 'world']);
// => pubSub.on('onBeforeMethod', method, args) is called
//		=> method: 'anonymous<method>'
//		=> args: [['hello', 'world']]
// => pubSub.on('onAfterMethod', method, args) is called
//		=> method: 'anonymous<method>'
//		=> args: [['hello', 'world']]
//		=> result: undefined

obj.anotherMethod(); // method is 'fooBar'
```

## TODO

- [ ] enable to instrument functions directly


## License

MIT © [Daniel Schmidt](http://danielmschmidt.de)
