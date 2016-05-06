#!/usr/bin/env node
'use strict';

const config = require('../config');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

const downloadPath = `${__dirname}/../download`;

// Build a flat array of all images
const images = [];
config.images.forEach((image) => {
	images.push({
		name: `${image.label} - Image Service.${image.info.format}`,
		source: image.imageService
	});
	images.push({
		name: `${image.label} - Cloudinary.${image.info.format}`,
		source: image.cloudinary
	});
	images.push({
		name: `${image.label} - imgix.${image.info.format}`,
		source: image.imgix
	});
});

// Create the download folder
execSync(`mkdir -p ${downloadPath}`);

// Download all the images
Promise.all(images.map(image => {
	return new Promise(resolve => {
		console.log(`Downloading "${image.name}"...`);
		exec(`curl "${image.source}" --output "${downloadPath}/${image.name}"`, error => {
			if (error) {
				console.error(`Failed to download "${image.name}"`);
				return resolve();
			}
			console.log(`Downloaded "${image.name}"`);
			resolve();
		});
	});
}));
