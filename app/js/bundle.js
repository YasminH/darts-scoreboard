/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "74da77e3a384b64a984f"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(true) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_require__.h()) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}

				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					window.location.reload();
					return;
				}

				if(!upToDate()) {
					check();
				}

				__webpack_require__(2)(updatedModules, updatedModules);

				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}

			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function(eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});

		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}

		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Scoreboard = __webpack_require__(4);

	var Player = React.createClass({
	    displayName: 'Player',

	    handleClick: function () {
	        this.props.onUpdate(this.props.player);
	    },

	    render: function () {

	        var largestScore = Math.max.apply(Math, this.props.allPlayersWins),
	            selectedClass = this.props.selectedPlayerAName == this.props.player.name || this.props.selectedPlayerBName == this.props.player.name ? 'home-player-item active' : 'home-player-item',
	            topWinScoreClass = largestScore == this.props.player.wins ? '' : 'not-top';

	        return React.createElement('li', { className: selectedClass + ' ' + topWinScoreClass, onClick: this.handleClick }, React.createElement('div', { className: 'column' }, React.createElement('h2', null, this.props.player.name)), ' ', React.createElement('div', { className: 'column' }, React.createElement('h2', null, this.props.player.wins)));
	    }
	});

	var App = React.createClass({
	    displayName: 'App',

	    getInitialState: function () {
	        return {
	            players: [],
	            playerName: '',
	            playersEntered: false,
	            matchOn: false,
	            playerA: { 'name': '', 'wins': 0 },
	            playerB: { 'name': '', 'wins': 0 },
	            bestOf: 3,
	            winnerScreenOn: false
	        };
	    },

	    handleSubmit: function (e) {
	        e.preventDefault();

	        this.setState({ players: this.state.players.concat([{ 'name': this.state.playerName, 'wins': 0 }]), playerName: '' });
	    },

	    onChange: function (e) {
	        this.setState({ playerName: e.target.value });
	    },

	    onChangeBestOf: function (e) {
	        this.setState({ bestOf: e.target.value });
	    },

	    readyBtnClickHandler: function () {
	        this.setState({ playersEntered: true });
	    },

	    handlePlayerSelection: function (player) {
	        if (!player) {
	            return false;
	        }

	        if (this.state.playerA.name === '') {
	            this.setState({ playerA: { 'name': player.name } });
	        } else if (this.state.playerB.name === '') {
	            this.setState({ playerB: { 'name': player.name } });
	        } else if (this.state.playerA.name === player.name) {
	            this.setState({ playerA: { 'name': '' } });
	        } else if (this.state.playerB.name === player.name) {
	            this.setState({ playerB: { 'name': '' } });
	        }
	    },

	    startMatch: function (e) {
	        e.preventDefault();
	        this.setState({ matchOn: true });
	    },

	    endGameHandler: function (winner) {
	        var playerA = this.state.playerA;
	        var playerB = this.state.playerB;
	        playerA.name = '';
	        playerB.name = '';

	        this.setState({ matchOn: false });

	        if (winner != 'noone') {
	            this.incrementPlayersWin(winner);
	        }
	    },

	    incrementPlayersWin: function (player) {
	        if (!player) {
	            return false;
	        }

	        var oldPlayers = this.state.players;

	        for (var i in oldPlayers) {
	            if (oldPlayers[i].name === player) {
	                oldPlayers[i].wins++;
	                this.setState({ players: oldPlayers });
	            }
	        }
	    },

	    renderReadyButton: function () {
	        if (this.state.players.length < 2) {
	            return React.createElement('div', null);
	        }

	        return React.createElement('div', { onClick: this.readyBtnClickHandler }, 'hide');
	    },

	    renderStartScreen: function () {
	        if (!this.state.playersEntered) {
	            return React.createElement('div', { className: 'container-player-entry' }, React.createElement('form', { className: 'player-entry-form', onSubmit: this.handleSubmit }, React.createElement('input', { onChange: this.onChange, value: this.state.playerName, placeholder: 'Name' }), React.createElement('button', null, 'Add player'), this.renderReadyButton()));
	        }

	        return React.createElement('div', null);
	    },

	    renderScoreboard: function () {
	        if (!this.state.matchOn) {
	            return React.createElement('div', null);
	        }

	        return React.createElement(Scoreboard, { scoreStart: 301, bestOf: this.state.bestOf, playerA: this.state.playerA, playerB: this.state.playerB, onEndGame: this.endGameHandler });
	    },

	    renderHome: function () {
	        if (this.state.matchOn) {
	            return React.createElement('div', null);
	        }

	        var that = this,
	            playerASelectedName,
	            playerBSelectedName;

	        if (this.state.playerA.hasOwnProperty('name') && this.state.playerB.hasOwnProperty('name')) {
	            playerASelectedName = this.state.playerA.name;
	            playerBSelectedName = this.state.playerB.name;
	        }

	        var allPlayersWins = [];

	        for (var i in this.state.players) {
	            if (this.state.players[i].hasOwnProperty('wins')) {
	                allPlayersWins.push(this.state.players[i].wins);
	            }
	        }

	        return React.createElement('div', { className: 'container-home' }, React.createElement('div', { className: 'home-content' }, React.createElement('ul', { className: 'home-players' }, this.state.players.map(function (player) {
	            return React.createElement(Player, { player: player, selectedPlayerAName: playerASelectedName, selectedPlayerBName: playerBSelectedName, allPlayersWins: allPlayersWins, onUpdate: that.handlePlayerSelection });
	        })), this.renderStartMatchBtn()), React.createElement('div', { className: 'scoreboard-footer' }, React.createElement('h1', null, 'DARTS 2016')));
	    },

	    renderStartMatchBtn: function () {
	        if (this.state.playerA.name === '' || this.state.playerB.name === '') {
	            return React.createElement('div', null);
	        }

	        return React.createElement('div', { className: 'container-start-match' }, React.createElement('form', { className: 'best-of-form', onSubmit: this.startMatch }, React.createElement('input', { onChange: this.onChangeBestOf, value: this.state.bestOf, placeholder: 'Best of' }), React.createElement('button', null, 'START')));
	    },

	    renderWinnerScreen(playerName) {
	        if (this.state.winnerScreenOn) {
	            return React.createElement('div', { className: 'container-winner' }, 'playerName wins!');
	        }
	    },

	    render: function () {
	        return React.createElement('div', { className: 'app-inner' }, this.renderHome(), this.renderStartScreen(), this.renderScoreboard());
	    }

	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Outchart = __webpack_require__(5);

	var Score = React.createClass({
	    displayName: "Score",

	    render: function () {
	        return React.createElement("div", { className: "player-score" }, React.createElement("h1", null, this.props.score));
	    }
	});

	var Scoreboard = React.createClass({
	    displayName: "Scoreboard",

	    getInitialState: function () {
	        return {
	            playerA: { scores: [this.props.scoreStart], legs: 0 },
	            playerB: { scores: [this.props.scoreStart], legs: 0 },
	            justThrownScore: 0,
	            isPlayerAsTurn: true
	        };
	    },

	    componentDidMount: function () {
	        var oldA = this.state.playerA;
	        var oldB = this.state.playerB;

	        oldA.name = this.props.playerA.name;
	        oldB.name = this.props.playerB.name;

	        this.setState({ playerA: oldA, playerB: oldB });
	    },

	    togglePlayersTurn: function () {
	        this.setState({ isPlayerAsTurn: !this.state.isPlayerAsTurn });
	    },

	    getNewScore: function (currentScore) {
	        return currentScore - this.state.justThrownScore;
	    },

	    getPlayersCurrentScore: function (player) {
	        var playersScores = player.scores;

	        return player.scores[playersScores.length - 1];
	    },

	    getCurrentPlayersTurn: function () {
	        if (this.state.isPlayerAsTurn) {
	            return this.state.playerA;
	        }

	        return this.state.playerB;
	    },

	    getBestOf: function () {
	        return React.createElement("span", null, this.props.bestOf);
	    },

	    checkEndLeg: function (score) {
	        var currentPlayer = this.getCurrentPlayersTurn(),
	            oldPlayerA = this.state.playerA,
	            oldPlayerB = this.state.playerB;

	        if (score <= 0) {
	            currentPlayer.legs++; //Win!

	            //Reset
	            oldPlayerA.scores = [301];
	            oldPlayerB.scores = [301];

	            this.setState({ playerA: oldPlayerA, playerB: oldPlayerB });

	            this.checkEndMatch();
	        }

	        this.togglePlayersTurn();
	    },

	    checkEndMatch: function () {
	        var totalLegs = this.state.playerA.legs + this.state.playerB.legs,
	            bestOf = this.props.bestOf,
	            minimumLegsToWin = (parseInt(bestOf) + 1) * 0.5;

	        if ((this.state.playerA.legs >= minimumLegsToWin || this.state.playerB.legs >= minimumLegsToWin) && totalLegs >= minimumLegsToWin) {
	            this.props.onEndGame(this.getCurrentPlayersTurn().name);
	        }
	    },

	    renderOutchart: function () {
	        var currentPlayer = this.getCurrentPlayersTurn();

	        return React.createElement(Outchart, { currentScore: this.getPlayersCurrentScore(currentPlayer), currentPlayer: currentPlayer });
	    },

	    renderRedDot: function (player) {
	        if (player == this.getCurrentPlayersTurn()) {
	            return React.createElement("div", { className: "red-dot" });
	        }

	        return false;
	    },

	    renderFooter: function () {
	        var stage;

	        if (this.props.bestOf == 5) {
	            stage = "- SEMI FINAL";
	        }

	        if (this.props.bestOf == 7) {
	            stage = "- FINAL";
	        }

	        return React.createElement("div", { className: "scoreboard-footer" }, React.createElement("h1", null, React.createElement("span", { onClick: this.handleGoBack }, "DARTS"), " 2016 ", stage));
	    },

	    handleSubmit: function (e) {
	        e.preventDefault();

	        if (!this.isInt(this.state.justThrownScore)) {
	            return false;
	        }

	        var currentPlayersTurn = this.getCurrentPlayersTurn(),
	            currentScore = this.getPlayersCurrentScore(currentPlayersTurn),
	            oldScores,
	            newScore;

	        if (this.state.isPlayerAsTurn) {
	            oldScores = this.state.playerA.scores;
	            newScore = this.getNewScore(currentScore);

	            var playerA = this.state.playerA;
	            playerA.scores = oldScores.concat([newScore]);

	            this.setState({ playerA: playerA, justThrownScore: 0 });
	        } else {
	            oldScores = this.state.playerB.scores;
	            newScore = this.getNewScore(currentScore);

	            var playerB = this.state.playerB;
	            playerB.scores = oldScores.concat([newScore]);

	            this.setState({ playerB: playerB, justThrownScore: 0 });
	        }

	        this.checkEndLeg(newScore);
	    },

	    isInt: function (value) {
	        return !isNaN(value) && function (x) {
	            return (x | 0) === x;
	        }(parseFloat(value));
	    },

	    handleGoBack: function () {
	        this.props.onEndGame('noone');
	    },

	    onChange: function (e) {
	        this.setState({ justThrownScore: e.target.value });
	    },

	    render: function () {
	        return React.createElement("div", { className: "container-scoreboard" }, React.createElement("div", { className: "scoreboard-header" }, React.createElement("div", { className: "scoreboard-header--left" }, React.createElement("h1", null, "BEST OF ", this.getBestOf())), React.createElement("div", { className: "scoreboard-header--right" }, React.createElement("h1", null, "LEGS")), React.createElement("div", { className: "scoreboard-header--right score-submit" }, React.createElement("form", { onSubmit: this.handleSubmit }, React.createElement("input", { onChange: this.onChange, value: this.state.justThrownScore }), React.createElement("button", null, "Submit")))), React.createElement("div", { className: "scoreboard-content" }, React.createElement("div", { className: "player-row player-row--a" }, React.createElement("div", { className: "player-name" }, React.createElement("h1", null, this.props.playerA.name), this.renderRedDot(this.state.playerA)), React.createElement("div", { className: "player-stats" }, React.createElement("div", { className: "player-legs" }, React.createElement("h1", null, this.state.playerA.legs)), React.createElement(Score, { score: this.getPlayersCurrentScore(this.state.playerA) }), React.createElement(Outchart, { currentScore: this.getPlayersCurrentScore(this.state.playerA) }))), React.createElement("div", { className: "player-row player-row--b" }, React.createElement("div", { className: "player-name" }, React.createElement("h1", null, this.props.playerB.name), this.renderRedDot(this.state.playerB)), React.createElement("div", { className: "player-stats" }, React.createElement("div", { className: "player-legs" }, React.createElement("h1", null, this.state.playerB.legs)), React.createElement(Score, { score: this.getPlayersCurrentScore(this.state.playerB) }), React.createElement(Outchart, { currentScore: this.getPlayersCurrentScore(this.state.playerB) })))), this.renderFooter());
	    }

	});

	module.exports = Scoreboard;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var outs = {
	    '170': ['T20', 'T20', 'DB'],
	    '167': ['T20', 'T19', 'DB'],
	    '164': ['T20', 'T18', 'DB'],
	    '161': ['T20', 'T17', 'DB'],
	    '160': ['T20', 'T20', 'D20'],
	    '158': ['T20', 'T20', 'D19'],
	    '157': ['T20', 'T19', 'D20'],
	    '156': ['T20', 'T20', 'D18'],
	    '155': ['T20', 'T19', 'D19'],
	    '154': ['T20', 'T18', 'D20'],
	    '153': ['T20', 'T19', 'D18'],
	    '152': ['T20', 'T20', 'D16'],
	    '151': ['T20', 'T17', 'D20'],
	    '150': ['T20', 'T18', 'D18'],
	    '149': ['T20', 'T19', 'D16'],
	    '148': ['T20', 'T20', 'D14'],
	    '147': ['T20', 'T17', 'D18'],
	    '146': ['T20', 'T18', 'D16'],
	    '145': ['T20', 'T19', 'D14'],
	    '144': ['T20', 'T20', 'D12'],
	    '143': ['T20', 'T17', 'D16'],
	    '142': ['T20', 'DB', 'D16'],
	    '141': ['T19', 'T16', 'D18'],
	    '140': ['T20', 'T20', 'D10'],
	    '139': ['T20', 'T13', 'D20'],
	    '138': ['T20', 'T18', 'D12'],
	    '137': ['T20', 'T15', 'D16'],
	    '136': ['T20', 'T20', 'D8'],
	    '135': ['S25', 'T20', 'DB'],
	    '134': ['T20', 'T14', 'D16'],
	    '133': ['T19', 'T20', 'D8'],
	    '132': ['25', 'T20', 'DB'],
	    '131': ['T20', 'T13', 'D16'],
	    '130': ['T20', 'T20', 'D5'],
	    '129': ['T19', 'T12', 'D18'],
	    '128': ['T18', 'T14', 'D16'],
	    '127': ['T20', 'T17', 'D8'],
	    '126': ['T19', 'T19', 'D6'],
	    '125': ['T18', 'T13', 'D16'],
	    '124': ['T20', 'T16', 'D8'],
	    '123': ['T19', 'T16', 'D9'],
	    '122': ['T18', 'T20', 'D4'],
	    '121': ['T17', 'T18', 'D8'],
	    '120': ['T20', 'S20', 'D20'],
	    '119': ['T19', 'T12', 'D13'],
	    '118': ['T20', 'S18', 'D20'],
	    '117': ['T20', 'S17', 'D20'],
	    '116': ['T20', 'S16', 'D20'],
	    '115': ['T19', 'S18', 'D20'],
	    '114': ['T20', 'S14', 'D20'],
	    '113': ['T19', 'S16', 'D20'],
	    '112': ['T20', 'T12', 'D8'],
	    '111': ['T20', 'S19', 'D16'],
	    '110': ['T20', 'DB'],
	    '109': ['T20', 'S17', 'D16'],
	    '108': ['T20', 'S16', 'D16'],
	    '107': ['T19', 'DB'],
	    '106': ['T20', 'S6', 'D20'],
	    '105': ['T20', 'S13', 'D16'],
	    '104': ['T18', 'DB'],
	    '103': ['T19', 'S6', 'D20'],
	    '102': ['T20', 'S10', 'D16'],
	    '101': ['T20', 'S9', 'D16'],
	    '100': ['T20', 'D20'],
	    '99': ['T19', 'S10', 'D16'],
	    '98': ['T20', 'D19'],
	    '97': ['T19', 'D20'],
	    '96': ['T20', 'D18'],
	    '95': ['T19', 'D19'],
	    '94': ['T18', 'D20'],
	    '93': ['T19', 'D18'],
	    '92': ['T20', 'D16'],
	    '91': ['T17', 'D20'],
	    '90': ['T20', 'D15'],
	    '89': ['T19', 'D16'],
	    '88': ['T20', 'D14'],
	    '87': ['T17', 'D18'],
	    '86': ['T18', 'D16'],
	    '85': ['T19', 'D14'],
	    '84': ['T20', 'D12'],
	    '83': ['T17', 'D16'],
	    '82': ['T14', 'D20'],
	    '81': ['T19', 'D12'],
	    '80': ['T20', 'D10'],
	    '79': ['T13', 'D20'],
	    '78': ['T18', 'D12'],
	    '77': ['T19', 'D10'],
	    '76': ['T20', 'D8'],
	    '75': ['T17', 'D12'],
	    '74': ['T14', 'D16'],
	    '73': ['T19', 'D8'],
	    '72': ['T12', 'D18'],
	    '71': ['T13', 'D16'],
	    '70': ['T18', 'D8'],
	    '69': ['T19', 'D6'],
	    '68': ['T20', 'D4'],
	    '67': ['T17', 'D8'],
	    '66': ['T10', 'D18'],
	    '65': ['SB ', 'D20'],
	    '64': ['T16', 'D8'],
	    '63': ['T17', 'D6'],
	    '62': ['T10', 'D16'],
	    '61': ['T15', 'D8'],
	    '60': ['S20', 'D20'],
	    '59': ['S19', 'D20'],
	    '58': ['S18', 'D20'],
	    '57': ['S17', 'D20'],
	    '56': ['T16', 'D4'],
	    '55': ['S15', 'D20'],
	    '54': ['S14', 'D20'],
	    '53': ['S17', 'D18'],
	    '52': ['T12', 'D8'],
	    '51': ['S19', 'D16'],
	    '50': ['DB'],
	    '49': ['S17', 'D16'],
	    '48': ['S16', 'D16'],
	    '47': ['S15', 'D16'],
	    '46': ['S6', 'D20'],
	    '45': ['S13', 'D16'],
	    '44': ['S12', 'D16'],
	    '43': ['S11', 'D16'],
	    '42': ['S10', 'D16'],
	    '41': ['S9', 'D16'],

	    '40': [''],
	    '39': [''],
	    '38': [''],
	    '37': [''],
	    '36': [''],
	    '35': [''],
	    '34': [''],
	    '33': [''],
	    '32': [''],
	    '31': [''],
	    '30': [''],
	    '29': [''],
	    '28': [''],
	    '27': [''],
	    '26': [''],
	    '25': [''],
	    '24': [''],
	    '23': [''],
	    '22': [''],
	    '21': [''],
	    '20': [''],
	    '19': [''],
	    '18': [''],
	    '17': [''],
	    '16': [''],
	    '15': [''],
	    '14': [''],
	    '13': [''],
	    '12': [''],
	    '11': [''],
	    '10': [''],
	    '9': [''],
	    '8': [''],
	    '7': [''],
	    '6': [''],
	    '5': [''],
	    '4': [''],
	    '3': [''],
	    '2': [''],
	    '1': ['']
	};

	var OutItem = React.createClass({
	    displayName: 'OutItem',

	    render: function () {
	        return React.createElement('li', { className: 'out-item' }, React.createElement('h1', null, this.props.out));
	    }
	});

	var Outchart = React.createClass({
	    displayName: 'Outchart',

	    renderOuts() {
	        var currentScore = this.props.currentScore;

	        if (outs[currentScore]) {
	            return React.createElement('ul', { className: 'out-list' }, ' ', outs[currentScore].map(function (data) {
	                return React.createElement(OutItem, { out: data });
	            }));
	        }

	        return React.createElement('h1', { 'class': 'no-finish' }, 'NO FINISH');
	    },

	    render: function () {
	        return React.createElement('div', { className: 'outchart' }, this.renderOuts());
	    }
	});

	module.exports = Outchart;

/***/ }
/******/ ]);