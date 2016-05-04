
Origami Image Service Tests
===========================

A suite of tests for comparing the existing Image Service with third-party providers. Please visit <https://origami-image-service-tests.herokuapp.com/> to view this site.

[![Build status](https://img.shields.io/circleci/project/Financial-Times/origami-image-service-tests.svg)][ci]
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)][license]


Running Locally
---------------

This application requires [Node.js] 6+, and [npm].

  1. Install dependencies: `npm install`
  2. Start the application: `npm start` ([using environment variables as config](#configuration))

(you can also run the application with `nodemon` or similar: `nodemon -e js,html .`)


Configuration
-------------

You can configure the application with environment variables:

  * `CLOUDINARY_ACCOUNT_NAME`: The Cloudinary account name (found via the admin panel)
  * `IMGIX_SECURE_URL_TOKEN`: The imgix secure URL token (found via the admin panel)
  * `IMGIX_SOURCE_NAME`: The imgix secure URL token (found via the admin panel)
  * `PORT`: The port to run the application on _(Defaults to `8080`)_


License
-------

The Financial Times has published this software under the [MIT license][license].



[ci]: https://circleci.com/gh/Financial-Times/origami-image-service-tests
[license]: http://opensource.org/licenses/MIT
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
