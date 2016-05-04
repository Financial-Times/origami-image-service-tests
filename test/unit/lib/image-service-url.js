'use strict';

const assert = require('proclaim');

describe('lib/image-service-url', () => {
	let ImageServiceUrl;

	beforeEach(() => {
		ImageServiceUrl = require('../../../lib/image-service-url');
	});

	it('exports a function', () => {
		assert.isFunction(ImageServiceUrl);
	});

	describe('new ImageServiceUrl(urlString)', () => {
		let baseImageUrl;
		let instance;

		beforeEach(() => {
			baseImageUrl = 'https://image.webservices.ft.com/v1/images/raw/http%3A%2F%2Fexample.com%2Fimages%2Ffoo.jpg';
			instance = new ImageServiceUrl(baseImageUrl);
		});

		it('has a `source` property', () => {
			assert.strictEqual(instance.source, 'http://example.com/images/foo.jpg');
		});

		it('has a `fit` property', () => {
			assert.strictEqual(instance.fit, 'cover');
		});

		describe('when the URL string has a `width` parameter', () => {

			beforeEach(() => {
				instance = new ImageServiceUrl(`${baseImageUrl}?width=123`);
			});

			it('has a `width` property', () => {
				assert.strictEqual(instance.width, 123);
			});

		});

		describe('when the URL string has a `height` parameter', () => {

			beforeEach(() => {
				instance = new ImageServiceUrl(`${baseImageUrl}?height=123`);
			});

			it('has a `height` property', () => {
				assert.strictEqual(instance.height, 123);
			});

		});

		describe('when the URL string has a `dpr` parameter', () => {

			beforeEach(() => {
				instance = new ImageServiceUrl(`${baseImageUrl}?dpr=2`);
			});

			it('has a `dpr` property', () => {
				assert.strictEqual(instance.dpr, 2);
			});

		});

		describe('when the URL string has a `fit` parameter', () => {

			beforeEach(() => {
				instance = new ImageServiceUrl(`${baseImageUrl}?fit=foo`);
			});

			it('has a `fit` property', () => {
				assert.strictEqual(instance.fit, 'foo');
			});

		});

	});

});
