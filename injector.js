(function() {
	const _wp_noop = () => {};

	const _wp_def = (obj, prop, value) => {
		try {
			Object.defineProperty(obj, prop, {
				get: typeof value === 'function' ? value : () => value,
				configurable: true,
				enumerable: true
			});
		} catch (_) {}
	};

	_wp_def(navigator, 'webdriver', false);
	try { delete navigator.__proto__.webdriver; } catch (_) {}

	const _wp_cdcKeys = [
		'cdc_adoQpoasnfa76pfcZLmcfl_',
		'cdc_adoQpoasnfa76pfcZLmcfl_Array',
		'cdc_adoQpoasnfa76pfcZLmcfl_Promise',
		'cdc_adoQpoasnfa76pfcZLmcfl_Symbol',
		'cdc_adoQpoasnfa76pfcZLmcfl_JSON',
		'$chrome_asyncScriptInfo',
		'$cdc_asdjflasutopfhvcZLmcfl_'
	];
	_wp_cdcKeys.forEach(k => {
		try { delete window[k]; } catch (_) {}
		try { _wp_def(window, k, undefined); } catch (_) {}
	});

	const _wp_mimeTypes = [
		{ type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format' },
		{ type: 'application/x-google-chrome-pdf', suffixes: 'pdf', description: 'Portable Document Format' },
		{ type: 'application/x-nacl', suffixes: '', description: 'Native Client Executable' },
		{ type: 'application/x-pnacl', suffixes: '', description: 'Portable Native Client Executable' },
	];
	const _wp_pluginsDef = [
		{ name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format', mimes: [0, 1] },
		{ name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '', mimes: [0] },
		{ name: 'Native Client', filename: 'internal-nacl-plugin', description: '', mimes: [2, 3] },
	];
	const _wp_fakePlugins = _wp_pluginsDef.map(p => {
		const plugin = Object.create(Plugin.prototype);
		_wp_def(plugin, 'name', p.name);
		_wp_def(plugin, 'filename', p.filename);
		_wp_def(plugin, 'description', p.description);
		_wp_def(plugin, 'length', p.mimes.length);
		p.mimes.forEach((mi, i) => {
			const m = _wp_mimeTypes[mi];
			const mime = Object.create(MimeType.prototype);
			_wp_def(mime, 'type', m.type);
			_wp_def(mime, 'suffixes', m.suffixes);
			_wp_def(mime, 'description', m.description);
			_wp_def(mime, 'enabledPlugin', plugin);
			_wp_def(plugin, i, mime);
			_wp_def(plugin, m.type, mime);
		});
		return plugin;
	});
	const _wp_pluginArray = Object.create(PluginArray.prototype);
	_wp_pluginsDef.forEach((_, i) => _wp_def(_wp_pluginArray, i, _wp_fakePlugins[i]));
	_wp_def(_wp_pluginArray, 'length', _wp_fakePlugins.length);
	_wp_pluginArray.item = i => _wp_fakePlugins[i] || null;
	_wp_pluginArray.namedItem = name => _wp_fakePlugins.find(p => p.name === name) || null;
	_wp_pluginArray.refresh = _wp_noop;
	_wp_pluginArray.toString = () => '[object PluginArray]';
	_wp_pluginArray[Symbol.toStringTag] = 'PluginArray';
	_wp_def(navigator, 'plugins', _wp_pluginArray);

	const _wp_mimeTypeArray = Object.create(MimeTypeArray.prototype);
	_wp_mimeTypes.forEach((m, i) => {
		const mime = Object.create(MimeType.prototype);
		_wp_def(mime, 'type', m.type);
		_wp_def(mime, 'suffixes', m.suffixes);
		_wp_def(mime, 'description', m.description);
		_wp_def(_wp_mimeTypeArray, i, mime);
		_wp_def(_wp_mimeTypeArray, m.type, mime);
	});
	_wp_def(_wp_mimeTypeArray, 'length', _wp_mimeTypes.length);
	_wp_mimeTypeArray.toString = () => '[object MimeTypeArray]';
	_wp_mimeTypeArray[Symbol.toStringTag] = 'MimeTypeArray';
	_wp_def(navigator, 'mimeTypes', _wp_mimeTypeArray);

	_wp_def(navigator, 'languages', ['en-US', 'en']);
	_wp_def(navigator, 'language', 'en-US');
	_wp_def(navigator, 'hardwareConcurrency', 8);
	try { _wp_def(navigator, 'deviceMemory', 8); } catch (_) {}

	try {
		if (navigator.getBattery) {
			navigator.getBattery = () => Promise.resolve({
				charging: true,
				chargingTime: 0,
				dischargingTime: Infinity,
				level: 1,
				addEventListener: _wp_noop,
				removeEventListener: _wp_noop,
				dispatchEvent: () => true
			});
		}
	} catch (_) {}

	try {
		if (navigator.connection) {
			_wp_def(navigator.connection, 'rtt', 100);
			_wp_def(navigator.connection, 'downlink', 10);
			_wp_def(navigator.connection, 'effectiveType', '4g');
			_wp_def(navigator.connection, 'saveData', false);
		}
	} catch (_) {}

	if (!window.chrome) Object.defineProperty(window, 'chrome', { value: {}, configurable: true, writable: true });
	window.chrome.runtime = Object.assign(window.chrome.runtime || {}, {
		id: undefined,
		connect: _wp_noop,
		sendMessage: _wp_noop,
		onMessage: { addListener: _wp_noop, removeListener: _wp_noop, hasListener: () => false },
		onConnect: { addListener: _wp_noop, removeListener: _wp_noop, hasListener: () => false },
		onInstalled: { addListener: _wp_noop },
		OnInstalledReason: { CHROME_UPDATE: 'chrome_update', INSTALL: 'install', SHARED_MODULE_UPDATE: 'shared_module_update', UPDATE: 'update' },
		OnRestartRequiredReason: { APP_UPDATE: 'app_update', OS_UPDATE: 'os_update', PERIODIC: 'periodic' },
		PlatformArch: { ARM: 'arm', ARM64: 'arm64', MIPS: 'mips', MIPS64: 'mips64', X86_32: 'x86-32', X86_64: 'x86-64' },
		PlatformNaclArch: { ARM: 'arm', MIPS: 'mips', MIPS64: 'mips64', MIPS64EL: 'mips64el', MIPSEL: 'mipsel', X86_32: 'x86-32', X86_64: 'x86-64' },
		PlatformOs: { ANDROID: 'android', CROS: 'cros', LINUX: 'linux', MAC: 'mac', OPENBSD: 'openbsd', WIN: 'win' },
		RequestUpdateCheckStatus: { NO_UPDATE: 'no_update', THROTTLED: 'throttled', UPDATE_AVAILABLE: 'update_available' }
	});
	if (!window.chrome.app) {
		window.chrome.app = {
			isInstalled: false,
			InstallState: { DISABLED: 'disabled', INSTALLED: 'installed', NOT_INSTALLED: 'not_installed' },
			RunningState: { CANNOT_RUN: 'cannot_run', READY_TO_RUN: 'ready_to_run', RUNNING: 'running' },
			getDetails: _wp_noop,
			getIsInstalled: _wp_noop,
			installState: _wp_noop
		};
	}
	if (!window.chrome.csi) window.chrome.csi = () => ({ startE: Date.now(), onloadT: Date.now(), pageT: Date.now(), tran: 15 });
	if (!window.chrome.loadTimes) window.chrome.loadTimes = () => ({
		requestTime: Date.now() / 1000,
		startLoadTime: Date.now() / 1000,
		commitLoadTime: Date.now() / 1000,
		finishDocumentLoadTime: Date.now() / 1000,
		finishLoadTime: Date.now() / 1000,
		firstPaintTime: Date.now() / 1000,
		firstPaintAfterLoadTime: 0,
		navigationType: 'Other',
		wasFetchedViaSpdy: true,
		wasNpnNegotiated: true,
		npnNegotiatedProtocol: 'h2',
		wasAlternateProtocolAvailable: false,
		connectionInfo: 'h2'
	});

	const _wp_origPermQuery = window.Permissions && window.Permissions.prototype.query;
	if (_wp_origPermQuery) {
		window.Permissions.prototype.query = function(params) {
			const _prompt = ['geolocation', 'notifications', 'push', 'midi', 'camera', 'microphone', 'speaker', 'device-info', 'background-fetch', 'background-sync', 'bluetooth', 'persistent-storage', 'ambient-light-sensor', 'accelerometer', 'gyroscope', 'magnetometer', 'clipboard-read', 'clipboard-write', 'payment-handler', 'idle-detection', 'periodic-background-sync', 'screen-wake-lock', 'nfc', 'display-capture', 'storage-access'];
			if (_prompt.includes(params.name)) return Promise.resolve({ state: 'prompt', onchange: null });
			return _wp_origPermQuery.call(this, params);
		};
	}

	try {
		if (typeof Notification !== 'undefined') {
			Object.defineProperty(Notification, 'permission', { get: () => 'default', configurable: true });
		}
	} catch (_) {}

	const _wp_patchWindow = (win) => {
		try {
			if (!win || win.__wpPatched) return;
			win.__wpPatched = true;
			const navDef = (prop, val) => {
				try {
					Object.defineProperty(win.navigator, prop, { get: typeof val === 'function' ? val : () => val, configurable: true });
				} catch (_) {}
			};
			navDef('webdriver', false);
			navDef('languages', ['en-US', 'en']);
			navDef('language', 'en-US');
			navDef('hardwareConcurrency', 8);
			try { delete win.navigator.__proto__.webdriver; } catch (_) {}
			_wp_cdcKeys.forEach(k => { try { delete win[k]; } catch (_) {} });
		} catch (_) {}
	};

	const _wp_origContentWindow = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow');
	if (_wp_origContentWindow) {
		Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
			get: function() {
				const win = _wp_origContentWindow.get.call(this);
				try { _wp_patchWindow(win); } catch (_) {}
				return win;
			},
			configurable: true,
			enumerable: true
		});
	}

	const _wp_patchAllIframes = (root) => {
		try {
			(root || document).querySelectorAll('iframe').forEach(f => {
				try {
					const w = f.contentWindow;
					if (w) _wp_patchWindow(w);
				} catch (_) {}
			});
		} catch (_) {}
	};
	new MutationObserver(() => _wp_patchAllIframes()).observe(document.documentElement, { childList: true, subtree: true });

	const _wp_glPatch = (ctx) => {
		const orig = ctx.prototype.getParameter;
		ctx.prototype.getParameter = function(param) {
			if (param === 37445) return 'Intel Inc.';
			if (param === 37446) return 'Intel Iris OpenGL Engine';
			return orig.call(this, param);
		};
	};
	try { _wp_glPatch(WebGLRenderingContext); } catch (_) {}
	try { _wp_glPatch(WebGL2RenderingContext); } catch (_) {}

	const _wp_origToDataURL = HTMLCanvasElement.prototype.toDataURL;
	HTMLCanvasElement.prototype.toDataURL = function(type, quality) {
		const ctx = this.getContext('2d');
		if (ctx) {
			try {
				const imgData = ctx.getImageData(0, 0, this.width || 1, this.height || 1);
				for (let i = 0; i < imgData.data.length; i += 400) imgData.data[i] ^= 1;
				ctx.putImageData(imgData, 0, 0);
			} catch (_) {}
		}
		return _wp_origToDataURL.call(this, type, quality);
	};
	const _wp_origGetImageData = CanvasRenderingContext2D.prototype.getImageData;
	CanvasRenderingContext2D.prototype.getImageData = function(x, y, w, h) {
		const data = _wp_origGetImageData.call(this, x, y, w, h);
		for (let i = 0; i < data.data.length; i += 400) data.data[i] ^= 1;
		return data;
	};

	try {
		const _wp_origGetChannelData = AudioBuffer.prototype.getChannelData;
		AudioBuffer.prototype.getChannelData = function() {
			const arr = _wp_origGetChannelData.apply(this, arguments);
			for (let i = 0; i < arr.length; i += 500) arr[i] += Math.random() * 0.0000001;
			return arr;
		};
		const _wp_origCopyFrom = AudioBuffer.prototype.copyFromChannel;
		if (_wp_origCopyFrom) {
			AudioBuffer.prototype.copyFromChannel = function(dest) {
				_wp_origCopyFrom.apply(this, arguments);
				for (let i = 0; i < dest.length; i += 500) dest[i] += Math.random() * 0.0000001;
			};
		}
	} catch (_) {}

	try { _wp_def(window, 'outerWidth', () => window.innerWidth); } catch (_) {}
	try { _wp_def(window, 'outerHeight', () => window.innerHeight + 85); } catch (_) {}
	try { _wp_def(screen, 'availWidth', () => window.screen.width); } catch (_) {}
	try { _wp_def(screen, 'availHeight', () => window.screen.height - 40); } catch (_) {}

	try {
		if (window.performance && performance.memory) {
			Object.defineProperty(performance, 'memory', {
				get: () => ({
					jsHeapSizeLimit: 2190000000,
					totalJSHeapSize: 50000000,
					usedJSHeapSize: 24100000
				}),
				configurable: true
			});
		}
	} catch (_) {}

	const _wp_origFnToString = Function.prototype.toString;
	const _wp_patchedFns = new WeakSet();
	Function.prototype.toString = function() {
		if (_wp_patchedFns.has(this)) return `function ${this.name || ''}() { [native code] }`;
		return _wp_origFnToString.call(this);
	};
	[
		WebGLRenderingContext.prototype.getParameter,
		HTMLCanvasElement.prototype.toDataURL,
		CanvasRenderingContext2D.prototype.getImageData,
		navigator.getBattery,
		window.Permissions && window.Permissions.prototype.query
	].forEach(fn => { try { if (fn) _wp_patchedFns.add(fn); } catch (_) {} });

	const _wp_origHasOwn = Object.prototype.hasOwnProperty;
	const _wp_hiddenProps = new Set([
		'__wpScript', '__wpNet', '__wpOrigFetch', 'webPanelInitialized', '__stealthFetch',
		'__wpInterceptorActive', '__wpScriptObserverActive', '__cfInterceptorActive',
		'__cfInterceptorData', '__cfInterceptorClear', '__cfInterceptorStatus',
		'__wpPatched', '__wpInterceptorActive'
	]);
	const _wp_origGetOwnPropDesc = Object.getOwnPropertyDescriptor;
	Object.getOwnPropertyDescriptor = function(obj, prop) {
		if (obj === window && _wp_hiddenProps.has(prop)) return undefined;
		return _wp_origGetOwnPropDesc.call(this, obj, prop);
	};
	Object.prototype.hasOwnProperty = function(prop) {
		if (this === window && _wp_hiddenProps.has(prop)) return false;
		return _wp_origHasOwn.call(this, prop);
	};

	try {
		const _wp_origWorker = window.Worker;
		const _wp_workerPatch = `
(function(){
	var _def=function(o,p,v){try{Object.defineProperty(o,p,{get:typeof v==='function'?v:function(){return v;},configurable:true});}catch(e){}};
	if(typeof navigator!=='undefined'){
		_def(navigator,'webdriver',false);
		_def(navigator,'languages',['en-US','en']);
		_def(navigator,'language','en-US');
		_def(navigator,'hardwareConcurrency',8);
	}
	['cdc_adoQpoasnfa76pfcZLmcfl_','cdc_adoQpoasnfa76pfcZLmcfl_Array','cdc_adoQpoasnfa76pfcZLmcfl_Promise','cdc_adoQpoasnfa76pfcZLmcfl_Symbol'].forEach(function(k){try{delete self[k];}catch(e){}});
})();
`;
		window.Worker = function(url, opts) {
			if (typeof url === 'string') {
				try {
					const blob = new Blob([_wp_workerPatch + '\n'], { type: 'application/javascript' });
					const patchUrl = URL.createObjectURL(blob);
					const importScript = `importScripts(${JSON.stringify(patchUrl)});importScripts(${JSON.stringify(url)});`;
					const wrapped = new Blob([importScript], { type: 'application/javascript' });
					return new _wp_origWorker(URL.createObjectURL(wrapped), opts);
				} catch (_) {
					return new _wp_origWorker(url, opts);
				}
			}
			return new _wp_origWorker(url, opts);
		};
		window.Worker.prototype = _wp_origWorker.prototype;
	} catch (_) {}
})();

