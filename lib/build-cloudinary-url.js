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
	const imageTransforms = {
		type: 'fetch',
		width: imageServiceUrl.width,
		height: imageServiceUrl.height,
		dpr: imageServiceUrl.dpr,
		format: imageServiceUrl.format,
		quality: imageServiceUrl.quality,
		background: (imageServiceUrl.bgcolor ? `#${imageServiceUrl.bgcolor}` : undefined),
		crop: getCloudinaryCropStrategy(imageServiceUrl.fit)
	};
	if (imageServiceUrl.tint !== undefined) {
		tintTransform(imageTransforms, imageServiceUrl.tint);
	}
	return imageTransforms;
}

function tintTransform(imageTransforms, imageServiceTint) {
	if (imageServiceTint.length === 1 || (imageServiceTint.length === 2 && imageServiceTint[0] === imageServiceTint[1])) {
		imageTransforms.color = `#${imageServiceTint[0]}`;
		imageTransforms.effect = 'colorize:50';
		return;
	}
	// if (imageServiceTint.length === 2) {
	// 	imageTransforms.color = `#${imageServiceTint[0]}`;
	// 	imageTransforms.effect = 'colorize:50';
	// 	return;
	// }
}

function getCloudinaryCropStrategy(imageServiceStrategy) {
	const cropStrategyMap = {
		contain: 'fit',
		cover: 'fill',
		'scale-down': 'limit'
	};
	return cropStrategyMap[imageServiceStrategy];
}
