'use strict';

const url = require('url');

module.exports = class ImageServiceUrl {

	constructor(urlString) {
		const parsedUrl = url.parse(urlString, true);

		this.source = decodeURIComponent(parsedUrl.pathname.replace('/v1/images/raw/', ''));
		this.width = numberOrUndefined(parsedUrl.query.width);
		this.height = numberOrUndefined(parsedUrl.query.height);
	}

};

function numberOrUndefined(value) {
	if (value === undefined) {
		return value;
	}
	return parseInt(value, 10);
}
