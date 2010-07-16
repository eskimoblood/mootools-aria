/**
 * Created by IntelliJ IDEA.
 * User: andreaskoberle
 * Date: 09.07.2010
 * Time: 21:10:18
 * Based on Dustin Dias JavaScript Cache Provider (http://www.dustindiaz.com/javascript-cache-provider/)
 */
var Model = new Class({
	Implements: [Events, Options],
	options: {
		useLocalStorage: true
	},
	initialize: function(eventBus, options) {
		this.setOptions(options);
		this.eventBus = eventBus;
		this.hasLocalStorage = this.hasLocalStorage();
		if (this.hasLocalStorage) {
			Storage.prototype.setObject = function(key, value) {
				this.setItem(key, JSON.stringify(value));
			};
			Storage.prototype.getObject = function(key) {
				return JSON.parse(this.getItem(key));
			};
		}
		this.cache = {};
	},
	hasLocalStorage: function() {
		try {
			return this.options.useLocalStorage && ('localStorage' in window) && window['localStorage'] !== null;
		} catch (ex) {
			return false;
		}
	},
	/**
	 * {String} key - the key
	 * {Boolean} local - get this from local storage?
	 * {Boolean} isObject - is the value you put in local storage an object?
	 */
	get: function(key, isObject, local) {
		if (local && this.hasLocalStorage) {
			return localStorage[isObject ? 'getObject' : 'getItem'](key) || undefined;
		} else {
			return this.cache[key] || undefined;
		}
	},

	/**
	 * {String} key - the key
	 * {Object} value - any kind of value you want to store
	 * however only objects and strings are allowed in local storage
	 * {Boolean} local - put this in local storage
	 */
	set: function(key, value, local) {
		if (local && this.hasLocalStorage) {
			if (typeof value !== 'string') {
				// make assumption if it's not a string, then we're storing an object
				localStorage.setObject(key, value);
			} else {
				try {
					localStorage.setItem(key, value);
				} catch (ex) {
					if (ex.name == 'QUOTA_EXCEEDED_ERR') {
						// developer needs to figure out what to start invalidating
						throw new Exception(value);
						return;
					}
				}
			}
		} else {
			// put in our local object
			this.cache[key] = value;
		}
		this.eventBus.fireEvent('changed', key);
		return value;
	},

	/**
	 * {String} k - the key
	 * {Boolean} local - put this in local storage
	 * {Boolean} o - is this an object you want to put in local storage?
	 */
	clear: function(key, local) {
		if (local && this.hasLocalStorage) {
			localStorage.removeItem(key);
		}
		// delete in both caches - doesn't hurt.
		delete this.cache[key];
		this.eventBus.fireEvent('changed', key);
	}
});