(function() {
	if (window.__wpInterceptorActive) return;
	window.__wpInterceptorActive = true;

	function postLog(entry) {
		window.postMessage({ __wpNet: entry }, "*");
	}

	const _fetch = window.fetch;
	window.fetch = async function(...args) {
		const input = args[0];
		const init = args[1] || {};
		let url;
		if (typeof input === "string") url = input;
		else if (input instanceof Request) url = input.url;
		else if (input instanceof URL) url = input.href;
		else url = String(input);
		if (url && !url.startsWith("http") && !url.startsWith("//"))
			url = new URL(url, location.href).href;
		const method = init?.method || (input instanceof Request ? input.method : "GET");
		const headers = {};
		if (init?.headers) {
			if (init.headers instanceof Headers) init.headers.forEach((v, k) => headers[k] = v);
			else if (typeof init.headers === "object") Object.assign(headers, init.headers);
		}
		if (input instanceof Request && input.headers)
			input.headers.forEach((v, k) => { if (!headers[k]) headers[k] = v; });
		const body = init?.body || (input instanceof Request ? input.body : null);
		const params = {};
		try { const u = new URL(url, location.href); u.searchParams.forEach((v, k) => params[k] = v); } catch (_) {}
		const entry = { url: url || "unknown", method: method || "GET", headers, body: typeof body === "string" ? body : null, type: "fetch", timestamp: Date.now(), params };
		try {
			const response = await _fetch.apply(this, args);
			const cloned = response.clone();
			entry.responseStatus = response.status;
			entry.responseStatusText = response.statusText;
			entry.responseHeaders = {};
			response.headers.forEach((v, k) => entry.responseHeaders[k] = v);
			entry.responseContentType = response.headers.get("content-type");
			entry.responseTimestamp = Date.now();
			try {
				const ct = response.headers.get("content-type") || "";
				if (ct.includes("application/json")) entry.responseBody = await cloned.json();
				else if (ct.includes("text/")) entry.responseBody = await cloned.text();
				else { const blob = await cloned.blob(); entry.responseBody = "[Binary: " + blob.size + " bytes]"; }
			} catch (e) { entry.responseBody = "[Failed to read: " + e.message + "]"; }
			postLog(entry);
			return response;
		} catch (error) {
			entry.responseStatus = 0;
			entry.responseStatusText = "Error: " + error.message;
			entry.responseTimestamp = Date.now();
			postLog(entry);
			throw error;
		}
	};

	const _open = XMLHttpRequest.prototype.open;
	const _send = XMLHttpRequest.prototype.send;
	const _setHeader = XMLHttpRequest.prototype.setRequestHeader;

	XMLHttpRequest.prototype.open = function(method, url) {
		this._wpLog = { method, url: url?.toString() || "unknown", headers: {}, body: null, type: "xhr", timestamp: Date.now(), params: {} };
		try { const u = new URL(this._wpLog.url, location.href); u.searchParams.forEach((v, k) => this._wpLog.params[k] = v); } catch (_) {}
		return _open.apply(this, arguments);
	};

	XMLHttpRequest.prototype.setRequestHeader = function(k, v) {
		if (this._wpLog) this._wpLog.headers[k] = v;
		return _setHeader.apply(this, arguments);
	};

	XMLHttpRequest.prototype.send = function(body) {
		if (this._wpLog) {
			this._wpLog.body = body || null;
			const self = this;
			const origChange = this.onreadystatechange;
			this.onreadystatechange = function() {
				if (self.readyState === 4 && self._wpLog && !self._wpLog._sent) {
					self._wpLog._sent = true;
					self._wpLog.responseStatus = self.status;
					self._wpLog.responseStatusText = self.statusText;
					self._wpLog.responseHeaders = {};
					self._wpLog.responseTimestamp = Date.now();
					const hStr = self.getAllResponseHeaders();
					if (hStr) hStr.split("\r\n").forEach(line => {
						const idx = line.indexOf(": ");
						if (idx > -1) self._wpLog.responseHeaders[line.slice(0, idx)] = line.slice(idx + 2);
					});
					try {
						if (self.responseType === '' || self.responseType === 'text') self._wpLog.responseBody = self.responseText;
						else if (self.responseType === 'json') self._wpLog.responseBody = self.response;
						else self._wpLog.responseBody = "[Binary: " + (self.response ? self.response.byteLength : 0) + " bytes]";
					} catch (e) { self._wpLog.responseBody = "[Failed: " + e.message + "]"; }
					postLog(self._wpLog);
				}
				if (origChange) origChange.apply(this, arguments);
			};
		}
		return _send.apply(this, arguments);
	};
})();

