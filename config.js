'use strict';

const buildCloudinaryUrl = require('./lib/build-cloudinary-url');
const buildImgixUrl = require('./lib/build-imgix-url');
const ImageServiceUrl = require('./lib/image-service-url');

const cloudinaryAccountName = process.env.CLOUDINARY_ACCOUNT_NAME;
const imgixSecureUrlToken = process.env.IMGIX_SECURE_URL_TOKEN;
const imgixSourceName = process.env.IMGIX_SOURCE_NAME;
const port = process.env.PORT || 8080;

if (!cloudinaryAccountName || !imgixSecureUrlToken || !imgixSourceName) {
	console.error('Please provide CLOUDINARY_ACCOUNT_NAME, IMGIX_SECURE_URL_TOKEN, and IMGIX_SOURCE_NAME');
	process.exit(1);
}

// Generate image variants
const images = require('./data/images.json').map(image => {
	const imageServiceUrl = new ImageServiceUrl(image.source);
	return {
		label: image.label,
		issues: image.issues,
		info: imageServiceUrl,
		imageService: image.source,
		cloudinary: buildCloudinaryUrl(imageServiceUrl, {
			cloudinaryAccountName
		}),
		imgix: buildImgixUrl(imageServiceUrl, {
			imgixSecureUrlToken,
			imgixSourceName
		})
	};
});

// Exports
module.exports = {
	cloudinaryAccountName,
	images,
	imgixSecureUrlToken,
	imgixSourceName,
	port
};
