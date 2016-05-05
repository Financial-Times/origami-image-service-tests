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

		it('has a `quality` property', () => {
			assert.strictEqual(instance.quality, 70);
		});

		it('has a `qualityName` property', () => {
			assert.strictEqual(instance.qualityName, 'medium');
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

		describe('when the URL string has a `format` parameter', () => {

			beforeEach(() => {
				instance = new ImageServiceUrl(`${baseImageUrl}?format=png`);
			});

			it('has a `format` property', () => {
				assert.strictEqual(instance.format, 'png');
			});

		});

		describe('when the URL string has a `quality` parameter set to "lowest"', () => {

			beforeEach(() => {
				instance = new ImageServiceUrl(`${baseImageUrl}?quality=lowest`);
			});

			it('has a `quality` property', () => {
				assert.strictEqual(instance.quality, 30);
			});

			it('has a `qualityName` property', () => {
				assert.strictEqual(instance.qualityName, 'lowest');
			});

		});

		describe('when the URL string has a `quality` parameter set to "low"', () => {

			beforeEach(() => {
				instance = new ImageServiceUrl(`${baseImageUrl}?quality=low`);
			});

			it('has a `quality` property', () => {
				assert.strictEqual(instance.quality, 50);
			});

			it('has a `qualityName` property', () => {
				assert.strictEqual(instance.qualityName, 'low');
			});

		});

		describe('when the URL string has a `quality` parameter set to "medium"', () => {

			beforeEach(() => {
				instance = new ImageServiceUrl(`${baseImageUrl}?quality=medium`);
			});

			it('has a `quality` property', () => {
				assert.strictEqual(instance.quality, 70);
			});

			it('has a `qualityName` property', () => {
				assert.strictEqual(instance.qualityName, 'medium');
			});

		});

		describe('when the URL string has a `quality` parameter set to "high"', () => {

			beforeEach(() => {
				instance = new ImageServiceUrl(`${baseImageUrl}?quality=high`);
			});

			it('has a `quality` property', () => {
				assert.strictEqual(instance.quality, 80);
			});

			it('has a `qualityName` property', () => {
				assert.strictEqual(instance.qualityName, 'high');
			});

		});

		describe('when the URL string has a `quality` parameter set to "highest"', () => {

			beforeEach(() => {
				instance = new ImageServiceUrl(`${baseImageUrl}?quality=highest`);
			});

			it('has a `quality` property', () => {
				assert.strictEqual(instance.quality, 90);
			});

			it('has a `qualityName` property', () => {
				assert.strictEqual(instance.qualityName, 'highest');
			});

		});

		describe('when the URL string has a `quality` parameter set to "lossless"', () => {

			beforeEach(() => {
				instance = new ImageServiceUrl(`${baseImageUrl}?quality=lossless`);
			});

			it('has a `quality` property', () => {
				assert.strictEqual(instance.quality, 100);
			});

			it('has a `qualityName` property', () => {
				assert.strictEqual(instance.qualityName, 'lossless');
			});

		});

		describe('when the URL string has an invalid `quality` parameter', () => {

			it('throws an error', () => {
				assert.throws(() => {
					instance = new ImageServiceUrl(`${baseImageUrl}?quality=foo`);
				}, 'Invalid quality parameter');
			});

		});

	});

});
