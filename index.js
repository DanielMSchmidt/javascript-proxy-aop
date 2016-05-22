/* globals window*/

'use strict';
var module = {};
module.exports = function (stream) {
	var handle = {
		get: function (target, propKey) {
			var originalMethod = target[propKey];
			var methodName = target[propKey].name === '' ? `anonymous<${propKey}>` : target[propKey].name;

			var proxyFunction = function () {
				var args = Array.prototype.slice.call(arguments);
				stream.trigger('onBeforeMethod', methodName, args);
				var result = originalMethod.apply(this, args);
				stream.trigger('onAfterMethod', methodName, args, result);
				return result;
			};

			proxyFunction.displayName = methodName;
			return proxyFunction;
		}
	};

	return function (obj) {
		if (!obj) {
			return;
		}

		return new Proxy(obj, handle);
	};
};

// for browser usage and tests
window.javascriptProxyAop = module.exports;
