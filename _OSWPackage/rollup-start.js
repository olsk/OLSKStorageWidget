import mod from './main.js';

import Main from '../_OSWRoot/__compiled/ui-behaviour.js';
mod.ValueClass(Main);

import OSWIconRemoteStorage from '../_shared/icons/OSWOptionRemoteStorage.svelte';
mod.ValueBackendIconMap({
	remotestorage: OSWIconRemoteStorage,
})

const Widget = function (inputData) {
	mod.ValueRemoteStorage(inputData);

	this.attach = function (inputData) {
		mod.ValueContainer(typeof inputData === 'string' ? document.getElementById(inputData) : inputData);
		mod.ControlInstanceCreate();

		return this
	};

	this.backend = function (target) {
		let iconInstance;

		mod.ValueBackendDelegate(function (inputData) {
			if (!inputData) {
				iconInstance.$destroy();
				iconInstance = null;

				return target.classList.remove('OSWIconVisible');
			};

			iconInstance = new inputData({
				target,
			})

			target.classList.add('OSWIconVisible')
		})

		return this;
	}
}

export default Widget;
