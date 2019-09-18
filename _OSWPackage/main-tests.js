import { throws, deepEqual } from 'assert';

import mainModule from './main.js';

const kTesting = {
	StubAppClass: function() {
		return function Alfa (type) {
			this.$destroy = function () {};
		};
	},
};

describe('CommandInstanceCreate', function testCommandInstanceCreate() {

	beforeEach(function () {
		mainModule.ValueClass(kTesting.StubAppClass());

		deepEqual(mainModule.ValueInstance(), undefined);
	});

	afterEach(function () {
		mainModule.CommandInstanceDestroy();
	});

	it('sets ValueInstance', function() {
		mainModule.CommandInstanceCreate();
		deepEqual(typeof mainModule.ValueInstance(), 'object');
	});

	context('APIDropbox', function () {
		
		before(function () {
			mainModule.ValueRemoteStorage({
				apiKeys: {
					dropbox: 'alfa',
				},
			});
		});

		it('sets OSWContainer state', function() {
			mainModule.CommandInstanceCreate()

			deepEqual(mainModule.ValueInstance().OSWContainerDropboxIsEnabled, true);
		});

	});

	context('APIGoogleDrive', function () {
		
		before(function () {
			mainModule.ValueRemoteStorage({
				apiKeys: {
					googledrive: 'alfa',
				},
			});
		});

		it('sets OSWContainer state', function() {
			mainModule.CommandInstanceCreate()

			deepEqual(mainModule.ValueInstance().OSWContainerGoogleDriveIsEnabled, true);
		});

	});

});

describe('CommandInstanceDestroy', function testCommandInstanceDestroy() {

	before(function () {
		mainModule.ValueClass(kTesting.StubAppClass());

		mainModule.CommandInstanceCreate();
	});

	it('sets ValueInstance', function() {
		mainModule.CommandInstanceDestroy();
		deepEqual(mainModule.ValueInstance(), null);
	});

});

describe('OSWStorageOptionsDelegateConnect', function testOSWStorageOptionsDelegateConnect() {

	let item;

	before(function () {
		mainModule.ValueRemoteStorage({
			connect (inputData) {
				item = inputData
			},
		});
	});

	it('calls remotestorage', function() {
		mainModule.OSWStorageOptionsDelegateConnect({
			detail: 'alfa',
		})
		deepEqual(item, 'alfa');
	});

	context('StorageOptionDropbox', function () {

		before(function () {
			mainModule.ValueRemoteStorage({
				dropbox: {
					connect () {
						item = true
					},
				},
			});
		});

		it('calls remotestorage', function() {
			mainModule.OSWStorageOptionsDelegateConnect({
				detail: 'StorageOptionDropbox',
			})
			deepEqual(item, true);
		});
	
	});

	context('StorageOptionGoogleDrive', function () {

		before(function () {
			mainModule.ValueRemoteStorage({
				googledrive: {
					connect () {
						item = true
					},
				},
			});
		});

		it('calls remotestorage', function() {
			mainModule.OSWStorageOptionsDelegateConnect({
				detail: 'StorageOptionGoogleDrive',
			})
			deepEqual(item, true);
		});
	
	});

});

describe('OSWContainerDelegateRenew', function testOSWContainerDelegateRenew() {

	let item = false;

	before(function () {
		mainModule.ValueRemoteStorage({
			reconnect () {
				item = true
			},
		});
	});

	it('calls remotestorage', function() {
		mainModule.OSWContainerDelegateRenew()
		deepEqual(item, true);
	});

});

describe('OSWConnectedDelegateSyncStart', function testOSWConnectedDelegateSyncStart() {

	let item = false;

	before(function () {
		mainModule.ValueRemoteStorage({
			startSync () {
				item = true
			},
		});
	});

	it('calls remotestorage', function() {
		mainModule.OSWConnectedDelegateSyncStart()
		deepEqual(item, true);
	});

});

describe('OSWConnectedDelegateDisconnect', function testOSWConnectedDelegateDisconnect() {

	let item = false;

	before(function () {
		mainModule.ValueRemoteStorage({
			disconnect () {
				item = true
			},
		});
	});

	it('calls remotestorage', function() {
		mainModule.OSWConnectedDelegateDisconnect()
		deepEqual(item, true);
	});

});

describe('RemoteStorageError', function testRemoteStorageError() {

	let item = {
		OSWContainerRemoteStorageError: '',
	};

	before(function () {
		mainModule.ValueInstance(item);
	});

	it('sets OSWContainer state', function() {
		mainModule.RemoteStorageError({
			name: 'alfa',
			message: 'bravo',
		});

		deepEqual(item, {
			OSWContainerRemoteStorageError: 'alfa: bravo',
		});
	});

});

describe('RemoteStorageConnected', function testRemoteStorageConnected() {

	let item = {
		OSWContainerRemoteStorageConnected: false,
	};

	before(function () {
		mainModule.ValueInstance(item);
	});

	it('sets OSWContainer state', function() {
		mainModule.RemoteStorageConnected();

		deepEqual(item, {
			OSWContainerRemoteStorageConnected: true,
		});
	});

});

describe('RemoteStorageDisconnected', function testRemoteStorageDisconnected() {

	let item = {
		OSWContainerRemoteStorageConnected: true,
		OSWContainerRemoteStorageError: 'alfa',
	};

	before(function () {
		mainModule.ValueInstance(item);
	});

	it('sets OSWContainer state', function() {
		mainModule.RemoteStorageDisconnected();

		deepEqual(item, {
			OSWContainerRemoteStorageConnected: false,
			OSWContainerRemoteStorageError: '',
		});
	});

});
