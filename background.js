chrome.runtime.onInstalled.addListener(() => {
	console.log('Web Panel Extension installed');
});

const _wp_injectableUrl = (url) => {
	if (!url) return false;
	if (url.startsWith('chrome://')) return false;
	if (url.startsWith('chrome-extension://')) return false;
	if (url.startsWith('kiwi://')) return false;
	if (url.startsWith('devtools://')) return false;
	if (url.startsWith('about:')) return false;
	if (url.startsWith('edge://')) return false;
	return true;
};

async function _wp_injectAndToggle(tabId) {
	try {
		await chrome.scripting.executeScript({
			target: { tabId },
			files: ['injector.js'],
			world: 'MAIN',
			injectImmediately: true
		});
	} catch (_) {}

	try {
		await chrome.scripting.executeScript({
			target: { tabId },
			files: ['adblocker.js'],
			world: 'MAIN',
			injectImmediately: true
		});
	} catch (_) {}

	try {
		await chrome.scripting.executeScript({
			target: { tabId },
			files: ['content.js'],
			injectImmediately: true
		});
	} catch (_) {}

	await new Promise(r => setTimeout(r, 150));

	try {
		await chrome.tabs.sendMessage(tabId, { action: 'togglePanel' });
	} catch (_) {}
}

chrome.action.onClicked.addListener(async (tab) => {
	if (!_wp_injectableUrl(tab.url)) return;

	try {
		await chrome.tabs.sendMessage(tab.id, { action: 'togglePanel' });
	} catch (_) {
		await _wp_injectAndToggle(tab.id);
	}
});

const _wp_dataKeyMap = {
	cache: 'cache',
	cookies: 'cookies',
	history: 'history',
	localStorage: 'localStorage',
	indexedDB: 'indexedDB',
	serviceWorkers: 'serviceWorkers',
	cacheStorage: 'cacheStorage',
	fileSystems: 'fileSystems',
	formData: 'formData',
	passwords: 'passwords',
	downloads: 'downloads',
	pluginData: 'pluginData',
	serverBoundCertificates: 'serverBoundCertificates',
	webSQL: 'webSQL',
	appcache: 'appcache'
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'getCookies') {
		chrome.cookies.getAll({ url: request.url }, (cookies) => {
			sendResponse({ cookies: cookies || [] });
		});
		return true;
	}

	if (request.action === 'clearBrowsingData') {
		const raw = request.dataToRemove || {};
		const dataToRemove = {};
		Object.keys(raw).forEach(k => {
			if (_wp_dataKeyMap[k] && raw[k]) dataToRemove[_wp_dataKeyMap[k]] = true;
		});
		if (!Object.keys(dataToRemove).length) {
			sendResponse({ error: 'No valid data types selected' });
			return true;
		}
		chrome.browsingData.remove({ since: 0 }, dataToRemove, () => {
			if (chrome.runtime.lastError) sendResponse({ error: chrome.runtime.lastError.message });
			else sendResponse({ ok: true });
		});
		return true;
	}
});
