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

		it('sets OSWRoot state', function() {
			mainModule.CommandInstanceCreate()

			deepEqual(mainModule.ValueInstance().OSWRootDropboxIsEnabled, true);
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

		it('sets OSWRoot state', function() {
			mainModule.CommandInstanceCreate()

			deepEqual(mainModule.ValueInstance().OSWRootGoogleDriveIsEnabled, true);
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

	context('OSWStorageOptionsDropbox', function () {

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
				detail: 'OSWStorageOptionsDropbox',
			})
			deepEqual(item, true);
		});
	
	});

	context('OSWStorageOptionsGoogleDrive', function () {

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
				detail: 'OSWStorageOptionsGoogleDrive',
			})
			deepEqual(item, true);
		});
	
	});

});

describe('OSWRootDelegateRenew', function testOSWRootDelegateRenew() {

	let item;

	before(function () {
		mainModule.ValueRemoteStorage({
			reconnect () {
				item = true
			},
		});
	});

	it('calls remotestorage', function() {
		mainModule.OSWRootDelegateRenew()
		deepEqual(item, true);
	});

});

describe('OSWConnectedDelegateSyncStart', function testOSWConnectedDelegateSyncStart() {

	let item = {};

	before(function () {
		mainModule.ValueInstance(item);

		mainModule.ValueRemoteStorage({
			startSync () {
				item.alfa = true
			},
		});
		
		mainModule.OSWConnectedDelegateSyncStart()
	});

	it('calls remotestorage', function() {
		deepEqual(item.alfa, true);
	});

	it('sets OSWRoot state', function() {
		deepEqual(item.OSWRootSyncing, true);
	});

});

describe('OSWConnectedDelegateSyncStop', function testOSWConnectedDelegateSyncStop() {

	let item;

	before(function () {
		mainModule.ValueRemoteStorage({
			stopSync () {
				item = true
			},
		});
	});

	it('calls remotestorage', function() {
		mainModule.OSWConnectedDelegateSyncStop()
		deepEqual(item, true);
	});

});

describe('OSWConnectedDelegateDisconnect', function testOSWConnectedDelegateDisconnect() {

	let item;

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

	let item = {};

	before(function () {
		mainModule.ValueInstance(item);
	});

	it('sets OSWRoot state', function() {
		mainModule.RemoteStorageError({
			name: 'alfa',
			message: 'bravo',
		});

		deepEqual(item, {
			OSWRootRemoteStorageError: 'alfa: bravo',
		});
	});

});

describe('RemoteStorageConnected', function testRemoteStorageConnected() {

	let item = {};

	before(function () {
		mainModule.ValueInstance(item);
	});

	it('sets OSWRoot state', function() {
		mainModule.RemoteStorageConnected();

		deepEqual(item, {
			OSWRootRemoteStorageConnected: true,
		});
	});

});

describe('RemoteStorageDisconnected', function testRemoteStorageDisconnected() {

	let item = {};

	before(function () {
		mainModule.ValueInstance(item);
	});

	it('sets OSWRoot state', function() {
		mainModule.RemoteStorageDisconnected();

		deepEqual(item, {
			OSWRootRemoteStorageConnected: false,
			OSWRootRemoteStorageError: '',
		});
	});

});

describe('RemoteStorageSyncReqDone', function testRemoteStorageSyncReqDone() {

	let item = {};

	before(function () {
		mainModule.ValueInstance(item);
	});

	it('sets OSWRoot state', function() {
		mainModule.RemoteStorageSyncReqDone();

		deepEqual(item, {
			OSWRootSyncing: true,
		});
	});

});

describe('RemoteStorageSyncDone', function testRemoteStorageSyncDone() {

	let item = {};

	before(function () {
		mainModule.ValueInstance(item);
	});

	it('sets OSWRoot state', function() {
		mainModule.RemoteStorageSyncDone();

		deepEqual(item, {
			OSWRootSyncing: false,
		});
	});

});

describe('RemoteStorageNetworkOffline', function testRemoteStorageNetworkOffline() {

	let item = {};

	before(function () {
		mainModule.ValueInstance(item);
	});

	it('sets OSWRoot state', function() {
		mainModule.RemoteStorageNetworkOffline();

		deepEqual(item, {
			OSWRootRemoteStorageNetworkOffline: true,
		});
	});

});
