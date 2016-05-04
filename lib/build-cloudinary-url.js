'use strict';

const cloudinary = require('cloudinary');
const ImageServiceUrl = require('./image-service-url');

module.exports = buildCloudinaryUrl;

function buildCloudinaryUrl(imageServiceUrl, options) {
	if (!(imageServiceUrl instanceof ImageServiceUrl)) {
		throw new Error('Invalid argument, expected instance of ImageServiceUrl');
	}
	cloudinary.config({
		cloud_name: options.cloudinaryAccountName
	});
	return cloudinary.url(imageServiceUrl.source, buildCloudinaryTransforms(imageServiceUrl));
}

function buildCloudinaryTransforms(imageServiceUrl) {
	return {
		type: 'fetch',
		width: imageServiceUrl.width,
		height: imageServiceUrl.height,
		crop: 'fill' // TODO don't hard-code this
	};
}
