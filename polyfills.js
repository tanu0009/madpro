// Polyfills for older browsers

// Object.assign polyfill
if (typeof Object.assign !== 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

// Promise polyfill
if (typeof Promise === 'undefined') {
  // Simple Promise polyfill for basic usage
  window.Promise = function(executor) {
    var callbacks = [];
    var state = 'pending';
    var value;

    function resolve(newValue) {
      if (state !== 'pending') return;
      state = 'fulfilled';
      value = newValue;
      executeCallbacks();
    }

    function reject(reason) {
      if (state !== 'pending') return;
      state = 'rejected';
      value = reason;
      executeCallbacks();
    }

    function executeCallbacks() {
      for (var i = 0; i < callbacks.length; i++) {
        executeCallback(callbacks[i]);
      }
      callbacks = null;
    }

    function executeCallback(callback) {
      var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
      if (cb === null) {
        if (state === 'fulfilled') {
          callback.resolve(value);
        } else {
          callback.reject(value);
        }
        return;
      }
      try {
        var result = cb(value);
        callback.resolve(result);
      } catch (e) {
        callback.reject(e);
      }
    }

    this.then = function(onFulfilled, onRejected) {
      return new Promise(function(resolve, reject) {
        var callback = {
          onFulfilled: typeof onFulfilled === 'function' ? onFulfilled : null,
          onRejected: typeof onRejected === 'function' ? onRejected : null,
          resolve: resolve,
          reject: reject
        };
        if (state === 'pending') {
          callbacks.push(callback);
        } else {
          setTimeout(function() {
            executeCallback(callback);
          }, 0);
        }
      });
    };

    this.catch = function(onRejected) {
      return this.then(null, onRejected);
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  };

  window.Promise.resolve = function(value) {
    return new Promise(function(resolve) {
      resolve(value);
    });
  };

  window.Promise.reject = function(reason) {
    return new Promise(function(resolve, reject) {
      reject(reason);
    });
  };
}

// Crypto polyfill for web environment
if (typeof window !== 'undefined' && typeof window.crypto === 'undefined') {
  // Simple mock for crypto
  window.crypto = {
    getRandomValues: function(array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    },
    randomUUID: function() {
      // Simple UUID v4 implementation
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  };
}

// Add more polyfills as needed
