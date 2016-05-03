'use strict';

const express = require('express');
const pkg = require('./package.json');

const app = express();
const port = process.env.PORT || 8080;

// Configure the Express app
app.disable('x-powered-by');
app.use(express.static(`${__dirname}/public`));

// Home page route
app.get('/', (request, response) => {
	response.send('Hello World!');
});

// Start the app
app.listen(port, error => {
	if (error) {
		console.error(error.stack);
		process.exit(1);
	}
	console.log(`${pkg.name} started`)
});
