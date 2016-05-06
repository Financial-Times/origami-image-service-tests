'use strict';

const config = require('./config');
const express = require('express');
const consolidate = require('consolidate');
const pkg = require('./package.json');

const app = express();

// Configure the Express app
app.disable('x-powered-by');
app.use(express.static(`${__dirname}/public`));

// Configure the views
app.engine('html', consolidate.hogan);
app.set('view engine', 'html');
app.set('views', `${__dirname}/view`);
app.set('partials', `${__dirname}/view/partial`);
app.locals.images = config.images;
app.locals.pkg = pkg;

// Home page route
app.get('/', (request, response) => {
	response.render('index');
});

// Start the app
app.listen(config.port, error => {
	if (error) {
		console.error(error.stack);
		process.exit(1);
	}
	console.log(`${pkg.name} started`);
});
