import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`OSWStorageOptionsLocalize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(`${ languageCode }${ kDefaultRoute.OLSKRoutePath }`);
	});

	it('localizes OSWStorageOptionsHeading', function () {
		browser.assert.text(OSWStorageOptionsHeading, uLocalized('OSWStorageOptionsHeadingText'))
	});

	it('localizes OSWStorageOptionsDescription', function () {
		browser.assert.text(OSWStorageOptionsDescription, uLocalized('OSWStorageOptionsDescriptionText'))
	});

	it('localizes OSWStorageOptionsAnchor', function () {
		browser.assert.text(OSWStorageOptionsAnchor, uLocalized('OSWStorageOptionsAnchorText'))
	});

	it('localizes OSWStorageOptionsButtonRemoteStorage', function () {
		browser.assert.text(OSWStorageOptionsButtonRemoteStorage, uLocalized('OSWStorageOptionsButtonRemoteStorageText'))
	});

	it('localizes OSWStorageOptionsButtonDropbox', function () {
		browser.assert.text(OSWStorageOptionsButtonDropbox, uLocalized('OSWStorageOptionsButtonDropboxText'))
	});

	it('localizes OSWStorageOptionsButtonGoogleDrive', function () {
		browser.assert.text(OSWStorageOptionsButtonGoogleDrive, uLocalized('OSWStorageOptionsButtonGoogleDriveText'))
	});

});

});