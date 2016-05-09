'use strict';

const assert = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/image-service-url', () => {
	let colornames;
	let ImageServiceUrl;

	beforeEach(() => {
		colornames = sinon.stub();
		mockery.registerMock('colornames', colornames);

		ImageServiceUrl = require('../../../lib/image-service-url');
	});

	it('exports a function', () => {
		assert.isFunction(ImageServiceUrl);
	});

	it('has a `validFitValues` property', () => {
		assert.deepEqual(ImageServiceUrl.validFitValues, [
			'contain',
			'cover',
			'scale-down'
		]);
	});

	it('has a `validFormatValues` property', () => {
		assert.deepEqual(ImageServiceUrl.validFormatValues, [
			'auto',
			'jpg',
			'png',
			'svg'
		]);
	});

	it('has a `validQualityValues` property', () => {
		assert.deepEqual(ImageServiceUrl.validQualityValues, [
			'lowest',
			'low',
			'medium',
			'high',
			'highest',
			'lossless'
		]);
	});

	it('has a `qualityNameValueMap` property', () => {
		assert.deepEqual(ImageServiceUrl.qualityNameValueMap, {
			'lowest': 30,
			'low': 50,
			'medium': 70,
			'high': 80,
			'highest': 90,
			'lossless': 100
		});
	});

	describe('new ImageServiceUrl(urlString)', () => {
		let baseImageUrl;
		let instance;

		beforeEach(() => {
			baseImageUrl = 'https://image.webservices.ft.com/v1/images/raw/http%3A%2F%2Fexample.com%2Fimages%2Ffoo.jpg';
			instance = new ImageServiceUrl(baseImageUrl);
		});

		it('has a `setWidth` method', () => {
			assert.isFunction(instance.setWidth);
		});

		describe('.setWidth(value)', () => {

			beforeEach(() => {
				sinon.spy(instance, '_setNumericProperty');
				instance.setWidth(123);
			});

			it('calls the `_setNumericProperty` method with the expected arguments', () => {
				assert.calledOnce(instance._setNumericProperty);
				assert.calledWithExactly(instance._setNumericProperty, 'width', 123);
			});

		});

		it('has a `setHeight` method', () => {
			assert.isFunction(instance.setHeight);
		});

		describe('.setHeight(value)', () => {

			beforeEach(() => {
				sinon.spy(instance, '_setNumericProperty');
				instance.setHeight(123);
			});

			it('calls the `_setNumericProperty` method with the expected arguments', () => {
				assert.calledOnce(instance._setNumericProperty);
				assert.calledWithExactly(instance._setNumericProperty, 'height', 123);
			});

		});

		it('has a `setDpr` method', () => {
			assert.isFunction(instance.setDpr);
		});

		describe('.setDpr(value)', () => {

			beforeEach(() => {
				sinon.spy(instance, '_setNumericProperty');
				instance.setDpr(2);
			});

			it('calls the `_setNumericProperty` method with the expected arguments', () => {
				assert.calledOnce(instance._setNumericProperty);
				assert.calledWithExactly(instance._setNumericProperty, 'dpr', 2);
			});

		});

		it('has a `setFit` method', () => {
			assert.isFunction(instance.setFit);
		});

		describe('.setFit(value)', () => {

			beforeEach(() => {
				sinon.spy(instance, '_setEnumerableProperty');
				instance.setFit('scale-down');
			});

			it('calls the `_setEnumerableProperty` method with the expected arguments', () => {
				assert.calledOnce(instance._setEnumerableProperty);
				assert.calledWithExactly(instance._setEnumerableProperty, 'fit', ImageServiceUrl.validFitValues, 'scale-down');
			});

			describe('when `value` is `undefined`', () => {

				beforeEach(() => {
					instance._setEnumerableProperty.reset();
					instance.setFit();
				});

				it('defaults to "cover"', () => {
					assert.calledWithExactly(instance._setEnumerableProperty, 'fit', ImageServiceUrl.validFitValues, 'cover');
				});

			});

		});

		it('has a `setFormat` method', () => {
			assert.isFunction(instance.setFormat);
		});

		describe('.setFormat(value)', () => {

			beforeEach(() => {
				sinon.spy(instance, '_setEnumerableProperty');
				instance.setFormat('png');
			});

			it('calls the `_setEnumerableProperty` method with the expected arguments', () => {
				assert.calledOnce(instance._setEnumerableProperty);
				assert.calledWithExactly(instance._setEnumerableProperty, 'format', ImageServiceUrl.validFormatValues, 'png');
			});

			describe('when `value` is "auto"', () => {

				beforeEach(() => {
					delete instance.format;
				});

				describe('when the `qualityName` property is "lossless"', () => {

					beforeEach(() => {
						instance.qualityName = 'lossless';
						instance.setFormat('auto');
					});

					it('sets the `format` property to "png"', () => {
						assert.strictEqual(instance.format, 'png');
					});

				});

				describe('when the `qualityName` property is not "lossless"', () => {

					beforeEach(() => {
						instance.setFormat('auto');
					});

					it('sets the `format` property to "jpg"', () => {
						assert.strictEqual(instance.format, 'jpg');
					});

				});

			});

			describe('when `value` is `undefined`', () => {

				beforeEach(() => {
					instance._setEnumerableProperty.reset();
					instance.setFormat();
				});

				it('defaults to "auto"', () => {
					assert.calledWithExactly(instance._setEnumerableProperty, 'format', ImageServiceUrl.validFormatValues, 'auto');
				});

			});

		});

		it('has a `setQuality` method', () => {
			assert.isFunction(instance.setQuality);
		});

		describe('.setQuality(value)', () => {

			beforeEach(() => {
				sinon.spy(instance, '_setEnumerableProperty');
				instance.setQuality('lowest');
			});

			it('calls the `_setEnumerableProperty` method with the expected arguments', () => {
				assert.calledOnce(instance._setEnumerableProperty);
				assert.calledWithExactly(instance._setEnumerableProperty, 'quality', ImageServiceUrl.validQualityValues, 'lowest');
			});

			it('sets the `qualityName` property to `value`', () => {
				assert.strictEqual(instance.qualityName, 'lowest');
			});

			it('sets the `quality` property to a corresponding numeric value', () => {
				assert.strictEqual(instance.quality, 30);
			});

			describe('when `value` is `undefined`', () => {

				beforeEach(() => {
					instance._setEnumerableProperty.reset();
					instance.setQuality();
				});

				it('defaults to "medium"', () => {
					assert.calledWithExactly(instance._setEnumerableProperty, 'quality', ImageServiceUrl.validQualityValues, 'medium');
				});

			});

		});

		it('has a `setBgColor` method', () => {
			assert.isFunction(instance.setBgColor);
		});

		describe('.setBgColor(value)', () => {

			beforeEach(() => {
				sinon.spy(instance, '_setColorProperty');
				instance.setBgColor('ff0000');
			});

			it('calls the `_setColorProperty` method with the expected arguments', () => {
				assert.calledOnce(instance._setColorProperty);
				assert.calledWithExactly(instance._setColorProperty, 'bgcolor', 'ff0000');
			});

			describe('when the `format` property is `png`', () => {

				beforeEach(() => {
					instance._setColorProperty.reset();
					instance.format = 'png';
					instance.setBgColor('ff0000');
				});

				it('sets the `bgcolor` property to `undefined`', () => {
					assert.calledWithExactly(instance._setColorProperty, 'bgcolor', undefined);
				});

			});

		});

		it('has a `_setNumericProperty` method', () => {
			assert.isFunction(instance._setNumericProperty);
		});

		describe('._setNumericProperty(property, value)', () => {

			beforeEach(() => {
				instance._setNumericProperty('width', 123);
			});

			it('sets the matching property to `value`', () => {
				assert.strictEqual(instance.width, 123);
			});

			describe('when `value` is a numeric string', () => {

				beforeEach(() => {
					instance._setNumericProperty('width', '123');
				});

				it('sets the matching property to `value` converted into a number', () => {
					assert.strictEqual(instance.width, 123);
				});

			});

			describe('when `value` is `undefined`', () => {

				beforeEach(() => {
					instance._setNumericProperty('width');
				});

				it('sets the matching property to `undefined`', () => {
					assert.isUndefined(instance.width);
				});

			});

			describe('when `value` is smaller than `1`', () => {

				it('throws an error', () => {
					assert.throws(() => instance._setNumericProperty('width', 0), 'Invalid width parameter');
					assert.throws(() => instance._setNumericProperty('width', -1), 'Invalid width parameter');
				});

			});

			describe('when `value` is not a whole number', () => {

				it('throws an error', () => {
					assert.throws(() => instance._setNumericProperty('width', 1.5), 'Invalid width parameter');
				});

			});

			describe('when `value` is not a number, numeric string, or `undefined`', () => {

				it('throws an error', () => {
					assert.throws(() => instance._setNumericProperty('width', 'foo'), 'Invalid width parameter');
					assert.throws(() => instance._setNumericProperty('width', null), 'Invalid width parameter');
					assert.throws(() => instance._setNumericProperty('width', {}), 'Invalid width parameter');
				});

			});

		});

		it('has a `_setEnumerableProperty` method', () => {
			assert.isFunction(instance._setEnumerableProperty);
		});

		describe('._setEnumerableProperty(property, allowedValues, value)', () => {

			beforeEach(() => {
				instance._setEnumerableProperty('foo', ['bar', 'baz'], 'bar');
			});

			it('sets the matching property to `value`', () => {
				assert.strictEqual(instance.foo, 'bar');
			});

			describe('when `value` is `undefined`', () => {

				beforeEach(() => {
					instance._setEnumerableProperty('foo', ['bar', 'baz']);
				});

				it('sets the matching property to `undefined`', () => {
					assert.isUndefined(instance.foo);
				});

			});

			describe('when `value` is not in `allowedValues`', () => {

				it('throws an error', () => {
					assert.throws(() => instance._setEnumerableProperty('foo', ['bar', 'baz'], 'qux'), 'Invalid foo parameter');
				});

			});

		});

		it('has a `_setColorProperty` method', () => {
			assert.isFunction(instance._setColorProperty);
		});

		describe('._setColorProperty(property, value)', () => {

			beforeEach(() => {
				sinon.stub(instance, '_sanitizeColorValue').withArgs('raw').returns('sanitized');
				instance._setColorProperty('bgcolor', 'raw');
			});

			it('sets the matching property to the sanitized `value`', () => {
				assert.calledOnce(instance._sanitizeColorValue);
				assert.calledWithExactly(instance._sanitizeColorValue, 'raw');
				assert.strictEqual(instance.bgcolor, 'sanitized');
			});

		});

		describe('._sanitizeColorValue(value)', () => {

			beforeEach(() => {
				colornames.withArgs('red').returns('#ff0000');
			});

			it('returns `value`', () => {
				assert.strictEqual(instance._sanitizeColorValue('ff0000'), 'ff0000');
			});

			describe('when `value` is a short hex code', () => {

				it('returns the full hex code', () => {
					assert.strictEqual(instance._sanitizeColorValue('0f0'), '00ff00');
				});

			});

			describe('when `value` is "transparent"', () => {

				it('returns "ffffff"', () => {
					assert.strictEqual(instance._sanitizeColorValue('transparent'), 'ffffff');
				});

			});

			describe('when `value` is a named color', () => {

				it('returns the full hex code', () => {
					assert.strictEqual(instance._sanitizeColorValue('red'), 'ff0000');
				});

			});

			describe('when `value` is a hex code including the preceeding hash', () => {

				it('returns `value` with the hash removed', () => {
					assert.strictEqual(instance._sanitizeColorValue('#ff0000'), 'ff0000');
				});

			});

			describe('when `value` is `undefined`', () => {

				it('returns `undefined`', () => {
					assert.isUndefined(instance._sanitizeColorValue());
				});

			});

			describe('when `value` is not a valid hex color or named colour', () => {

				it('returns "000000"', () => {
					assert.strictEqual(instance._sanitizeColorValue('0f'), '000000');
					assert.strictEqual(instance._sanitizeColorValue('ff00000'), '000000');
					assert.strictEqual(instance._sanitizeColorValue('hello'), '000000');
				});

			});

		});

	});

});
