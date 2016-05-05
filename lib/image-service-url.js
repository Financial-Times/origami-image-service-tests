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
	}

};

function numberOrUndefined(value) {
	if (value === undefined) {
		return value;
	}
	return parseInt(value, 10);
}
