'use strict';

const colornames = require('colornames');
const url = require('url');

module.exports = class ImageServiceUrl {

	constructor(urlString) {
		const parsedUrl = url.parse(urlString, true);
		this.source = decodeURIComponent(parsedUrl.pathname.replace('/v1/images/raw/', ''));

		this.setWidth(parsedUrl.query.width);
		this.setHeight(parsedUrl.query.height);
		this.setDpr(parsedUrl.query.dpr);
		this.setFit(parsedUrl.query.fit);
		this.setQuality(parsedUrl.query.quality);
		this.setFormat(parsedUrl.query.format);
		this.setBgColor(parsedUrl.query.bgcolor);
	}

	setWidth(value) {
		this._setNumericProperty('width', value);
	}

	setHeight(value) {
		this._setNumericProperty('height', value);
	}

	setDpr(value) {
		this._setNumericProperty('dpr', value);
	}

	setFit(value = 'cover') {
		this._setEnumerableProperty('fit', ImageServiceUrl.validFitValues, value);
	}

	setFormat(value = 'auto') {
		this._setEnumerableProperty('format', ImageServiceUrl.validFormatValues, value);
		if (value === 'auto') {
			if (this.qualityName === 'lossless') {
				return this.format = 'png';
			}
			this.format = 'jpg';
		}
	}

	setQuality(value = 'medium') {
		this._setEnumerableProperty('quality', ImageServiceUrl.validQualityValues, value);
		this.qualityName = this.quality;
		this.quality = ImageServiceUrl.qualityNameValueMap[this.qualityName];
	}

	setBgColor(value) {
		if (this.format === 'png') {
			value = undefined;
		}
		this._setColorProperty('bgcolor', value);
	}

	_setNumericProperty(property, value) {
		if (value === undefined) {
			return this[property] = value;
		}
		if (typeof value !== 'string' && typeof value !== 'number') {
			throw new Error(`Invalid ${property} parameter`);
		}
		value = Number(value);
		if (value < 1 || isNaN(value) || value % 1 !== 0) {
			throw new Error(`Invalid ${property} parameter`);
		}
		this[property] = value;
	}

	_setEnumerableProperty(property, allowedValues, value) {
		if (value === undefined) {
			return this[property] = value;
		}
		if (!allowedValues.includes(value)) {
			throw new Error(`Invalid ${property} parameter`);
		}
		this[property] = value;
	}

	_setColorProperty(property, value) {
		if (value === undefined) {
			return this[property] = value;
		}
		if (value === 'transparent') {
			value = 'ffffff';
		}
		if (!/^#?[0-9a-f]{3,6}$/i.test(value)) {
			value = colornames(value) || '000000';
		}
		if (value[0] === '#') {
			value = value.substr(1);
		}
		if (/^[0-9a-f]{3}$/i.test(value)) {
			value = value.split('').map(character => character + character).join('');
		}
		this[property] = value;
	}

};

module.exports.validFitValues = [
	'contain',
	'cover',
	'scale-down'
];

module.exports.validFormatValues = [
	'auto',
	'jpg',
	'png',
	'svg'
];

module.exports.validQualityValues = [
	'lowest',
	'low',
	'medium',
	'high',
	'highest',
	'lossless'
];

module.exports.qualityNameValueMap = {
	'lowest': 30,
	'low': 50,
	'medium': 70,
	'high': 80,
	'highest': 90,
	'lossless': 100
};
