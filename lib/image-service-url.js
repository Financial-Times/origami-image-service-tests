'use strict';

const url = require('url');

module.exports = class ImageServiceUrl {

	constructor(urlString) {
		const parsedUrl = url.parse(urlString, true);

		this.source = decodeURIComponent(parsedUrl.pathname.replace('/v1/images/raw/', ''));
		this.width = numberOrUndefined(parsedUrl.query.width);
		this.height = numberOrUndefined(parsedUrl.query.height);
		this.dpr = numberOrUndefined(parsedUrl.query.dpr);
		this.fit = parsedUrl.query.fit || 'cover';
		this.format = parsedUrl.query.format;
		this.setQuality(parsedUrl.query.quality);
	}

	setQuality(qualityName = 'medium') {
		if (!ImageServiceUrl.validQualityValues.includes(qualityName)) {
			throw new Error('Invalid quality parameter');
		}
		this.qualityName = qualityName;
		this.quality = ImageServiceUrl.qualityNameValueMap[qualityName];
	}

};

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

function numberOrUndefined(value) {
	if (value === undefined) {
		return value;
	}
	return parseInt(value, 10);
}
