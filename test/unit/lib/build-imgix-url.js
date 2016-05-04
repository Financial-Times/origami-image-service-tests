'use strict';

const assert = require('proclaim');

describe('lib/build-imgix-url', () => {
	let buildImgixUrl;
	let ImageServiceUrl;

	beforeEach(() => {
		ImageServiceUrl = require('../../../lib/image-service-url');
		buildImgixUrl = require('../../../lib/build-imgix-url');
	});

	it('exports a function', () => {
		assert.isFunction(buildImgixUrl);
	});

	describe('buildImgixUrl(imageServiceUrl)', () => {
		let imageServiceUrl;
		let options;
		let returnValue;

		beforeEach(() => {
			imageServiceUrl = new ImageServiceUrl('https://image.webservices.ft.com/v1/images/raw/http%3A%2F%2Fexample.com%2Fimages%2Ffoo.jpg');
			options = {
				imgixSourceName: 'foo-source'
			};
			returnValue = buildImgixUrl(imageServiceUrl, options);
		});

		it('returns the expected imgix URL', () => {
			assert.strictEqual(returnValue, `https://foo-source.imgix.net/http%3A%2F%2Fexample.com%2Fimages%2Ffoo.jpg?fit=crop`);
		});

		describe('when `imageServiceUrl` has a `width` property', () => {

			beforeEach(() => {
				imageServiceUrl.width = 123;
				returnValue = buildImgixUrl(imageServiceUrl, options);
			});

			it('returns the expected imgix URL', () => {
				assert.strictEqual(returnValue, `https://foo-source.imgix.net/http%3A%2F%2Fexample.com%2Fimages%2Ffoo.jpg?w=123&fit=crop`);
			});

		});

		describe('when `imageServiceUrl` has a `height` property', () => {

			beforeEach(() => {
				imageServiceUrl.height = 123;
				returnValue = buildImgixUrl(imageServiceUrl, options);
			});

			it('returns the expected imgix URL', () => {
				assert.strictEqual(returnValue, `https://foo-source.imgix.net/http%3A%2F%2Fexample.com%2Fimages%2Ffoo.jpg?h=123&fit=crop`);
			});

		});

		describe('when `imageServiceUrl` is not an instance of `ImageServiceUrl`', () => {

			it('throws an error', () => {
				assert.throws(() => {
					buildImgixUrl('foo');
				}, 'Invalid argument, expected instance of ImageServiceUrl');
			});

		});

	});

});
