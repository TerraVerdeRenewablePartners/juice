import entries from 'lodash/entries';

/**
 * Wraps the native `localStorage` if it exists, otherwise this provides a simple data dump. Not
 * all browsers have `localStorage` (notably, Safari's private mode does not). We still want the
 * app to work in these browsers, however, so this method protects against using `localStorage`
 * where it isn't available. The fallback is very naive, making use of a simple JS object for
 * storage and lookup
 */

const storage = {};
const storageKeys = ['hasOnboarded', 'capacity', 'vin'];

// Feature detection for `localStorage`
const hasLocalStorage = (() => {
    // Detect if it has been disabled. Even accessing `window.localStorage` throws an error if
    // the user has disabled it.
    let localStorage;
    try {
        localStorage = window.localStorage;
    } catch (e) {
        // Access denied :-(
        return false;
    }

    const date = new Date();
    try {
        localStorage.setItem(date.toString(), date);
        localStorage.removeItem(date.toString());
        return true;
    } catch (e) {
        return false;
    }
})();


export const getItem = hasLocalStorage
    ? key => localStorage.getItem(key)
    : key => storage[key] || null;

export const setItem = hasLocalStorage
    ? (key, value) => localStorage.setItem(key, value)
    : (key, value) => { storage[key] = value; };

export const setItems = (keyValues) => {
    entries(keyValues).forEach(([key, value]) => setItem(key, value));
};

export const removeItem = hasLocalStorage
    ? key => localStorage.removeItem(key)
    : key => delete storage[key];

export const hasItem = hasLocalStorage
    ? key => key in localStorage
    : key => key in storage;

// Shorthand for fetching the recognized keys
storageKeys.forEach((key) => {
    getItem[key] = () => getItem(key);
    hasItem[key] = () => hasItem(key);
});