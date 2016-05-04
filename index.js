'use strict';

const buildCloudinaryUrl = require('./lib/build-cloudinary-url');
const buildImgixUrl = require('./lib/build-imgix-url');
const express = require('express');
const consolidate = require('consolidate');
const ImageServiceUrl = require('./lib/image-service-url');
const pkg = require('./package.json');

const app = express();
const port = process.env.PORT || 8080;
const cloudinaryAccountName = process.env.CLOUDINARY_ACCOUNT_NAME;
const imgixSecureUrlToken = process.env.IMGIX_SECURE_URL_TOKEN;
const imgixSourceName = process.env.IMGIX_SOURCE_NAME;

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

// Configure the Express app
app.disable('x-powered-by');
app.use(express.static(`${__dirname}/public`));

// Configure the views
app.engine('html', consolidate.hogan);
app.set('view engine', 'html');
app.set('views', `${__dirname}/view`);
app.set('partials', `${__dirname}/view/partial`);
app.locals.images = images;
app.locals.pkg = pkg;

// Home page route
app.get('/', (request, response) => {
	response.render('index');
});

// Start the app
app.listen(port, error => {
	if (error) {
		console.error(error.stack);
		process.exit(1);
	}
	console.log(`${pkg.name} started`);
});