(function() {
	if (window.__wpScriptObserverActive) return;
	window.__wpScriptObserverActive = true;

	function emitScript(el) {
		if (!el || el.tagName !== "SCRIPT") return;
		window.postMessage({
			__wpScript: {
				src: el.src || null,
				type: el.type || null,
				async: el.async || false,
				defer: el.defer || false,
				crossOrigin: el.crossOrigin || null,
				integrity: el.integrity || null,
				inline: !el.src ? (el.textContent || "").trim().slice(0, 200) : null,
				timestamp: Date.now()
			}
		}, "*");
	}

	document.querySelectorAll("script").forEach(emitScript);

	const observer = new MutationObserver(mutations => {
		mutations.forEach(m => {
			m.addedNodes.forEach(node => {
				if (node.nodeType !== 1) return;
				if (node.tagName === "SCRIPT") emitScript(node);
				node.querySelectorAll && node.querySelectorAll("script").forEach(emitScript);
			});
		});
	});
	observer.observe(document.documentElement, { childList: true, subtree: true });
})();

(function() {
	if (window.__cfInterceptorActive) return;
	window.__cfInterceptorActive = true;

	const cfRequests = [];

	const originalFetch = window.fetch;
	window.fetch = async function(...args) {
		const url = args[0];
		const options = args[1] || {};
		const startTime = Date.now();
		let response;
		try {
			response = await originalFetch.apply(this, args);
			const clone = response.clone();
			let text = '';
			try { text = await clone.text(); } catch(e) { text = '[Unable to read response]'; }
			if (url.toString().includes('cloudflare') || url.toString().includes('turnstile') || url.toString().includes('cdn-cgi') || text.includes('_cf_chl_opt')) {
				cfRequests.push({
					type: 'fetch',
					url: url.toString(),
					method: options.method || 'GET',
					status: response.status,
					statusText: response.statusText,
					requestHeaders: options.headers || {},
					responseHeaders: Object.fromEntries(response.headers.entries()),
					requestBody: options.body,
					responseBody: text.substring(0, 10000),
					timestamp: startTime,
					responseTimestamp: Date.now()
				});
				window.dispatchEvent(new CustomEvent('cfNetworkCapture', {
					detail: { url: url.toString(), type: 'fetch', status: response.status, timestamp: startTime }
				}));
			}
			return response;
		} catch(e) {
			cfRequests.push({ type: 'fetch-error', url: url.toString(), error: e.message, timestamp: startTime });
			throw e;
		}
	};

	const XHRProto = XMLHttpRequest.prototype;
	const originalOpen = XHRProto.open;
	const originalSend = XHRProto.send;
	const originalSetHeader = XHRProto.setRequestHeader;

	XHRProto.open = function(method, url, async, user, pass) {
		this._cfData = { method, url, startTime: Date.now(), requestHeaders: {}, responseType: this.responseType };
		return originalOpen.apply(this, arguments);
	};

	XHRProto.setRequestHeader = function(header, value) {
		if (this._cfData) this._cfData.requestHeaders[header] = value;
		return originalSetHeader.apply(this, arguments);
	};

	XHRProto.send = function(body) {
		if (this._cfData) this._cfData.requestBody = body;
		this.addEventListener('loadend', function() {
			if (this._cfData && this._cfData.url) {
				const url = this._cfData.url;
				let responseBody = '';
				try {
					if (this.responseType === '' || this.responseType === 'text') responseBody = this.responseText || '';
					else if (this.responseType === 'json') responseBody = JSON.stringify(this.response);
					else responseBody = '[Binary response]';
				} catch(e) { responseBody = '[Error reading response]'; }
				if (url.includes('cloudflare') || url.includes('turnstile') || url.includes('cdn-cgi') || responseBody.includes('_cf_chl_opt')) {
					this._cfData.status = this.status;
					this._cfData.statusText = this.statusText;
					this._cfData.responseTimestamp = Date.now();
					this._cfData.responseBody = responseBody.substring(0, 10000);
					const headers = this.getAllResponseHeaders();
					const responseHeaders = {};
					headers.split('\r\n').forEach(line => {
						const [key, value] = line.split(': ');
						if (key && value) responseHeaders[key.toLowerCase()] = value;
					});
					this._cfData.responseHeaders = responseHeaders;
					cfRequests.push(this._cfData);
					window.dispatchEvent(new CustomEvent('cfNetworkCapture', {
						detail: { url: this._cfData.url, type: 'xhr', status: this.status, timestamp: this._cfData.startTime }
					}));
				}
			}
		});
		return originalSend.apply(this, arguments);
	};

	const observeTurnstile = function() {
		if (window.turnstile && !window.turnstile.__cfIntercepted) {
			const origRender = window.turnstile.render;
			window.turnstile.render = function(container, params) {
				if (params && params.sitekey) {
					cfRequests.push({
						type: 'turnstile',
						sitekey: params.sitekey,
						action: params.action,
						execution: params.execution,
						cData: params.cData,
						theme: params.theme,
						timestamp: Date.now()
					});
					window.dispatchEvent(new CustomEvent('cfTurnstileCapture', {
						detail: { sitekey: params.sitekey, action: params.action, timestamp: Date.now() }
					}));
				}
				return origRender.call(window.turnstile, container, params);
			};
			window.turnstile.__cfIntercepted = true;
		}
	};

	const extractSitekeys = function() {
		const results = [];
		const html = document.documentElement.innerHTML;
		const patterns = [
			/data-sitekey=["']([0-1][A-Za-z0-9_-]{39,59})["']/gi,
			/challenges\.cloudflare\.com\/turnstile[^"']*sitekey=([0-9A-Za-z_-]{40,60})/gi,
			/turnstile\.render\([^)]*sitekey\s*:\s*["']([0-9A-Za-z_-]{40,60})["']/gi,
			/_cf_chl_opt[^}]*iktV5\s*:\s*['"]([^'"]+)['"]/gi
		];
		for (const pattern of patterns) {
			let match;
			pattern.lastIndex = 0;
			while ((match = pattern.exec(html)) !== null) {
				if (match[1] && !results.find(r => r.sitekey === match[1])) {
					results.push({ sitekey: match[1], source: 'dom', timestamp: Date.now() });
					cfRequests.push({ type: 'sitekey', sitekey: match[1], source: 'dom', timestamp: Date.now() });
				}
			}
		}
		return results;
	};

	if (window._cf_chl_opt) {
		cfRequests.push({
			type: 'cf_chl_opt',
			data: { iktV5: window._cf_chl_opt.iktV5, interval: window._cf_chl_opt.interval, apiMode: window._cf_chl_opt.apiMode },
			timestamp: Date.now()
		});
	}

	const observerCF = new MutationObserver(function(mutations) {
		observeTurnstile();
		mutations.forEach(function(mutation) {
			if (mutation.addedNodes.length) {
				extractSitekeys();
				if (window.turnstile && !window.turnstile.__cfIntercepted) observeTurnstile();
			}
		});
	});
	observerCF.observe(document.documentElement, { childList: true, subtree: true });

	setInterval(function() {
		observeTurnstile();
		extractSitekeys();
	}, 1000);

	window.__cfInterceptorData = function() { return cfRequests; };
	window.__cfInterceptorClear = function() { cfRequests.length = 0; return 'Cleared ' + cfRequests.length; };
	window.__cfInterceptorStatus = function() { return { active: true, captured: cfRequests.length, timestamp: Date.now() }; };
})();

(function() {
  if (window.__wpConsoleHooked) return;
  window.__wpConsoleHooked = true;

  const _LEVELS = ["log","warn","error","info","debug","assert",
    "table","dir","trace","group","groupEnd","groupCollapsed",
    "time","timeEnd","count","countReset","clear"];

  _LEVELS.forEach(level => {
    const orig = console[level].bind(console);
    console[level] = function(...args) {
      let msg;
      try {
        msg = args.map(a => {
          if (a === null) return "null";
          if (a === undefined) return "undefined";
          if (typeof a === "object") {
            try { return JSON.stringify(a, null, 2); } catch(_) { return String(a); }
          }
          return String(a);
        }).join(" ");
      } catch(_) { msg = "[unserializable]"; }

      let stack = "";
      try {
        const lines = (new Error().stack || "").split("\n");
        stack = lines.slice(3, 5).map(l => l.trim()).filter(Boolean).join(" | ");
      } catch(_) {}

      window.postMessage({
        __wpConsole: { level, msg, stack, timestamp: Date.now() }
      }, "*");

      orig.apply(console, args);
    };
  });
})();
