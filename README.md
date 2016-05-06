
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


Downloading
-----------

If you need to do some file comparisons locally, e.g. visual diffing of images, you can use the download script. This requires the `curl` command to be present on your machine.

Execute `./script/download-images.js`, this requires the same [configuration](#configuration) as running the application.

This creates a `download` folder locally which will contain all of the downloaded images.


Configuration
-------------

You can configure the application with environment variables:

  * `CLOUDINARY_ACCOUNT_NAME`: The Cloudinary account name (found via the admin panel)
  * `IMGIX_SECURE_URL_TOKEN`: The imgix secure URL token (found via the admin panel)
  * `IMGIX_SOURCE_NAME`: The imgix secure URL token (found via the admin panel)
  * `PORT`: The port to run the application on _(Defaults to `8080`)_

Example:

```sh
CLOUDINARY_ACCOUNT_NAME=xxx IMGIX_SECURE_URL_TOKEN=xxx IMGIX_SOURCE_NAME=xxx npm start
```

or

```sh
CLOUDINARY_ACCOUNT_NAME=xxx IMGIX_SECURE_URL_TOKEN=xxx IMGIX_SOURCE_NAME=xxx ./script/download-images.js
```

If you're a member of the Origami team, there's a secure note in our shared LastPass folder named "Origami Image Service Tests config vars" which has the run command pre-filled with our details.


Deployment
----------

Commits/merges on master are automatically deployed to Heroku via CircleCI if the tests pass. You shouldn't need to deploy manually.


License
-------

The Financial Times has published this software under the [MIT license][license].



[ci]: https://circleci.com/gh/Financial-Times/origami-image-service-tests
[license]: http://opensource.org/licenses/MIT
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
