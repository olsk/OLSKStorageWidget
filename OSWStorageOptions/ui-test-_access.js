const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OSWStorageOptions: '.OSWStorageOptions',

	OSWStorageOptionsHeading: '.OSWStorageOptionsHeading',

	OSWStorageOptionsDescription: '.OSWStorageOptionsDescription',
	OSWStorageOptionsAnchor: '.OSWStorageOptionsAnchor',

	OSWStorageOptionsButtonRemoteStorage: '.OSWStorageOptionsButtonRemoteStorage',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('OSWStorageOptions_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows OSWStorageOptions', function() {
		browser.assert.elements(OSWStorageOptions, 1);
	});
	
	it('shows OSWStorageOptionsHeading', function() {
		browser.assert.elements(OSWStorageOptionsHeading, 1);
	});
	
	it('shows OSWStorageOptionsDescription', function() {
		browser.assert.elements(OSWStorageOptionsDescription, 1);
	});
	
	it('shows OSWStorageOptionsAnchor', function() {
		browser.assert.elements(OSWStorageOptionsAnchor, 1);
	});
	
	it('shows OSWStorageOptionsButtonRemoteStorage', function() {
		browser.assert.elements(OSWStorageOptionsButtonRemoteStorage, 1);
	});
	
	it('hides OSWOptionRemoteStorage', function() {
		browser.assert.elements(OSWOptionRemoteStorage, 0);
	});

	const uHideOptions = function () {
		
		it('hides OSWStorageOptionsDescription', function() {
			browser.assert.elements(OSWStorageOptionsDescription, 0);
		});
		
		it('hides OSWStorageOptionsAnchor', function() {
			browser.assert.elements(OSWStorageOptionsAnchor, 0);
		});
		
		it('hides OSWStorageOptionsButtonRemoteStorage', function() {
			browser.assert.elements(OSWStorageOptionsButtonRemoteStorage, 0);
		});
		
		it('shows OSWOptionRemoteStorage', function() {
			browser.assert.elements(OSWOptionRemoteStorage, 1);
		});

	};

	context('ClickOSWStorageOptionsButtonRemoteStorage', function test_ClickOSWStorageOptionsButtonRemoteStorage () {

		before(function () {
			return browser.pressButton(OSWStorageOptionsButtonRemoteStorage);;
		});
	
		uHideOptions()

	});

});
