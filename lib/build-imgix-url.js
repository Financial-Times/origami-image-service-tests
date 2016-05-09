'use strict';

const ImageServiceUrl = require('./image-service-url');
const ImgixClient = require('imgix-core-js');

module.exports = buildImgixUrl;

function buildImgixUrl(imageServiceUrl, options) {
	if (!(imageServiceUrl instanceof ImageServiceUrl)) {
		throw new Error('Invalid argument, expected instance of ImageServiceUrl');
	}
	const client = new ImgixClient({
		host: `${options.imgixSourceName}.imgix.net`,
		includeLibraryParam: false,
		secureURLToken: options.imgixSecureUrlToken
	});
	return client.buildURL(imageServiceUrl.source, buildImgixTransforms(imageServiceUrl));
}

function buildImgixTransforms(imageServiceUrl) {
	const imageTransforms = {};
	if (imageServiceUrl.width !== undefined) {
		imageTransforms.w = imageServiceUrl.width;
	}
	if (imageServiceUrl.height !== undefined) {
		imageTransforms.h = imageServiceUrl.height;
	}
	if (imageServiceUrl.dpr !== undefined) {
		imageTransforms.dpr = imageServiceUrl.dpr;
	}
	if (imageServiceUrl.bgcolor !== undefined) {
		imageTransforms.bg = imageServiceUrl.bgcolor;
	}
	imageTransforms.fm = imageServiceUrl.format;
	imageTransforms.quality = imageServiceUrl.quality;
	imageTransforms.fit = getImgixFitStrategy(imageServiceUrl.fit);
	return imageTransforms;
}

function getImgixFitStrategy(imageServiceStrategy) {
	const fitStrategyMap = {
		contain: 'clip',
		cover: 'crop',
		'scale-down': 'max'
	};
	return fitStrategyMap[imageServiceStrategy];
}
