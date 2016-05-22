/* globals it, Bullet, fail, expect, window */
'use strict';

it('may track a method on an object', function (done) {
	var instrument = window.javascriptProxyAop(Bullet);
	var onBeforeMethodCalled = false;
	var onAfterMethodCalled = false;

	Bullet.on('onBeforeMethod', function () {
		onBeforeMethodCalled = true;

		if (onAfterMethodCalled) {
			fail('wrong order');
			done();
		}
	});

	Bullet.on('onAfterMethod', function () {
		onAfterMethodCalled = true;

		if (onBeforeMethodCalled) {
			expect(true).toEqual(true);
			done();
		}
	});

	var obj = instrument({
		method: function () {}
	});
	obj.method();
});
