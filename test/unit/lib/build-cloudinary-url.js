'use strict';

const assert = require('proclaim');

describe('lib/build-cloudinary-url', () => {
	let buildCloudinaryUrl;
	let ImageServiceUrl;

	beforeEach(() => {
		ImageServiceUrl = require('../../../lib/image-service-url');
		buildCloudinaryUrl = require('../../../lib/build-cloudinary-url');
	});

	it('exports a function', () => {
		assert.isFunction(buildCloudinaryUrl);
	});

	describe('buildCloudinaryUrl(imageServiceUrl)', () => {
		let imageServiceUrl;
		let options;
		let returnValue;

		beforeEach(() => {
			imageServiceUrl = new ImageServiceUrl('https://image.webservices.ft.com/v1/images/raw/http%3A%2F%2Fexample.com%2Fimages%2Ffoo.jpg');
			options = {
				cloudinaryAccountName: 'foo-account'
			};
			returnValue = buildCloudinaryUrl(imageServiceUrl, options);
		});

		it('returns the expected Cloudinary URL', () => {
			assert.strictEqual(returnValue, 'http://res.cloudinary.com/foo-account/image/fetch/c_fill/http://example.com/images/foo.jpg');
		});

		describe('when `imageServiceUrl` has a `width` property', () => {

			beforeEach(() => {
				imageServiceUrl.width = 123;
				returnValue = buildCloudinaryUrl(imageServiceUrl, options);
			});

			it('returns the expected Cloudinary URL', () => {
				assert.strictEqual(returnValue, 'http://res.cloudinary.com/foo-account/image/fetch/c_fill,w_123/http://example.com/images/foo.jpg');
			});

		});

		describe('when `imageServiceUrl` has a `height` property', () => {

			beforeEach(() => {
				imageServiceUrl.height = 123;
				returnValue = buildCloudinaryUrl(imageServiceUrl, options);
			});

			it('returns the expected Cloudinary URL', () => {
				assert.strictEqual(returnValue, 'http://res.cloudinary.com/foo-account/image/fetch/c_fill,h_123/http://example.com/images/foo.jpg');
			});

		});

		describe('when `imageServiceUrl` has a `fit` property set to `contain`', () => {

			beforeEach(() => {
				imageServiceUrl.fit = 'contain';
				returnValue = buildCloudinaryUrl(imageServiceUrl, options);
			});

			it('returns the expected Cloudinary URL', () => {
				assert.strictEqual(returnValue, 'http://res.cloudinary.com/foo-account/image/fetch/c_fit/http://example.com/images/foo.jpg');
			});

		});

		describe('when `imageServiceUrl` has a `fit` property set to `cover`', () => {

			beforeEach(() => {
				imageServiceUrl.fit = 'cover';
				returnValue = buildCloudinaryUrl(imageServiceUrl, options);
			});

			it('returns the expected Cloudinary URL', () => {
				assert.strictEqual(returnValue, 'http://res.cloudinary.com/foo-account/image/fetch/c_fill/http://example.com/images/foo.jpg');
			});

		});

		describe('when `imageServiceUrl` has a `fit` property set to `scale-down`', () => {

			beforeEach(() => {
				imageServiceUrl.fit = 'scale-down';
				returnValue = buildCloudinaryUrl(imageServiceUrl, options);
			});

			it('returns the expected Cloudinary URL', () => {
				assert.strictEqual(returnValue, 'http://res.cloudinary.com/foo-account/image/fetch/c_limit/http://example.com/images/foo.jpg');
			});

		});

		describe('when `imageServiceUrl` has a `fit` property set to `notavalue`', () => {

			beforeEach(() => {
				imageServiceUrl.fit = 'notavalue';
				returnValue = buildCloudinaryUrl(imageServiceUrl, options);
			});

			it('returns the expected Cloudinary URL', () => {
				assert.strictEqual(returnValue, 'http://res.cloudinary.com/foo-account/image/fetch/c_fill/http://example.com/images/foo.jpg');
			});

		});

		describe('when `imageServiceUrl` is not an instance of `ImageServiceUrl`', () => {

			it('throws an error', () => {
				assert.throws(() => {
					buildCloudinaryUrl('foo');
				}, 'Invalid argument, expected instance of ImageServiceUrl');
			});

		});

	});

});
